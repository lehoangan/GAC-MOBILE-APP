import { useLocation, useNavigate } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Users, Mail, Phone, MapPin, DollarSign, Calendar, FileText } from 'lucide-react'

export function CustomerDebtDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Try to get customer from navigation state, otherwise we might show an error or fallback
  const customer = (location.state as { customer?: any })?.customer

  if (!customer) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 mb-4">Không tìm thấy thông tin công nợ</p>
        <button onClick={() => navigate('/customers')} className="text-amber-600 font-medium">
          Quay lại danh sách
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 px-4 pt-4 pb-6 border-b border-red-100 sticky top-0 z-10">
        <button
          onClick={() => navigate('/customers')}
          className="flex items-center gap-2 text-red-900 mb-4 hover:text-red-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quay lại</span>
        </button>
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-red-900 mb-1">
              Chi tiết công nợ
            </h1>
            <p className="text-sm text-red-700/70">{customer.name}</p>
          </div>
        </div>
        
        {customer.totalDebt !== undefined && (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-red-200/50 flex flex-col">
            <p className="text-xs font-semibold text-red-800 mb-1">Tổng công nợ hiện tại</p>
            <p className="text-2xl font-bold text-red-700">
              {customer.totalDebt.toLocaleString('vi-VN')} ₫
            </p>
          </div>
        )}
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Thông tin khách hàng */}
        <Card className="p-4 border-0 shadow-sm bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Thông tin liên hệ</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
              <span className="leading-tight">{customer.address}</span>
            </div>
          </div>
        </Card>

        {/* Danh sách đơn nợ */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-red-600" />
              <h2 className="font-semibold text-gray-900">Danh sách đơn nợ</h2>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {customer.debtOrders?.length || 0} đơn
            </Badge>
          </div>

          {customer.debtOrders && customer.debtOrders.length > 0 ? (
            <div className="space-y-3">
              {customer.debtOrders.map((order: any, idx: number) => (
                <div key={idx} className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">#{order.id}</span>
                    <Badge 
                      className={`text-[10px] px-2 py-0.5 font-medium ${
                        order.status === 'Quá hạn' 
                          ? 'bg-red-100 text-red-700 border-red-200' 
                          : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      }`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-2 mt-1">
                    <span className="text-xs text-gray-500">Số tiền nợ</span>
                    <span className="font-bold text-red-600 text-sm">
                      {order.debt.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              Khách hàng không có đơn nợ nào.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
