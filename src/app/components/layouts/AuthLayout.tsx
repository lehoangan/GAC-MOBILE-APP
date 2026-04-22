import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400/20 to-amber-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
