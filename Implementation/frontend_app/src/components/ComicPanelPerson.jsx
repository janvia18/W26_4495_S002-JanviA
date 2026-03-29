import React from 'react';

/** Simple comic figure—pairs with a second character and dialogue in each panel. */
export default function ComicPanelPerson({ name, shirt, skin, hair, facing = 'right' }) {
  const mirror = facing === 'left';
  return (
    <div className={`module-comic-person module-comic-person--face-${facing}`}>
      <div
        className="module-comic-person-figure"
        style={mirror ? { transform: 'scaleX(-1)' } : undefined}
        aria-hidden="true"
      >
        <svg viewBox="0 0 80 118" className="module-comic-person-svg">
          <path
            d="M32 82 L26 116 M48 82 L54 116"
            fill="none"
            stroke="#111827"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M22 50 L40 42 L58 50 L55 82 L25 82 Z"
            fill={shirt}
            stroke="#111827"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="33" y="38" width="14" height="12" rx="2" fill={skin} stroke="#111827" strokeWidth="2" />
          <ellipse cx="40" cy="24" rx="17" ry="18" fill={skin} stroke="#111827" strokeWidth="2.5" />
          <path
            d="M23 22 Q40 4 57 22 Q52 12 40 10 Q28 12 23 22 Z"
            fill={hair}
            stroke="#111827"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="33" cy="24" r="2.2" fill="#111827" />
          <circle cx="47" cy="24" r="2.2" fill="#111827" />
          <path
            d="M32 31 Q40 37 48 31"
            fill="none"
            stroke="#111827"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className="module-comic-person-name">{name}</span>
    </div>
  );
}
