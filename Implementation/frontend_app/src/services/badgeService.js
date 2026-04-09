import { supabase } from './supabase';

/**
 * Server-style badge evaluation: reads `badges.requirement_type` and progress/stats, inserts `user_badges`.
 * The React UI awards a smaller fixed set via BadgeContext; this service matches a richer SQL catalog if you use it.
 */
export const badgeService = {
  async checkAndAwardBadges(userId) {
    try {
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);
      
      if (progressError) throw progressError;

      const { data: statsRow, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (statsError) throw statsError;

      const stats = statsRow || {
        modules_completed: 0,
        total_points: 0,
        current_level: 1,
      };

      const { data: allBadges, error: badgesError } = await supabase
        .from('badges')
        .select('*');
      
      if (badgesError) throw badgesError;

      const { data: earnedBadges, error: earnedError } = await supabase
        .from('user_badges')
        .select('badge_id')
        .eq('user_id', userId);
      
      if (earnedError) throw earnedError;

      const earnedBadgeIds = earnedBadges.map(b => b.badge_id);
      const newBadges = [];

      for (const badge of allBadges) {
        if (earnedBadgeIds.includes(badge.id)) continue;

        let earned = false;

        switch (badge.requirement_type) {
          case 'modules_completed':
            earned = stats.modules_completed >= badge.requirement_value;
            break;
          case 'module_score_phishing':
            const phishing = progress.find(p => p.module_id === 'phishing');
            earned = phishing?.score === badge.requirement_value;
            break;
          case 'module_score_passwords':
            const passwords = progress.find(p => p.module_id === 'passwords');
            earned = passwords?.score === badge.requirement_value;
            break;
          case 'module_score_mfa':
            const mfa = progress.find(p => p.module_id === 'mfa');
            earned = mfa?.score === badge.requirement_value;
            break;
          case 'module_score_social':
            const social = progress.find(p => p.module_id === 'social');
            earned = social?.score === badge.requirement_value;
            break;
          case 'module_score_incident':
            const incident = progress.find(p => p.module_id === 'incident');
            earned = incident?.score === badge.requirement_value;
            break;
          case 'all_modules_perfect':
            const allPerfect = progress.every(p => p.score === 100);
            earned = allPerfect && progress.length === 5;
            break;
          case 'quick_complete':
            const quickModule = progress.find(p => {
              if (!p.completed_at || !p.created_at) return false;
              const start = new Date(p.created_at);
              const end = new Date(p.completed_at);
              const minutes = (end - start) / 1000 / 60;
              return minutes < 5;
            });
            earned = !!quickModule;
            break;
        }

        if (earned) {
          await supabase
            .from('user_badges')
            .insert({ user_id: userId, badge_id: badge.id });
          
          newBadges.push(badge);
        }
      }

      return newBadges;
    } catch (error) {
      console.error('Error checking badges:', error);
      return [];
    }
  },

  async getUserBadges(userId) {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        badge_id,
        earned_at,
        badges (*)
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return data.map(item => ({
      ...item.badges,
      earned_at: item.earned_at
    }));
  }
};