/**
 * Renders a three-panel comic for `moduleKey`: merged script + JPG art from getModuleComicStrip.
 */
import React from 'react';
import { getModuleComicStrip } from '../lib/moduleComics';
import ComicPanelPerson from './ComicPanelPerson';

const FALLBACK_CAST = [
  { name: 'A', shirt: '#6366f1', skin: '#fde68a', hair: '#44403c' },
  { name: 'B', shirt: '#059669', skin: '#fdba74', hair: '#1c1917' },
];

/** Ensures two on-stage characters even if data omits cast (fallback silhouettes). */
function panelCast(strip) {
  if (strip.cast?.length >= 2) return strip.cast;
  return FALLBACK_CAST;
}

export default function ModuleComicStrip({ moduleKey }) {
  const strip = getModuleComicStrip(moduleKey);
  if (!strip) return null;

  return (
    <div className="module-comic-strip-wrap" aria-labelledby={`comic-strip-title-${moduleKey}`}>
      <div className="module-comic-strip-header">
        <p className="module-comic-strip-kicker" aria-hidden="true">
          Comic strip
        </p>
        <h3 className="module-comic-strip-title" id={`comic-strip-title-${moduleKey}`}>
          {strip.title}
        </h3>
        {strip.subtitle && <p className="module-comic-strip-sub muted-text">{strip.subtitle}</p>}
      </div>
      <div className="module-comic-strip">
        {strip.panels.map((panel, i) => {
          const cast = panelCast(strip);
          return (
            <React.Fragment key={panel.scene}>
              <figure className={`module-comic-panel module-comic-panel--${panel.tone}`}>
                <span className="module-comic-scene" aria-hidden="true">
                  Panel {panel.scene}
                </span>
                <div className={`module-comic-frame module-comic-frame--${panel.tone}`}>
                  <span className="module-comic-halftone" aria-hidden="true" />
                  <div className="module-comic-stage" aria-hidden="true">
                    <ComicPanelPerson {...cast[0]} facing="right" />
                    <div className="module-comic-scene-cell">
                      {panel.image ? (
                        <img
                          src={panel.image}
                          alt=""
                          className="module-comic-panel-img"
                          width={800}
                          height={480}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="module-comic-emoji">{panel.emoji}</span>
                      )}
                    </div>
                    <ComicPanelPerson {...cast[1]} facing="left" />
                  </div>
                </div>
                <figcaption className="module-comic-figcaption">
                  {panel.dialogue?.length ? (
                    <div
                      className="module-comic-chat"
                      role="group"
                      aria-label={`Panel ${panel.scene} conversation`}
                    >
                      {panel.dialogue.map((line, idx) => (
                        <div
                          key={idx}
                          className={`module-comic-chat-turn module-comic-chat-turn--${
                            idx % 2 === 0 ? 'left' : 'right'
                          }`}
                        >
                          <span className="module-comic-chat-speaker">{line.speaker}</span>
                          <p className="module-comic-chat-text">{line.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="module-comic-bubble module-comic-bubble--single">{panel.caption}</div>
                  )}
                </figcaption>
              </figure>
              {i < strip.panels.length - 1 && (
                <span className="module-comic-connector" aria-hidden="true">
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
