import { useNavigate } from 'react-router';
import { ArrowLeft, User, Mail, Phone, ShoppingCart, DollarSign, Lock, LogOut, Camera } from 'lucide-react';
import { motion } from 'motion/react';

export function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-4 pt-6 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />

        <div className="relative z-10">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Quay lại</span>
          </button>

          <h1 className="text-2xl font-bold text-white mb-1">Thông tin tài khoản</h1>
          <p className="text-white/80 text-sm">Quản lý thông tin cá nhân của bạn</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-16 relative z-20 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-amber-200/50 p-6"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <User className="h-12 w-12" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-amber-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-amber-900 mt-4">Nguyễn Văn A</h2>
            <p className="text-sm text-amber-700/70">Quản lý sản xuất</p>
          </div>

          {/* Info Section */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-amber-50/50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-700/70">Email</p>
                <p className="font-medium text-amber-900">nguyenvana@goacchau.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-amber-50/50 rounded-xl">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-amber-700/70">Số điện thoại</p>
                <p className="font-medium text-amber-900">0901 234 567</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/50">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <p className="text-xs text-blue-700/70">Tổng đơn hàng</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">248</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200/50">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <p className="text-xs text-green-700/70">Tổng giá trị</p>
              </div>
              <p className="text-2xl font-bold text-green-900">12.5B</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/profile/change-password')}
              className="w-full flex items-center space-x-3 p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors border border-amber-200/50"
            >
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-amber-900">Đổi mật khẩu</p>
                <p className="text-xs text-amber-700/70">Cập nhật mật khẩu bảo mật</p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-200/50"
            >
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <LogOut className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-red-900">Đăng xuất</p>
                <p className="text-xs text-red-700/70">Thoát khỏi tài khoản</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
