import { useState } from 'react'
import { useNavigate } from 'react-router'
import { cn } from './ui/utils'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from './ui/dialog'
import { Input } from './ui/input'
import { PriceList } from './PriceList'
import { FileText, Eye, Plus, Calendar, User, DollarSign, Package, Percent, Star, Crown, Users, Send, AlertCircle, Clock, Search, MapPin, ShieldAlert, Tag, Briefcase, BadgeInfo, Filter, SlidersHorizontal, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { ColoredName } from './ColoredName'

export function SalesOrders() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter States
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterLocation, setFilterLocation] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const ordersData = {
    'pending': [
      {
        id: 'DH001',
        customer: 'Công ty TNHH Nội Thất Việt',
        customerType: 'wholesale',
        date: '2026-04-22',
        total: 45600000,
        originalTotal: 50160000,
        totalDiscount: 4560000,
        status: 'pending',
        priority: 'Cao',
        pickupLocation: 'Kho Ván 1',
        processingStatus: 'Đang xử lý',
        expectedFinishDate: '2026-04-30',
        salesAppointmentDate: '2026-04-25',
        restockDate: '2026-04-28',
        committedDeliveryDate: '2026-05-02',
        items: [
          { 
            name: 'Ván MDF DW MBR E2 2.5x1220x2440', 
            quantity: 100, 
            basePrice: 185000,
            unitPrice: 165000, 
            discount: 10,
            total: 16500000 
          },
          { 
            name: 'Keo dán cạnh PUR cao cấp', 
            quantity: 50, 
            basePrice: 250000,
            unitPrice: 220000, 
            discount: 12,
            total: 11000000 
          }
        ]
      },
      {
        id: 'DH002',
        customer: 'Mộc Phát JSC',
        customerType: 'vip',
        date: '2026-04-22',
        total: 23750000,
        originalTotal: 25000000,
        totalDiscount: 1250000,
        status: 'pending',
        priority: 'Trung bình',
        pickupLocation: 'Kho Ván 2',
        processingStatus: 'Mới',
        expectedFinishDate: '2026-05-05',
        salesAppointmentDate: '2026-04-26',
        restockDate: '2026-04-30',
        committedDeliveryDate: '2026-05-07',
        items: [
          { 
            name: 'ECO MDF E2 12x1220x2440 Melamine 2', 
            quantity: 80, 
            basePrice: 320000,
            unitPrice: 300000, 
            discount: 6,
            total: 24000000 
          }
        ]
      }
    ],
    'confirmed': [
      {
        id: 'DH003',
        customer: 'Gỗ Á Châu - Chi nhánh HN',
        customerType: 'standard',
        date: '2026-04-21',
        total: 12500000,
        originalTotal: 12500000,
        totalDiscount: 0,
        status: 'confirmed',
        priority: 'Thấp',
        pickupLocation: 'Kho Ván 3',
        processingStatus: 'Đang sản xuất',
        expectedFinishDate: '2026-04-28',
        salesAppointmentDate: '2026-04-22',
        restockDate: '2026-04-24',
        committedDeliveryDate: '2026-04-30',
        paymentAmount: 12500000,
        dueDate: '2026-05-01',
        isOverdue: false,
        items: [
          { 
            name: 'ECO Chống ẩm E2 12x1220x2440 Phủ Men 3', 
            quantity: 30, 
            basePrice: 450000,
            unitPrice: 450000, 
            discount: 0,
            total: 13500000 
          }
        ]
      }
    ],
    'completed': [
      {
        id: 'DH004',
        customer: 'Nội Thất Xinh',
        customerType: 'vip',
        date: '2026-04-20',
        total: 19950000,
        originalTotal: 21000000,
        totalDiscount: 1050000,
        status: 'completed',
        priority: 'Cao',
        pickupLocation: 'Kho Ván 1',
        processingStatus: 'Đã giao hàng',
        expectedFinishDate: '2026-04-25',
        salesAppointmentDate: '2026-04-20',
        restockDate: '2026-04-22',
        committedDeliveryDate: '2026-04-26',
        items: [
          { 
            name: 'ECO MDF E2 15x1220x2440 Melamine', 
            quantity: 50, 
            basePrice: 380000,
            unitPrice: 360000, 
            discount: 5,
            total: 18000000 
          }
        ]
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'confirmed': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ duyệt'
      case 'confirmed': return 'Đã xác nhận'
      case 'completed': return 'Hoàn thành'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Cao': return 'bg-red-100 text-red-700 border-red-200'
      case 'Trung bình': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Thấp': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const renderOrderDetailDialog = (order: any) => (
    <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          <span>Chi tiết đơn hàng {order.id}</span>
        </DialogTitle>
        <DialogDescription>
          {order.customer}
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-gray-500 flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" /> Mức độ ưu tiên
            </Label>
            <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-gray-500 flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> Trạng thái xử lý
            </Label>
            <p className="text-sm font-bold text-gray-900">{order.processingStatus}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Nơi lấy hàng
            </Label>
            <p className="text-sm font-medium text-gray-900">{order.pickupLocation}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-gray-500 flex items-center gap-1">
              <Tag className="h-3 w-3" /> Bảng giá
            </Label>
            <p className="text-sm font-bold text-gray-900">{getCustomerTypeInfo(order.customerType).label}</p>
          </div>
        </div>

        {/* Date Grid */}
        <Card className="p-4 bg-gray-50 border-0 space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Thông tin thời gian</h4>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-gray-500">Ngày dự kiến hoàn thành</Label>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calendar className="h-3 w-3 text-blue-500" />
                {new Date(order.expectedFinishDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-gray-500">Ngày sales hẹn</Label>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-3 w-3 text-green-500" />
                {new Date(order.salesAppointmentDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-gray-500">Ngày về hàng</Label>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-3 w-3 text-purple-500" />
                {new Date(order.restockDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-gray-500">Ngày cam kết giao</Label>
              <div className="flex items-center gap-2 text-sm font-bold text-green-700">
                <Send className="h-3 w-3 text-green-600" />
                {new Date(order.committedDeliveryDate).toLocaleDateString('vi-VN')}
              </div>
            </div>
          </div>
        </Card>

        {/* Product Items */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Danh sách sản phẩm</h4>
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div>
                <p className="text-sm font-bold text-gray-900">
                  <ColoredName name={item.name} />
                </p>
                <p className="text-xs text-gray-500">SL: {item.quantity} x {item.unitPrice.toLocaleString('vi-VN')}₫</p>
              </div>
              <p className="text-sm font-bold text-emerald-700">{item.total.toLocaleString('vi-VN')}₫</p>
            </div>
          ))}
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" className="w-full rounded-xl">Đóng</Button>
      </DialogFooter>
    </DialogContent>
  )

  const getCustomerTypeInfo = (type: string) => {
    switch (type) {
      case 'vip': 
        return { 
          label: 'VIP', 
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: Star,
          discountInfo: 'Chiết khấu 5%'
        }
      case 'wholesale': 
        return { 
          label: 'Sỉ', 
          color: 'bg-purple-100 text-purple-700 border-purple-200',
          icon: Crown,
          discountInfo: 'Chiết khấu 10%'
        }
      default: 
        return { 
          label: 'Thường', 
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: Users,
          discountInfo: 'Giá tiêu chuẩn'
        }
    }
  }

  const renderOrderCard = (order: any) => {
    const customerTypeInfo = getCustomerTypeInfo(order.customerType)
    const CustomerIcon = customerTypeInfo.icon
    
    return (
      <Card key={order.id} className="p-4 mb-3 border-0 shadow-sm bg-white">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-bold text-gray-900">#{order.id}</h4>
              <p className="text-sm text-gray-600 mt-1">{order.customer}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={`text-xs ${customerTypeInfo.color}`}>
                  <CustomerIcon className="h-3 w-3 mr-1" />
                  {customerTypeInfo.label}
                </Badge>
                <Badge className={`text-xs ${getPriorityColor(order.priority)}`}>
                  {order.priority}
                </Badge>
                {order.status === 'pending' && (
                  <Badge className="text-xs bg-purple-100 text-purple-700 border-purple-200 px-2 py-0.5 whitespace-nowrap">
                    Chờ duyệt giá
                  </Badge>
                )}
              </div>
            </div>
            <Badge className={`text-xs ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </Badge>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(order.date).toLocaleDateString('vi-VN')}</span>
          </div>

          {/* Price List */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Bảng giá:</span>
              <span className="text-sm text-blue-700 font-bold">{customerTypeInfo.label}</span>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-3">Chi tiết sản phẩm ({order.items.length}):</p>
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 mb-2 pb-2 border-b border-gray-200">
              <div className="col-span-4">Sản phẩm</div>
              <div className="col-span-2 text-center">SL</div>
              <div className="col-span-2 text-center">Giá gốc</div>
              <div className="col-span-2 text-center">Giảm giá</div>
              <div className="col-span-2 text-right">Thành tiền</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="grid grid-cols-12 gap-2 text-xs items-center py-2 bg-white rounded border border-gray-100">
                  <div className="col-span-4">
                    <span className="text-gray-900 font-medium">
                      <ColoredName name={item.name} />
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-gray-700">{item.quantity}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-gray-600">
                      {item.basePrice.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    {item.discount > 0 ? (
                      <Badge className="text-xs bg-red-100 text-red-700 border-red-200">
                        -{item.discount}%
                      </Badge>
                    ) : (
                      <span className="text-gray-400">--</span>
                    )}
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium text-gray-900">
                      {item.total.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-3">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-600">
                <span>Tổng tiền hàng:</span>
                <span>{order.originalTotal.toLocaleString('vi-VN')} ₫</span>
              </div>
              
              {order.totalDiscount > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <div className="flex items-center space-x-1">
                    <Percent className="h-3 w-3" />
                    <span>Tổng chiết khấu:</span>
                  </div>
                  <span>-{order.totalDiscount.toLocaleString('vi-VN')} ₭</span>
                </div>
              )}
              
              <div className="border-t border-emerald-200 pt-2 flex items-center justify-between font-bold text-emerald-900">
                <span>Thành tiền:</span>
                <span>{order.total.toLocaleString('vi-VN')} ₫</span>
              </div>
            </div>
          </div>

          {/* The Payment Status Info is now inside the dialog below */}
          <div className="flex space-x-2 pt-2">
            {order.status === 'pending' && (
              <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Gửi duyệt
              </Button>
            )}
            
            {order.status === 'confirmed' && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                      <DollarSign className="h-4 w-4 mr-2" />
                      TT Thanh toán
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                        <span>Thông tin thanh toán - {order.id}</span>
                      </DialogTitle>
                    </DialogHeader>
                    {order.paymentAmount !== undefined && (
                      <div className={`mt-4 border rounded-xl p-4 ${
                        order.isOverdue 
                          ? 'bg-red-50 border-red-200/50' 
                          : 'bg-green-50 border-green-200/50'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-base font-semibold ${order.isOverdue ? 'text-red-900' : 'text-green-900'}`}>
                            Trạng thái
                          </span>
                          <Badge className={
                            order.isOverdue 
                              ? 'bg-red-100 text-red-700 border-red-200 px-3 py-1 text-sm' 
                              : 'bg-green-100 text-green-700 border-green-200 px-3 py-1 text-sm'
                          }>
                            {order.isOverdue ? 'Quá hạn' : 'Đúng hạn'}
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={order.isOverdue ? 'text-red-700' : 'text-green-700'}>
                              Tổng tiền cần thanh toán:
                            </span>
                            <span className={`text-lg font-bold ${order.isOverdue ? 'text-red-700' : 'text-green-700'}`}>
                              {order.paymentAmount.toLocaleString('vi-VN')} ₫
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-white/40">
                            <span className={order.isOverdue ? 'text-red-700' : 'text-green-700'}>
                              Ngày đến hạn:
                            </span>
                            <span className={`flex items-center text-base ${order.isOverdue ? 'text-red-700 font-bold' : 'text-green-700 font-medium'}`}>
                              {order.isOverdue ? <AlertCircle className="h-4 w-4 mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
                              {new Date(order.dueDate).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Hoàn thành
                </Button>
              </>
            )}

            {order.status === 'completed' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="flex-1 border-green-200 text-green-700 hover:bg-green-50">
                    <Eye className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Button>
                </DialogTrigger>
                {renderOrderDetailDialog(order)}
              </Dialog>
            )}
            
            {order.status !== 'completed' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50">
                    <BadgeInfo className="h-4 w-4 mr-2" />
                    Chi tiết
                  </Button>
                </DialogTrigger>
                {renderOrderDetailDialog(order)}
              </Dialog>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn bán hàng</h1>
        </div>
        <Button
          onClick={() => navigate('/sales/create')}
          className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo đơn mới
        </Button>
      </div>

      <div className="mt-4">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm mã đơn, khách hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200 bg-white rounded-xl shadow-sm"
            />
          </div>
          <Button 
            variant={showFilters ? "secondary" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "rounded-xl border-gray-200",
              showFilters && "bg-emerald-50 border-emerald-200 text-emerald-700"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <Card className="p-4 mb-4 border-emerald-100 bg-emerald-50/30 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Filter className="h-4 w-4 text-emerald-600" />
                Bộ lọc nâng cao
              </h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setFilterPriority('all')
                  setFilterLocation('all')
                  setFilterStatus('all')
                  setFilterDateFrom('')
                  setFilterDateTo('')
                }}
                className="h-8 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/50"
              >
                Xóa bộ lọc
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Mức độ ưu tiên</Label>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="h-9 text-xs bg-white border-gray-200 rounded-lg">
                    <SelectValue placeholder="Tất cả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Cao">Cao</SelectItem>
                    <SelectItem value="Trung bình">Trung bình</SelectItem>
                    <SelectItem value="Thấp">Thấp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Nơi lấy hàng</Label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="h-9 text-xs bg-white border-gray-200 rounded-lg">
                    <SelectValue placeholder="Tất cả kho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả kho</SelectItem>
                    <SelectItem value="Kho Thành Phố">Kho Thành Phố</SelectItem>
                    <SelectItem value="Kho Bình Dương">Kho Bình Dương</SelectItem>
                    <SelectItem value="Kho Đồng Nai">Kho Đồng Nai</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Từ ngày</Label>
                <Input 
                  type="date" 
                  value={filterDateFrom}
                  onChange={(e) => setFilterDateFrom(e.target.value)}
                  className="h-9 text-xs bg-white border-gray-200 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Đến ngày</Label>
                <Input 
                  type="date" 
                  value={filterDateTo}
                  onChange={(e) => setFilterDateTo(e.target.value)}
                  className="h-9 text-xs bg-white border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="pending" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Package className="h-4 w-4" />
              <span className="text-xs">Chờ xử lý</span>
              <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
                {ordersData.pending.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Eye className="h-4 w-4" />
              <span className="text-xs">Đã xác nhận</span>
              <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
                {ordersData.confirmed.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
              <Package className="h-4 w-4" />
              <span className="text-xs">Hoàn thành</span>
              <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
                {ordersData.completed.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <div className="space-y-3">
              {ordersData.pending
                .filter(o => {
                  const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  const matchesPriority = filterPriority === 'all' || o.priority === filterPriority
                  const matchesLocation = filterLocation === 'all' || o.pickupLocation === filterLocation
                  return matchesSearch && matchesPriority && matchesLocation
                })
                .map(renderOrderCard)}
            </div>
          </TabsContent>

          <TabsContent value="confirmed" className="mt-4">
            <div className="space-y-3">
              {ordersData.confirmed
                .filter(o => {
                  const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  const matchesPriority = filterPriority === 'all' || o.priority === filterPriority
                  const matchesLocation = filterLocation === 'all' || o.pickupLocation === filterLocation
                  return matchesSearch && matchesPriority && matchesLocation
                })
                .map(renderOrderCard)}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <div className="space-y-3">
              {ordersData.completed
                .filter(o => {
                  const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.customer.toLowerCase().includes(searchTerm.toLowerCase())
                  const matchesPriority = filterPriority === 'all' || o.priority === filterPriority
                  const matchesLocation = filterLocation === 'all' || o.pickupLocation === filterLocation
                  return matchesSearch && matchesPriority && matchesLocation
                })
                .map(renderOrderCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}