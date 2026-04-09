import { supabase } from './supabase';

/**
 * Row-per-module progress API (user_progress with module_id) + user_stats rollup helpers.
 * The live Vite app uses ProgressContext’s single-row JSON model instead; keep this for migrations or server scripts.
 */
export const dbService = {
  async getUserProgress(userId) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data;
  },

  async getModuleProgress(userId, moduleId) {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('module_id', moduleId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateModuleProgress(userId, moduleId, progressData) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        ...progressData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id, module_id'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async completeModule(userId, moduleId, score, quizAnswers) {
    const progressData = {
      completed: true,
      completed_at: new Date().toISOString(),
      score: score,
      quiz_answers: quizAnswers
    };
    
    return await this.updateModuleProgress(userId, moduleId, progressData);
  },

  async unlockModule(userId, moduleId) {
    return await this.updateModuleProgress(userId, moduleId, {
      unlocked: true
    });
  },

  async getUserStats(userId) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateUserStats(userId, statsData) {
    const { data, error } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        ...statsData,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async refreshUserStats(userId) {
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);
    
    if (progressError) throw progressError;

    const totalPoints = progress.reduce((sum, mod) => sum + (mod.score || 0), 0);
    const modulesCompleted = progress.filter(mod => mod.completed).length;
    const currentLevel = Math.floor(totalPoints / 100) + 1;

    return await this.updateUserStats(userId, {
      total_points: totalPoints,
      current_level: currentLevel,
      modules_completed: modulesCompleted,
      last_active: new Date().toISOString()
    });
  }
};