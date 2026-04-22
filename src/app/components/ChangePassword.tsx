import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Eye, EyeOff, Lock, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function ChangePassword() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới không khớp');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Đổi mật khẩu thành công');
      navigate('/profile');
    }, 1500);
  };

  const passwordStrength = () => {
    if (newPassword.length === 0) return 0;
    if (newPassword.length < 8) return 1;
    if (newPassword.length < 12) return 2;
    return 3;
  };

  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthTexts = ['', 'Yếu', 'Trung bình', 'Mạnh'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-4 pt-6 pb-20">
        <button
          onClick={() => navigate('/profile')}
          className="flex items-center space-x-2 text-white/90 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Đổi mật khẩu</h1>
            <p className="text-white/80 text-sm">Cập nhật mật khẩu bảo mật của bạn</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 -mt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-amber-200/50 p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-amber-900 mb-2">
                Mật khẩu hiện tại
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-amber-900 mb-2">
                Mật khẩu mới
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-2">
                  <div className="flex space-x-1 mb-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength() ? strengthColors[passwordStrength()] : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-amber-700/70">
                    Độ mạnh: <span className="font-medium">{strengthTexts[passwordStrength()]}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-amber-900 mb-2">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {newPassword === confirmPassword ? (
                    <>
                      <Check className="h-4 w-4 text-green-600" />
                      <p className="text-xs text-green-600 font-medium">Mật khẩu khớp</p>
                    </>
                  ) : (
                    <p className="text-xs text-red-600">Mật khẩu không khớp</p>
                  )}
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-200/50">
              <p className="text-xs font-medium text-amber-900 mb-2">Yêu cầu mật khẩu:</p>
              <ul className="space-y-1 text-xs text-amber-700/70">
                <li>• Ít nhất 8 ký tự</li>
                <li>• Nên bao gồm chữ hoa, chữ thường và số</li>
                <li>• Nên có ký tự đặc biệt (@, #, $, v.v.)</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  <span>Cập nhật mật khẩu</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
