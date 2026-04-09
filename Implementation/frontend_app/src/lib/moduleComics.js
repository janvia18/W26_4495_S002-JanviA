import { COMIC_PANEL_IMAGES } from './moduleComicImages';

/**
 * Narrative comic data per module: title, cast colors, and panel dialogue.
 * Raster backgrounds are attached in getModuleComicStrip via COMIC_PANEL_IMAGES (same panel order).
 */
export const MODULE_COMICS = {
  phishing: {
    title: 'Comic: the phish hook',
    subtitle: 'A tiny story in three panels—same ideas as the lesson, faster to scan.',
    cast: [
      { name: 'Maya', shirt: '#7c3aed', skin: '#fde68a', hair: '#78350f' },
      { name: 'Jordan', shirt: '#0d9488', skin: '#fcd34d', hair: '#292524' },
    ],
    panels: [
      {
        scene: 1,
        emoji: '📬',
        tone: 'warn',
        dialogue: [
          { speaker: 'Maya', text: 'Ping—URGENT payroll email. Verify in an hour or my pay stops?' },
          { speaker: 'Jordan', text: 'Hang on. Read the full sender out loud. Real HR won’t rush you like that.' },
        ],
      },
      {
        scene: 2,
        emoji: '🔍',
        tone: 'think',
        dialogue: [
          { speaker: 'Maya', text: 'Sender says “Security Team” but the domain is… secure-account-alerts.co?' },
          { speaker: 'Jordan', text: 'Hover the link—if the URL doesn’t match our company, it’s a phish. No click.' },
        ],
      },
      {
        scene: 3,
        emoji: '🛡️',
        tone: 'ok',
        dialogue: [
          { speaker: 'Maya', text: 'Reported it in Outlook and deleted the thread. I almost clicked.' },
          { speaker: 'Jordan', text: 'That’s the win—you didn’t give them a password, you trained your reflexes.' },
        ],
      },
    ],
  },
  passwords: {
    title: 'Comic: one key for every door?',
    subtitle: 'Why reuse is a super-villain move—and what heroes do instead.',
    cast: [
      { name: 'Alex', shirt: '#2563eb', skin: '#fdba74', hair: '#1c1917' },
      { name: 'Morgan', shirt: '#db2777', skin: '#fcd34d', hair: '#451a03' },
    ],
    panels: [
      {
        scene: 1,
        emoji: '🔑',
        tone: 'warn',
        dialogue: [
          { speaker: 'Alex', text: 'I use the same password everywhere so I never forget. Super efficient.' },
          { speaker: 'Morgan', text: 'Efficient for you—and for attackers. One breach dumps every account you reused.' },
        ],
      },
      {
        scene: 2,
        emoji: '🧠',
        tone: 'think',
        dialogue: [
          { speaker: 'Alex', text: 'So I’m supposed to memorize fifty random strings?' },
          { speaker: 'Morgan', text: 'Use a password manager. One strong master; it generates the rest.' },
        ],
      },
      {
        scene: 3,
        emoji: '✅',
        tone: 'ok',
        dialogue: [
          { speaker: 'Alex', text: 'OK, installed one. Each site gets its own long password now.' },
          { speaker: 'Morgan', text: 'Perfect. If one site leaks, the damage stops there—not your whole life.' },
        ],
      },
    ],
  },
  mfa: {
    title: 'Comic: the second lock',
    subtitle: 'Password stolen? MFA is still standing guard.',
    cast: [
      { name: 'Riley', shirt: '#4f46e5', skin: '#fecaca', hair: '#7f1d1d' },
      { name: 'Sam', shirt: '#15803d', skin: '#fde68a', hair: '#365314' },
    ],
    panels: [
      {
        scene: 1,
        emoji: '🚪',
        tone: 'warn',
        dialogue: [
          { speaker: 'Riley', text: 'Someone has my password—I can tell because my account almost logged in…' },
          { speaker: 'Sam', text: 'If they don’t have your second factor, they’re stuck at the door. That’s MFA.' },
        ],
      },
      {
        scene: 2,
        emoji: '📱',
        tone: 'think',
        dialogue: [
          { speaker: 'Riley', text: 'Authenticator just asked to approve a login. I’m not at my desk.' },
          { speaker: 'Sam', text: 'Deny it. Then change your password—someone probably leaked or guessed it.' },
        ],
      },
      {
        scene: 3,
        emoji: '✋',
        tone: 'ok',
        dialogue: [
          { speaker: 'Riley', text: 'Denied, reset password, messaged security. That was scary but fast.' },
          { speaker: 'Sam', text: 'That’s the playbook. Approve only prompts you actually started yourself.' },
        ],
      },
    ],
  },
  social: {
    title: 'Comic: trust but verify',
    subtitle: 'When the “boss” pings you for gift cards—pause the movie.',
    cast: [
      { name: 'Casey', shirt: '#c026d3', skin: '#fde68a', hair: '#422006' },
      { name: 'Taylor', shirt: '#0369a1', skin: '#fdba74', hair: '#0c4a6e' },
    ],
    panels: [
      {
        scene: 1,
        emoji: '💼',
        tone: 'warn',
        dialogue: [
          { speaker: 'Casey', text: 'Slack says our CEO needs gift cards ASAP—can’t talk, in a meeting.' },
          { speaker: 'Taylor', text: 'Classic rush + secrecy. Real execs follow finance process. Pause.' },
        ],
      },
      {
        scene: 2,
        emoji: '☎️',
        tone: 'think',
        dialogue: [
          { speaker: 'Casey', text: 'So I just… call the number on the intranet?' },
          { speaker: 'Taylor', text: 'Use a channel you already trust—not the thread that might be fake.' },
        ],
      },
      {
        scene: 3,
        emoji: '🙅',
        tone: 'ok',
        dialogue: [
          { speaker: 'Casey', text: 'Finance confirmed scam profile. I didn’t send a single code.' },
          { speaker: 'Taylor', text: 'You verified out-of-band. Boring security—and it works.' },
        ],
      },
    ],
  },
  safeBrowsing: {
    title: 'Comic: don’t feed the pop-up',
    subtitle: 'The web is shiny—learn whose food bowl is safe.',
    cast: [
      { name: 'Jamie', shirt: '#ea580c', skin: '#fcd34d', hair: '#431407' },
      { name: 'Priya', shirt: '#0f766e', skin: '#fecdd3', hair: '#831843' },
    ],
    panels: [
      {
        scene: 1,
        emoji: '🪟',
        tone: 'warn',
        dialogue: [
          { speaker: 'Jamie', text: 'This tab says my codec is outdated—big flashing “Install now.”' },
          { speaker: 'Priya', text: 'Legit updates don’t scream from random tabs. Close it before it grabs admin rights.' },
        ],
      },
      {
        scene: 2,
        emoji: '🔒',
        tone: 'think',
        dialogue: [
          { speaker: 'Jamie', text: 'But I need that player. The URL almost looks like the real company.' },
          { speaker: 'Priya', text: 'Type the vendor name yourself—or use their official store link.' },
        ],
      },
      {
        scene: 3,
        emoji: '🧹',
        tone: 'ok',
        dialogue: [
          { speaker: 'Jamie', text: 'Downloaded from the real site, updated, killed a weird extension.' },
          { speaker: 'Priya', text: 'Pop-up closed, browser patched—you dodged the drive-by junk.' },
        ],
      },
    ],
  },
  incident: {
    title: 'Comic: oops → report',
    subtitle: 'Everyone slips; speed matters more than pride.',
    cast: [
      { name: 'Noah', shirt: '#64748b', skin: '#fdba74', hair: '#1e293b' },
      { name: 'Lee', shirt: '#b45309', skin: '#fde68a', hair: '#422006' },
    ],
    panels: [
      {
        scene: 1,
        emoji: '😬',
        tone: 'warn',
        dialogue: [
          { speaker: 'Noah', text: 'I clicked a link and typed my work password before I realized the page was fake.' },
          { speaker: 'Lee', text: 'Thanks for saying it out loud. First rule: don’t wait—tell security now.' },
        ],
      },
      {
        scene: 2,
        emoji: '📝',
        tone: 'think',
        dialogue: [
          { speaker: 'Noah', text: 'What do you need from me? I’m kind of shaking.' },
          { speaker: 'Lee', text: 'Time, device, what you entered, any screenshots. Facts beat panic.' },
        ],
      },
      {
        scene: 3,
        emoji: '🚨',
        tone: 'ok',
        dialogue: [
          { speaker: 'Noah', text: 'Ticket filed, password reset, IT’s locking sessions. I feel dumb.' },
          { speaker: 'Lee', text: 'You’re not dumb—you reported fast. That keeps a small slip from becoming a breach.' },
        ],
      },
    ],
  },
};

/** Merges dialogue metadata from MODULE_COMICS with raster panel art from moduleComicImages. */
export function getModuleComicStrip(moduleKey) {
  const strip = MODULE_COMICS[moduleKey];
  if (!strip) return null;
  const imgs = COMIC_PANEL_IMAGES[moduleKey];
  if (!imgs?.length) return strip;
  return {
    ...strip,
    panels: strip.panels.map((panel, i) => ({
      ...panel,
      image: imgs[i] ?? panel.image,
    })),
  };
}

/** Flat text of all dialogue/captions — useful for accessibility or search snippets. */
export function getComicStripTranscript(strip) {
  if (!strip?.panels?.length) return '';
  return strip.panels
    .map((panel) => {
      if (panel.dialogue?.length) {
        return panel.dialogue.map((line) => `${line.speaker}: ${line.text}`).join(' ');
      }
      return panel.caption || '';
    })
    .filter(Boolean)
    .join(' ');
}
