// Navigation outside levels:
// Desktop (md:): a sleek rail down the left edge.
// Mobile (< md): a floating bottom pill navigation bar matching Image 1.
import { Box, Compass, GraduationCap, House, Lock, UserRound, type LucideIcon } from 'lucide-react';
import { BUILT_SCREENS, useGame, type Screen } from '../store/game';
import { usePress } from './motion';

const ITEMS: { label: string; icon: LucideIcon; screen: Screen; alsoActive?: Screen[] }[] = [
  { label: 'Home', icon: House, screen: 'home' },
  { label: 'Missions', icon: Compass, screen: 'map' },
  { label: 'My Base', icon: Box, screen: 'resources' },
  { label: 'Training', icon: GraduationCap, screen: 'training' },
  { label: 'Me', icon: UserRound, screen: 'profile' },
];

function DesktopDockButton({ label, icon: Icon, open, here, onClick }: { label: string; icon: LucideIcon; open: boolean; here: boolean; onClick: () => void }) {
  const press = usePress(!open);
  return (
    <button
      onClick={onClick}
      disabled={!open}
      aria-current={here ? 'page' : undefined}
      aria-label={open ? label : `${label} (locked)`}
      title={label}
      {...press}
      className="group relative flex flex-col items-center justify-center rounded-2xl disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer py-1 px-1.5"
    >
      <span
        data-pressed={press['data-pressed']}
        className={`toy !mb-[0.25rem] grid h-[3rem] w-[3rem] place-items-center rounded-2xl transition-all duration-150 ${
          here
            ? 'bg-gradient-to-b from-go/35 to-go/20 text-go border-2 border-go shadow-[0_0_16px_rgba(34,215,230,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] [--lip:var(--color-go-lip)]'
            : open
              ? 'bg-white/[0.08] hover:bg-white/[0.16] hover:border-white/40 border border-white/20 text-white/90 shadow-sm backdrop-blur-sm [--lip:rgba(0,0,0,0.35)]'
              : 'bg-black/30 text-muted/50 border border-white/10 [--lip:rgba(0,0,0,0.3)]'
        }`}
        aria-hidden
      >
        <Icon size={22} strokeWidth={here ? 2.6 : 2.2} />
        {!open ? (
          <span className="absolute -right-1 -bottom-1 grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-space-deep/90 text-muted">
            <Lock size={10} strokeWidth={2.5} />
          </span>
        ) : null}
      </span>
      <span className={`text-[10px] font-display font-bold tracking-tight ${here ? 'text-go font-black' : 'text-muted'}`}>{label}</span>
    </button>
  );
}

export function Dock() {
  const { screen, go } = useGame();

  return (
    <>
      {/* Desktop Left Rail */}
      <nav aria-label="Main" className="hidden md:flex h-full w-[4.75rem] flex-col items-center justify-center border-r border-white/15 bg-space-deep/60 backdrop-blur-xl py-[0.5rem] shadow-[4px_0_24px_rgba(0,0,0,0.35)]">
        <ul className="flex flex-col items-center gap-[0.5rem]">
          {ITEMS.map(({ label, icon, screen: target, alsoActive }) => {
            const isHere = screen === target || !!alsoActive?.includes(screen);
            return (
              <li key={label}>
                <DesktopDockButton label={label} icon={icon} open={BUILT_SCREENS.has(target)} here={isHere} onClick={() => go(target)} />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Floating Bottom Bar (Matching Image 1) */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-sm">
        <div className="flex items-center justify-around rounded-3xl border border-cyan-400/35 bg-[#070E28]/95 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.75),0_0_20px_rgba(34,215,230,0.18)] backdrop-blur-xl">
          {ITEMS.map(({ label, icon: Icon, screen: target, alsoActive }) => {
            const isHere = screen === target || !!alsoActive?.includes(screen);
            const open = BUILT_SCREENS.has(target);
            return (
              <button
                key={label}
                onClick={() => go(target)}
                disabled={!open}
                aria-label={label}
                className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
                  isHere
                    ? 'bg-[#0A3648] text-[#22D7E6] border border-[#22D7E6] shadow-[0_0_12px_rgba(34,215,230,0.5)]'
                    : 'text-white/70 hover:text-white active:scale-95'
                }`}
              >
                <Icon size={19} strokeWidth={isHere ? 2.6 : 2.0} />
                <span className="text-[9px] font-display font-extrabold mt-0.5 tracking-tight leading-none">{label}</span>
                {!open && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-space-deep text-muted border border-white/20">
                    <Lock size={7} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
