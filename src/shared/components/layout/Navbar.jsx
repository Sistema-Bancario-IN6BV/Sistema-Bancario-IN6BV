import imgLogo from "../../../assets/img/LogoTipo.png";
import { AvatarUser } from "../ui/AvatarUser";

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Navbar = () => {
  return (
    <nav className="bg-bg-card border-b border-white/5 sticky top-0 z-50">
      <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="w-full px-5 md:px-7 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="relative">
            <img
              src={imgLogo}
              alt="Logo Banco"
              className="h-9 w-9 rounded-xl object-cover border border-accent/25 shadow-[0_0_12px_rgba(245,200,66,0.2)]"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-bg-card shadow" />
          </div>

          <div className="hidden sm:block leading-tight">
            <p className="text-accent font-bold text-sm tracking-widest uppercase font-serif">
              Banco
            </p>
            <div className="flex items-center gap-1 text-emerald-400">
              <ShieldIcon />
              <span className="text-[10px] font-medium tracking-wide">Sesión segura</span>
            </div>
          </div>
        </div>



        <div className="flex items-center gap-2">
          {/* Notificaciones */}
          <button className="relative flex items-center justify-center w-9 h-9 rounded-xl
            bg-bg-page/60 border border-white/8 text-text-muted
            hover:text-text-body hover:bg-bg-page hover:border-white/15
            transition-all duration-200">
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent
              shadow-[0_0_6px_rgba(245,200,66,0.8)]" />
          </button>

          <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

          <AvatarUser />
        </div>
      </div>
    </nav>
  );
};