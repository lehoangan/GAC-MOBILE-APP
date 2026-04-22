import { useState, useRef, useEffect } from 'react'
import { Home, Package, Clipboard, CheckSquare, Truck, FileText, Users, ClipboardCheck, Database, Shield, ChevronUp } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router'

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  approvalCount?: number
}

export function MobileNavigation({ activeTab, onTabChange, approvalCount = 0 }: MobileNavigationProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isProductionMenuOpen, setIsProductionMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { id: 'dashboard', label: 'Tổng quan', icon: Home },
    { id: 'master-data', label: 'Dữ liệu gốc', icon: Database },
    { id: 'sales', label: 'Đơn hàng', icon: FileText },
    { id: 'production', label: 'Sản xuất', icon: Clipboard, hasSubmenu: true },
    { id: 'approval', label: 'Phê duyệt', icon: ClipboardCheck, badge: approvalCount },
    { id: 'delivery', label: 'Giao hàng', icon: Truck },
    { id: 'security', label: 'An ninh', icon: Shield },
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProductionMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu when path changes
  useEffect(() => {
    setIsProductionMenuOpen(false)
  }, [location.pathname])

  const handleTabClick = (tabId: string) => {
    if (tabId === 'production') {
      setIsProductionMenuOpen(!isProductionMenuOpen)
    } else {
      setIsProductionMenuOpen(false)
      onTabChange(tabId)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Submenu Popover */}
      {isProductionMenuOpen && (
        <div 
          ref={menuRef}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-[280px] bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                navigate('/production')
                setIsProductionMenuOpen(false)
              }}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                location.pathname === '/production' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                location.pathname === '/production' ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <Clipboard className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Kế hoạch sản xuất</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Điều độ & Vật tư</p>
              </div>
            </button>

            <button
              onClick={() => {
                navigate('/production/quality')
                setIsProductionMenuOpen(false)
              }}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                location.pathname === '/production/quality' 
                  ? 'bg-emerald-50 text-emerald-700' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                location.pathname === '/production/quality' ? 'bg-emerald-100' : 'bg-gray-100'
              }`}>
                <CheckSquare className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm">Kiểm tra chất lượng</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Ghi nhận hàng lỗi</p>
              </div>
            </button>
          </div>
          <div className="bg-emerald-50/50 py-2 text-center">
            <p className="text-[9px] font-black text-emerald-800/40 uppercase tracking-widest">Gỗ Á Châu Production</p>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-lg border-t border-emerald-200/40 shadow-2xl safe-area-pb">
        <div className="flex justify-between items-center px-2 py-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 mx-0.5 rounded-xl transition-all duration-300 ease-out relative ${
                  isActive 
                    ? 'bg-gradient-to-b from-emerald-100 via-emerald-50 to-green-50 shadow-md scale-105 border border-emerald-200/50' 
                    : 'hover:bg-emerald-50/50 hover:scale-102 active:scale-95'
                }`}
              >
                {/* Badge notification */}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium min-w-[18px] text-center">
                    {tab.badge}
                  </span>
                )}
                
                {/* Icon */}
                <div className={`relative mb-1 ${isActive ? 'transform -translate-y-0.5' : ''}`}>
                  <IconComponent 
                    className={`h-5 w-5 transition-all duration-200 ${
                      isActive 
                        ? 'text-emerald-700 drop-shadow-sm' 
                        : 'text-gray-500 group-hover:text-emerald-600'
                    }`} 
                  />
                  {isActive && (
                    <div className="absolute -inset-1 bg-emerald-200/30 rounded-lg blur-sm"></div>
                  )}
                  {tab.hasSubmenu && isActive && (
                    <div className="absolute -top-1 -right-1 bg-emerald-500 w-1.5 h-1.5 rounded-full border border-white" />
                  )}
                </div>
                
                {/* Label */}
                <span 
                  className={`text-xs font-medium transition-all duration-200 leading-tight text-center ${
                    isActive 
                      ? 'text-emerald-800 drop-shadow-sm' 
                      : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-sm"></div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Subtle bottom accent */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
      </div>
    </div>
  )
}