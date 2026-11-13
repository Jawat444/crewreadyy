// Level 1 — pack the rocket. Eight crates wait on the launch pad. Tap a bin and a crate hops in and stacks;
// tap a bin's stack to send one back. Each bin shows its meter with a ghost bar for where it will end up.
// Landscape: the pad and the door button on one row, four bins in a row under them.
import { useRef, useState } from 'react';
import { DoorClosed, Plus, Undo2 } from 'lucide-react';
import { packCrates } from '../../engine/engine';
import { METER_NAMES, type CratesStep, type GameState } from '../../engine/types';
import { GameButton } from '../GameButton';
import { METER_COLOR, MeterBadge } from '../meters';
import { CRATE_HTML, Crate, hop, ToyArea, type Done } from './shared';
import { useI18n, tMission } from '../../content/i18n';

export function Crates({ step, game, onDone }: { step: CratesStep; game: GameState; onDone: Done }) {
  const lang = useI18n((s) => s.lang);
  const [counts, setCounts] = useState(step.bins.map(() => 0));
  // Which bin (or the pad, -1) just received a crate, so only that crate pops in as the copy lands.
  const [landed, setLanded] = useState<{ at: number; n: number } | null>(null);
  const left = step.crates - counts.reduce((a, b) => a + b, 0);
  const pad = useRef<HTMLDivElement>(null);
  const stacks = useRef<(HTMLElement | null)[]>([]);

  const add = (i: number) => {
    if (left === 0) return;
    hop(pad.current?.querySelector('[data-crate]:last-child'), stacks.current[i], CRATE_HTML);
    setCounts(counts.map((c, j) => (j === i ? c + 1 : c)));
    setLanded({ at: i, n: counts[i] + 1 });
  };
  const takeBack = (i: number) => {
    if (!counts[i]) return;
    hop(stacks.current[i], pad.current, CRATE_HTML);
    setCounts(counts.map((c, j) => (j === i ? c - 1 : c)));
    setLanded({ at: -1, n: left + 1 });
  };

  return (
    <div className="flex flex-col gap-2 md:flex-1 md:min-h-0">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
        {/* The launch pad: crates still to pack. */}
        <div ref={pad} className="flex min-h-[3rem] min-w-0 flex-1 flex-wrap items-center gap-1 rounded-tile border-2 border-line bg-panel px-2.5 py-1" aria-live="polite">
          <span className="sr-only">{left ? `${left} crates left on the launch pad.` : 'All crates are packed.'}</span>
          {Array.from({ length: left }, (_, k) => (
            <span key={k} data-crate>
              <Crate size={24} land={landed?.at === -1 && k === left - 1} />
            </span>
          ))}
          <span className="ml-auto rounded-full bg-space-deep px-2 py-0.5 font-display text-xs sm:text-sm leading-snug font-extrabold tabular-nums" aria-hidden>
            {left
              ? (lang === 'bn' ? `${left}টি বাকি` : `${left} left`)
              : (lang === 'bn' ? 'প্যাড খালি!' : 'Pad empty!')}
          </span>
        </div>
        <GameButton
          variant="go"
          icon={DoorClosed}
          disabled={left !== 0}
          onClick={() => onDone(packCrates(game, step, counts))}
          className="!min-h-[2.875rem] !px-3 sm:!px-4 !text-xs sm:!text-sm leading-snug break-words shrink-0"
        >
          {left
            ? (lang === 'bn' ? `আরও ${left}টি দাও` : `Pack ${left} more`)
            : (lang === 'bn' ? 'দরজা বন্ধ করো' : 'Close the door')}
        </GameButton>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:flex-1 md:min-h-0 pb-1">
        {step.bins.map((b, i) => {
          const now = game.meters[b.meter];
          const after = Math.min(100, now + counts[i] * step.perCrate);
          return (
            <div key={b.meter} className="flex min-h-[10.5rem] sm:min-h-0 flex-col rounded-tile border-2 border-line bg-panel text-text">
              <div className="flex items-center gap-1 rounded-t-[0.875rem] px-2 py-1.5" style={{ background: `color-mix(in srgb, ${METER_COLOR[b.meter]} 55%, #14204d)` }}>
                <MeterBadge meter={b.meter} size={22} />
                <span className="min-w-0 font-display text-[0.6875rem] sm:text-[0.75rem] leading-[1.15] font-extrabold break-words line-clamp-2">{tMission(b.label)}</span>
              </div>

              {/* The stack: tap it to send the top crate back to the pad. */}
              <div className="min-h-0 flex-1 px-1 pt-1">
                <ToyArea
                  onClick={() => takeBack(i)}
                  disabled={!counts[i]}
                  label={`Take a crate out of ${tMission(b.label)}. It has ${counts[i]}.`}
                  className="flex h-full min-h-[2.5rem] w-full flex-wrap-reverse content-start items-end justify-center gap-[0.125rem] overflow-hidden !bg-space-deep px-[0.125rem] py-[0.25rem] disabled:!bg-space-deep !mb-0"
                >
                  <span ref={(el) => void (stacks.current[i] = el)} className="flex flex-wrap-reverse justify-center gap-[0.125rem]">
                    {counts[i] ? (
                      Array.from({ length: counts[i] }, (_, k) => <Crate key={k} size={20} land={landed?.at === i && k === counts[i] - 1} />)
                    ) : (
                      <Crate size={20} faded />
                    )}
                  </span>
                  {counts[i] ? <Undo2 size={14} strokeWidth={3} aria-hidden className="absolute top-[0.125rem] right-[0.125rem] text-muted" /> : null}
                </ToyArea>
              </div>

              {/* Meter now, and a ghost bar for where it will end up. */}
              <div className="px-1.5 py-1">
                <div className="flex items-baseline justify-between font-display text-[0.8125rem] sm:text-[0.875rem] leading-tight font-extrabold tabular-nums">
                  <span className="sr-only">{METER_NAMES[b.meter]}: </span>
                  <span className="text-muted/90">{now}</span>
                  {counts[i] ? <span className="text-[#3ddc84] font-black"> → {after}</span> : null}
                </div>
                <div className="relative mt-1 h-[0.5rem] overflow-hidden rounded-full border border-line bg-space-deep" aria-hidden>
                  <div
                    className="absolute inset-y-0 left-0 transition-[width] duration-300"
                    style={{ width: `${after}%`, background: `repeating-linear-gradient(135deg, ${METER_COLOR[b.meter]} 0 5px, transparent 5px 9px)` }}
                  />
                  <div className="absolute inset-y-0 left-0" style={{ width: `${now}%`, background: METER_COLOR[b.meter] }} />
                </div>
              </div>

              <div className="px-1 pt-0.5 pb-1">
                <ToyArea
                  onClick={() => add(i)}
                  disabled={left === 0}
                  label={`Put a crate in ${b.label}`}
                  className="flex min-h-[2.5rem] w-full items-center justify-center gap-[0.25rem] bg-crate font-display text-[0.875rem] sm:text-[0.9375rem] font-extrabold text-white [--lip:var(--color-crate-lip)] disabled:bg-locked disabled:text-muted disabled:[--lip:var(--color-locked-lip)] !mb-0"
                >
                  <Plus size={16} strokeWidth={3.25} aria-hidden /> {lang === 'bn' ? 'ক্রেট' : 'Crate'}
                </ToyArea>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
