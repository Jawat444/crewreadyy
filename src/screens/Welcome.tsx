// Welcome (BUILD_SEQUENCE.md R2). Shown on every load, inside the landscape Stage:
// title, Play and How to Play on the left; the crew art on the right two-thirds.
// The bar follows real loading (fonts, images decoded, the save read): at least 1.8 s, at most 5 s.
import { useEffect, useState } from 'react';
import { BookOpen, Hand, Play, RotateCcw, Smartphone, Sparkles, X } from 'lucide-react';
import { t, useI18n } from '../content/i18n';
import { useGame } from '../store/game';
import { useSpace } from '../store/space';
import { MeterBadge } from '../components/meters';
import { reducedMotion } from '../components/motion';
import { MusicToggle } from '../components/MusicToggle';
import { CrewReadyLogo } from './Home';

interface WelcomeProps {
  onStart: () => void;
  onOpenTour?: () => void;
}

const artPath = (name: string) => `${import.meta.env.BASE_URL}art/${name}.webp`;
const WELCOME_ART = [artPath('welcome-1'), artPath('welcome-2')];
// The crew poses the hook and the "Turn your phone" hint show first.
const FIRST_SCENE_ART = [
  artPath('orbit-think'),
  artPath('orbit-surprised'),
  artPath('nova-think'),
  artPath('twinkle-happy'),
  artPath('twinkle-surprised'),
  artPath('twinkle-question'),
];
const MIN_MS = 1000;
const MAX_MS = 4000;

/** Real loading, as a 0–100 number plus a flag. Counts: fonts, save read, NASA data, every image decoded. */
function useRealLoading() {
  const [done, setDone] = useState(0);
  const [now, setNow] = useState(0);
  const total = 3 + WELCOME_ART.length + FIRST_SCENE_ART.length;

  useEffect(() => {
    let alive = true;
    const tick = () => alive && setDone((d) => d + 1);
    const settle = (p: Promise<unknown>) => void p.catch(() => {}).then(tick);

    settle(document.fonts ? Promise.all([document.fonts.load('800 1rem "Baloo Da 2"'), document.fonts.load('700 1rem Nunito'), document.fonts.ready]) : Promise.resolve());
    settle(
      new Promise<void>((resolve) => {
        if (useGame.persist.hasHydrated()) return resolve();
        const off = useGame.persist.onFinishHydration(() => {
          off();
          resolve();
        });
      }),
    );
    settle(useSpace.getState().load());
    [...WELCOME_ART, ...FIRST_SCENE_ART].forEach((src) => {
      const img = new Image();
      img.src = src;
      settle(img.decode());
    });

    const start = performance.now();
    const timer = setInterval(() => setNow(performance.now() - start), 40);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  const real = Math.min(1, done / total);
  const paced = Math.min(1, now / MIN_MS);
  const timedOut = now >= MAX_MS;
  const progress = timedOut ? 100 : Math.floor(Math.min(real, paced) * 100);
  return { progress, ready: progress >= 100 };
}

export function Welcome({ onStart, onOpenTour }: WelcomeProps) {
  const { lang, setLang } = useI18n();
  const { progress, ready } = useRealLoading();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const cut = reducedMotion();
  const nasaWeather = useSpace((s) => s.weather);
  const nasaLoading = nasaWeather === null;

  const handlePlay = () => {
    // Full screen and a landscape lock on a real tap. A refusal is ignored silently.
    try {
      if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
        document.documentElement
          .requestFullscreen()
          .then(() => (screen.orientation as unknown as { lock?: (o: string) => Promise<void> }).lock?.('landscape'))
          .catch(() => {});
      }
    } catch {
      /* ignore */
    }
    onStart();
  };

  // The real-looking kids turn into the game crew as the bar fills. Reduced motion: one straight cut when ready.
  const crossfade = cut ? (ready ? 1 : 0) : Math.min(1, Math.max(0, (progress - 15) / 75));
  const fade = cut ? '' : 'transition-opacity duration-700 ease-in-out';

  // "Checking today's Sun with NASA..." shows while the real NASA space-weather call runs.
  const loadingText =
    progress >= 98
      ? t('welcome.ready')
      : nasaLoading
        ? t('welcome.loading.nasa')
        : lang === 'bn' || progress < 30
          ? t('welcome.loading')
          : progress < 65
            ? t('welcome.loading.life')
            : t('welcome.loading.twinkle');

  return (
    <div className="relative min-h-full w-full overflow-y-auto overflow-x-hidden bg-space-deep text-text select-none flex flex-col justify-between p-3 sm:p-6 md:p-8">
      {/* Background Welcome Art matching Image 3 & 4 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Mobile vertical portrait artwork (Image 4) */}
        <img
          src="/art/welcome-bg-vertical.jpg"
          alt=""
          className="md:hidden absolute inset-0 h-full w-full object-cover object-bottom"
        />
        {/* Desktop landscape widescreen background with smooth crossfade */}
        <div className="hidden md:block absolute inset-0 left-auto right-0 w-[68%]">
          {WELCOME_ART.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover object-right ${fade}`}
              style={{ opacity: i === 0 ? 1 - crossfade : crossfade }}
            />
          ))}
          <div className="absolute inset-y-0 left-0 w-[35%] bg-gradient-to-r from-space-deep via-space-deep/80 to-transparent" />
        </div>
        {/* Soft vignette for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-space-deep/80 via-transparent to-space-deep/80 md:bg-transparent" />
      </div>

      {/* Top strip: brand on the left, music & language switch on the right */}
      <header className="relative z-20 flex items-center justify-between gap-2 pb-2 sm:pb-4">
        <CrewReadyLogo />

        <div className="flex items-center gap-2">
          <MusicToggle compact />
          <div role="group" aria-label="Language" className="flex items-center rounded-full border border-cyan-400/30 bg-[#091332]/90 p-1 shadow-md backdrop-blur-md">
            {(['en', 'bn'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`min-h-[2.125rem] min-w-[2.125rem] cursor-pointer rounded-full px-3 font-display text-xs sm:text-sm font-extrabold transition ${
                  lang === l ? 'bg-go text-go-text shadow-sm' : 'text-text/70 hover:text-text'
                }`}
              >
                {l === 'en' ? 'EN' : 'বাংলা'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Left zone: title, Play (or the bar), How to Play, Twinkle's Tour (Matching Image 3) */}
      <main className="relative z-10 flex flex-col justify-start md:justify-center gap-2.5 sm:gap-4 mt-1 mb-auto md:my-auto max-w-lg md:w-[50%]">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] leading-none font-black italic tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] break-words">
            {t('app.name')}
          </h1>
          <p className="mt-1 font-display text-base sm:text-xl font-bold tracking-wide text-text/90 drop-shadow">
            {lang === 'bn' ? t('app.subtitle') : 'Junior Astronaut Training'}
          </p>

          {/* Small font instruction to rotate device / play in landscape */}
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-[#081230]/85 px-3 py-0.5 font-display text-[11px] sm:text-xs font-semibold text-cyan-200/95 shadow-sm backdrop-blur-md">
            <Smartphone size={12} className="text-go shrink-0" />
            <span>
              {lang === 'bn'
                ? 'সেরা অভিজ্ঞতার জন্য ফোনটি আড়াআড়ি (landscape) ঘোরাও 🔄'
                : 'For best experience, rotate your phone to landscape 🔄'}
            </span>
          </div>
        </div>

        {/* Vertically stacked full-width buttons matching Image 3 */}
        <div className="flex w-full max-w-xs sm:max-w-sm flex-col gap-2.5">
          {ready ? (
            <button
              onClick={handlePlay}
              autoFocus
              className="anim-pop group flex min-h-[3.25rem] sm:min-h-[3.5rem] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#22D7E6] to-[#0F8F9C] px-6 py-2.5 font-display text-lg sm:text-xl font-black text-[#06202B] leading-snug shadow-[0_0_24px_rgba(34,215,230,0.6),0_3px_0_#0A5B64] active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Play size={20} strokeWidth={2.75} fill="currentColor" className="shrink-0 fill-current" />
              <span className="py-0.5 leading-snug">{t('welcome.play')}</span>
            </button>
          ) : (
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label={loadingText}
              className="relative flex h-[3.25rem] w-full items-center overflow-hidden rounded-full border-2 border-go/40 bg-panel/85 p-1"
            >
              <div className="h-full rounded-full bg-gradient-to-r from-[#0f8f9c] to-go transition-all duration-300" style={{ width: `${progress}%` }} />
              <div className="absolute inset-0 flex items-center justify-between px-3.5 font-display text-xs sm:text-sm font-extrabold text-text">
                <span className="flex items-center gap-1.5 min-w-0 pr-2">
                  <Sparkles size={16} className="shrink-0 text-go" />
                  <span className="truncate">{loadingText}</span>
                </span>
                <span className="ml-auto tabular-nums text-go shrink-0">{progress}%</span>
              </div>
            </div>
          )}

          {/* How to Play Button (Full Width matching Image 3) */}
          <button
            onClick={() => setShowHowToPlay(true)}
            className="flex min-h-[2.85rem] w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-[#0E1B45]/85 hover:bg-[#142357] px-4 py-2 font-display text-sm sm:text-base font-bold text-white shadow-md backdrop-blur-md text-center leading-snug transition active:scale-95"
          >
            <BookOpen size={18} strokeWidth={2.2} className="text-white shrink-0" />
            <span className="py-0.5 whitespace-nowrap">{t('welcome.howToPlay')}</span>
          </button>

          {/* Twinkle's Tour Button (Full Width matching Image 3) */}
          {onOpenTour && (
            <button
              onClick={onOpenTour}
              className="flex min-h-[2.85rem] w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-cyan-400/40 bg-[#0E1B45]/85 hover:bg-[#142357] px-4 py-2 font-display text-sm sm:text-base font-bold text-cyan-300 hover:border-cyan-400 shadow-md backdrop-blur-md text-center leading-snug transition active:scale-95"
            >
              <Sparkles size={16} strokeWidth={2.2} className="shrink-0 text-cyan-400" />
              <span className="py-0.5 whitespace-nowrap">{t('welcome.tour')}</span>
            </button>
          )}
        </div>
      </main>

      <p className="relative z-10 pt-2 pb-1 text-[11px] sm:text-xs font-semibold text-text/60">{t('welcome.credit')}</p>

      {showHowToPlay ? <HowToPlay onClose={() => setShowHowToPlay(false)} /> : null}
    </div>
  );
}

/** Three picture panels, one line each. */
function HowToPlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [onClose]);

  const panels = [
    {
      line: t('howToPlay.p1'),
      art: (
        <div className="flex gap-[0.375rem]">
          {(['P', 'L', 'F', 'S'] as const).map((m) => (
            <MeterBadge key={m} meter={m} size={34} />
          ))}
        </div>
      ),
    },
    {
      line: t('howToPlay.p2'),
      art: (
        <div className="flex items-center gap-[0.5rem]">
          <Hand size={34} className="text-text" />
          <span className="rounded-[0.75rem] bg-go px-[0.75rem] py-[0.25rem] font-display text-[1.25rem] font-extrabold text-go-text shadow-[0_0.2rem_0_var(--color-go-lip)]">GO</span>
        </div>
      ),
    },
    {
      line: t('howToPlay.p3'),
      art: (
        <div className="flex items-center gap-[0.5rem]">
          <span className="grid h-[2.125rem] w-[2.125rem] place-items-center rounded-full bg-[#d93a3a] font-display font-extrabold text-white">0</span>
          <RotateCcw size={30} className="text-go" />
        </div>
      ),
    },
  ];

  return (
    <div role="dialog" aria-modal="true" aria-label={t('howToPlay.title')} className="absolute inset-0 z-50 grid place-items-center bg-space-deep/85 p-[1rem]">
      <div className="relative w-full max-w-[40rem] rounded-[1.5rem] border-2 border-line bg-panel p-[1rem]">
        <div className="mb-[0.75rem] flex items-center justify-between">
          <h2 className="font-display text-[1.5rem] font-extrabold">{t('howToPlay.title')}</h2>
          <button onClick={onClose} aria-label={t('howToPlay.close')} className="grid h-[2.75rem] w-[2.75rem] cursor-pointer place-items-center rounded-full bg-text/10 hover:bg-text/20">
            <X size={20} />
          </button>
        </div>
        <ol className="grid grid-cols-3 gap-[0.75rem]">
          {panels.map((p, i) => (
            <li key={i} className="flex flex-col items-center gap-[0.75rem] rounded-[1rem] border-2 border-line bg-panel-up p-[0.75rem] text-center">
              <span className="grid h-[1.75rem] w-[1.75rem] place-items-center rounded-full bg-go font-display font-extrabold text-go-text">{i + 1}</span>
              <div className="grid min-h-[3rem] place-items-center">{p.art}</div>
              <p className="font-sans text-[1rem] leading-snug font-bold">{p.line}</p>
            </li>
          ))}
        </ol>
        <button
          onClick={onClose}
          autoFocus
          className="mt-[1rem] min-h-[2.75rem] w-full cursor-pointer rounded-full bg-gradient-to-b from-[#48e3f0] to-go px-4 py-2 font-display text-base sm:text-lg font-extrabold text-go-text leading-snug break-words shadow-[0_0.35rem_0_var(--color-go-lip)] active:translate-y-[0.25rem] active:shadow-[0_0.1rem_0_var(--color-go-lip)]"
        >
          {t('howToPlay.close')}
        </button>
      </div>
    </div>
  );
}
