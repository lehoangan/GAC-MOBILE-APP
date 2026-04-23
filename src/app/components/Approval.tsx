import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs'
import { ApprovalCard, ApprovalRequest } from './ApprovalCard'
import { ClipboardCheck } from 'lucide-react'

export function Approval() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('mine')

  // Mock data
  const allRequests: ApprovalRequest[] = [
    {
      id: '1',
      code: 'SO123',
      type: 'Đơn hàng giá đặc biệt',
      amount: 45600000,
      reason: 'Đơn hàng sỉ cho khách lớn, cần hỗ trợ giá đặc biệt.',
      status: 'pending',
      currentStep: 'Cấp 2 - Kế toán',
      timestamp: '2 giờ trước',
      customer: 'Công ty TNHH Nội Thất Việt',
      standardPrice: 50160000,
      proposedPrice: 45600000
    },
    {
      id: '2',
      code: 'PO456',
      type: 'Đơn mua hàng',
      amount: 85000000,
      reason: 'Mua nguyên liệu gỗ sồi nhập khẩu cho dự án Q1',
      status: 'pending',
      currentStep: 'Cấp 1 - Trưởng phòng',
      timestamp: '5 giờ trước'
    },
    {
      id: '3',
      code: 'MO789',
      type: 'Lệnh sản xuất',
      amount: 0,
      reason: 'Sản xuất gấp cho đơn hàng SO123',
      status: 'approved',
      currentStep: 'Hoàn thành',
      timestamp: '1 ngày trước'
    },
    {
      id: '4',
      code: 'PR101',
      type: 'Yêu cầu thanh toán',
      amount: 45000000,
      reason: 'Thanh toán cho nhà cung cấp vật liệu',
      status: 'rejected',
      currentStep: 'Cấp 3 - Giám đốc',
      timestamp: '2 ngày trước'
    },
    {
      id: '5',
      code: 'SO124',
      type: 'Đơn hàng bán',
      amount: 95000000,
      reason: 'Đơn hàng ghế sofa cao cấp cho khách sạn',
      status: 'approved',
      currentStep: 'Hoàn thành',
      timestamp: '3 ngày trước'
    },
  ]

  const myApprovalRequests = allRequests.filter(r => r.status === 'pending' && 
    (r.currentStep.includes('Kế toán') || r.currentStep.includes('Trưởng phòng')))
  
  const myRequests = allRequests.filter(r => 
    r.code === 'SO123' || r.code === 'MO789')

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-emerald-100 shadow-sm sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-sm">
            <ClipboardCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Phê duyệt</h1>
            <p className="text-sm text-gray-500">Quản lý yêu cầu phê duyệt</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white border border-gray-200 p-1 h-auto">
            <TabsTrigger 
              value="mine" 
              className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg py-2.5"
            >
              Chờ tôi duyệt
              {myApprovalRequests.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {myApprovalRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="my-requests" 
              className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg py-2.5"
            >
              Yêu cầu của tôi
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="flex-1 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg py-2.5"
            >
              Tất cả
            </TabsTrigger>
          </TabsList>

          {/* Chờ tôi duyệt */}
          <TabsContent value="mine" className="mt-4 space-y-3">
            {myApprovalRequests.length > 0 ? (
              myApprovalRequests.map(request => (
                <ApprovalCard 
                  key={request.id} 
                  request={request} 
                  onClick={() => navigate(`/approval/${request.id}`, { state: { request } })}
                />
              ))
            ) : (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                <p className="text-gray-500">Không có yêu cầu nào chờ duyệt</p>
              </div>
            )}
          </TabsContent>

          {/* Yêu cầu của tôi */}
          <TabsContent value="my-requests" className="mt-4 space-y-3">
            {myRequests.map(request => (
              <ApprovalCard 
                key={request.id} 
                request={request} 
                onClick={() => navigate(`/approval/${request.id}`, { state: { request } })}
              />
            ))}
          </TabsContent>

          {/* Tất cả */}
          <TabsContent value="all" className="mt-4 space-y-3">
            {allRequests.map(request => (
              <ApprovalCard 
                key={request.id} 
                request={request} 
                onClick={() => navigate(`/approval/${request.id}`, { state: { request } })}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
