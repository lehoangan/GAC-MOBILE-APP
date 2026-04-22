import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Bell, CheckCircle2, XCircle, Clock, ArrowLeft, Volume2, VolumeX } from 'lucide-react'

export interface Notification {
  id: string
  code: string
  type: 'approval_needed' | 'approved' | 'rejected'
  message: string
  timestamp: string
  read: boolean
}

export function Notifications() {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  // Mock notifications
  const notifications: Notification[] = [
    {
      id: '1',
      code: 'SO123',
      type: 'approval_needed',
      message: 'SO123 cần bạn phê duyệt',
      timestamp: '2 giờ trước',
      read: false
    },
    {
      id: '1a',
      code: 'DH999',
      type: 'approved',
      message: 'Thông báo duyệt đơn: Đơn hàng DH999 đã được phê duyệt thành công.',
      timestamp: '10 phút trước',
      read: false
    },
    {
      id: '2',
      code: 'MO789',
      type: 'approved',
      message: 'MO789 đã được duyệt',
      timestamp: '1 ngày trước',
      read: false
    },
    {
      id: '3',
      code: 'PR101',
      type: 'rejected',
      message: 'PR101 đã bị từ chối',
      timestamp: '2 ngày trước',
      read: true
    },
    {
      id: '4',
      code: 'SO124',
      type: 'approved',
      message: 'SO124 đã được phê duyệt hoàn tất',
      timestamp: '3 ngày trước',
      read: true
    },
    {
      id: '5',
      code: 'PO456',
      type: 'approval_needed',
      message: 'PO456 cần bạn phê duyệt',
      timestamp: '5 giờ trước',
      read: false
    },
  ]

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval_needed':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getNotificationBg = (type: Notification['type']) => {
    switch (type) {
      case 'approval_needed':
        return 'bg-yellow-50 border-yellow-200'
      case 'approved':
        return 'bg-green-50 border-green-200'
      case 'rejected':
        return 'bg-red-50 border-red-200'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 pt-6 pb-4 border-b border-amber-100">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-amber-900 mb-4 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quay lại</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-amber-900">Thông báo</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                  {unreadCount}
                </span>
              )}
            </div>
            <p className="text-sm text-amber-700/70">Cập nhật về phê duyệt</p>
          </div>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-white rounded-full shadow-sm border border-amber-200 text-amber-700 hover:bg-amber-50 mr-2"
          >
            {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5 opacity-50" />}
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="px-4 pt-4 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => navigate('/approval')}
            className={`rounded-xl p-4 border shadow-sm cursor-pointer transition-all hover:shadow-md active:scale-[0.98] ${
              notification.read 
                ? 'bg-white border-gray-100' 
                : `${getNotificationBg(notification.type)} border-2`
            }`}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm mb-1 ${
                  notification.read ? 'text-gray-700' : 'text-gray-900 font-medium'
                }`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500">
                  {notification.timestamp}
                </p>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0">
                  <div className="w-2.5 h-2.5 bg-amber-600 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Chưa có thông báo nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
