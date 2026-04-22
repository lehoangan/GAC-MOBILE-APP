import { useNavigate } from 'react-router';
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { TrendingUp, Package, DollarSign, Plus, Bell, AlertCircle, CheckCircle, Clock, Users, Clipboard, Truck, BarChart3, Eye, ClipboardList } from 'lucide-react'

export function Dashboard() {
  const navigate = useNavigate();
  const salesData = [
    { name: 'Bàn gỗ sồi cao cấp', quantity: 25, revenue: 125000000, trend: '+12%' },
    { name: 'Tủ áo gỗ thông Nordic', quantity: 18, revenue: 90000000, trend: '+8%' },
    { name: 'Ghế gỗ cao su ergonomic', quantity: 42, revenue: 84000000, trend: '+15%' },
  ]

  const bestSellers = [
    { name: 'Ghế gỗ cao su ergonomic', sold: 42, trend: '+15%', category: 'Nội thất văn phòng' },
    { name: 'Bàn gỗ sồi cao cấp', sold: 25, trend: '+12%', category: 'Nội thất gia đình' },
    { name: 'Tủ áo gỗ thông Nordic', sold: 18, trend: '+8%', category: 'Phòng ngủ' },
  ]

  const quickActions = [
    {
      icon: Users,
      label: 'Tạo khách hàng',
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      route: '/customers'
    },
    {
      icon: Clipboard,
      label: 'Tạo đơn hàng',
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      route: '/sales/create'
    },
    {
      icon: Truck,
      label: 'Theo dõi giao hàng',
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      route: '/delivery'
    },
    {
      icon: ClipboardList,
      label: 'Kế Hoạch SX',
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      route: '/production'
    },
  ]

  const notifications = [
    {
      id: 1,
      type: 'warning',
      icon: AlertCircle,
      title: 'Cảnh báo tồn kho',
      message: 'Giường gỗ sồi King Size sắp hết hàng (còn 2 sản phẩm)',
      time: '5 phút trước',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle,
      title: 'Hoàn thành QC',
      message: 'Lô sản xuất BT-005 đã qua kiểm tra chất lượng',
      time: '15 phút trước',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'delivery',
      icon: Truck,
      title: 'Giao hàng thành công',
      message: 'Đơn hàng #DH001 đã được giao đến khách hàng Nguyễn Văn A',
      time: '20 phút trước',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 4,
      type: 'info',
      icon: Clock,
      title: 'Nhắc nhở sản xuất',
      message: 'Kế hoạch sản xuất bộ bàn ăn gỗ sồi đến hạn hôm nay',
      time: '30 phút trước',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ]

  const stats = [
    {
      title: 'Doanh thu tháng',
      value: '2.4 tỷ',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Sản phẩm bán',
      value: '85',
      change: '+8.2%',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Đơn hàng mới',
      value: '23',
      change: '+15.1%',
      icon: Clipboard,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Khách hàng',
      value: '156',
      change: '+6.8%',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    }
  ]

  const handleQuickAction = (action: any) => {
    if (action.route) {
      navigate(action.route)
    }
  }

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200/50 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-emerald-900">Chào mừng trở lại!</h2>
            <p className="text-sm text-emerald-700/70">
              Hôm nay: {new Date().toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="p-4 border-0 shadow-sm bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <div className={`w-6 h-6 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                </div>
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="p-4 border-0 shadow-sm bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Tác vụ nhanh</h3>
          <Plus className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickAction(action)}
                className="h-auto p-4 flex flex-col items-center space-y-3 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-200 active:scale-95"
              >
                <div className={`w-12 h-12 rounded-xl ${action.bg} flex items-center justify-center`}>
                  <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center shadow-sm`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-4 border-0 shadow-sm bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Thông báo mới nhất</h3>
          <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
            <Eye className="h-4 w-4 mr-2" />
            Xem tất cả
          </Button>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 3).map((notification) => {
            const IconComponent = notification.icon
            return (
              <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                <div className={`w-8 h-8 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className={`h-4 w-4 ${notification.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Sales Performance */}
      <Card className="p-4 border-0 shadow-sm bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sản phẩm bán chạy</h3>
        <div className="space-y-3">
          {bestSellers.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-emerald-700/70">{item.category} • {item.sold} đã bán</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  {item.trend}
                </Badge>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Sales */}
      <Card className="p-4 border-0 shadow-sm bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Doanh số gần đây</h3>
        <div className="space-y-3">
          {salesData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50">
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.quantity} sản phẩm</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{item.revenue.toLocaleString('vi-VN')} ₫</p>
                <p className="text-sm text-green-600 font-medium">{item.trend}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}