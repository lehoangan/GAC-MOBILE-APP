import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { MobileNavigation } from '../MobileNavigation';
import { Bell, Settings, User } from 'lucide-react';
import { Toaster } from '../ui/sonner';

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [approvalCount] = useState(2);

  // Determine active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path.startsWith('/master-data')) return 'master-data';
    if (path.startsWith('/customers')) return 'master-data'; // Backward compatibility or direct links
    if (path.startsWith('/products')) return 'master-data';  // Backward compatibility or direct links
    if (path.startsWith('/sales')) return 'sales';
    if (path.startsWith('/production')) return 'production';
    if (path.startsWith('/approval')) return 'approval';
    if (path.startsWith('/delivery')) return 'delivery';
    if (path.startsWith('/security')) return 'security';
    return 'dashboard';
  };

  const handleTabChange = (tab: string) => {
    const routes: Record<string, string> = {
      dashboard: '/',
      'master-data': '/master-data',
      sales: '/sales',
      production: '/production',
      approval: '/approval',
      delivery: '/delivery',
      security: '/security',
    };
    navigate(routes[tab] || '/');
  };

  // Hide navigation for certain routes
  const shouldHideNavigation =
    location.pathname.includes('/create') ||
    location.pathname.includes('/change-password') ||
    location.pathname.includes('/notifications') ||
    location.pathname.match(/\/approval\/[^/]+$/);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200/50 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-emerald-100/50">
              <img 
                src="https://goachau.vn/wp-content/uploads/2022/11/logo.png" 
                alt="Gỗ Á Châu Logo" 
                className="h-11 w-auto object-contain" 
              />
            </div>
            <div className="flex flex-col justify-center border-l border-emerald-200/50 pl-4 h-11">
              <h1 className="text-xl font-black text-amber-950 leading-none mb-1 tracking-tight">ERP</h1>
              <p className="text-[9px] text-emerald-700/80 uppercase font-black tracking-widest whitespace-nowrap">Hệ thống quản lý tổng thể</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/notifications')}
              className="w-9 h-9 bg-white/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors relative"
            >
              <Bell className="h-4 w-4 text-emerald-700" />
              {approvalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium min-w-[16px] text-center">
                  {approvalCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="w-9 h-9 bg-white/60 backdrop-blur-sm border border-emerald-200/50 rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors"
            >
              <User className="h-4 w-4 text-emerald-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative bg-gray-50/50 pb-24">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      {!shouldHideNavigation && (
        <MobileNavigation
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          approvalCount={approvalCount}
        />
      )}

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
