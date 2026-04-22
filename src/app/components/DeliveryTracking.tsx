import { useState, useMemo } from 'react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, CheckCircle, Truck, Camera, Image as ImageIcon, MapPin, Package, FileText, Calendar as CalendarIcon, Filter, Phone } from 'lucide-react'

export function DeliveryTracking() {
  const [viewMode, setViewMode] = useState<'order' | 'batch' | 'return'>('order')
  const [searchQuery, setSearchQuery] = useState('')
  const [dateFilter, setDateFilter] = useState('all')

  const todayStr = new Date().toISOString().split('T')[0]

  // Dữ liệu mô phỏng
  const [orders, setOrders] = useState([
    {
      id: 'DO-001',
      customerName: 'Gỗ Á Châu',
      customerPhone: '0901234567',
      soNumber: 'SO-1001',
      warehouse: 'Kho Ván Thành Phẩm 1',
      vehicleNumber: '51A-123.45',
      assignee: 'Tài xế Hùng',
      status: 'assign',
      imageUrl: '',
      expectedDate: todayStr,
      completedDate: '',
      details: [
        { product: 'Ván MDF DW MBR E2 2.5x1220x2440', batch: 'LOT-MDF-01', location: 'Rack-A1', quantity: 200 },
        { product: 'ECO MDF E2 12x1220x2440 Melamine 2', batch: 'LOT-ECO-02', location: 'Rack-B2', quantity: 150 }
      ]
    },
    {
      id: 'DO-002',
      customerName: 'Mộc Phát',
      customerPhone: '0912345678',
      soNumber: 'SO-1002',
      warehouse: 'Kho Ván Thành Phẩm 2',
      vehicleNumber: '51C-987.65',
      assignee: 'Tài xế Tuấn',
      status: 'shipping',
      imageUrl: '',
      expectedDate: todayStr,
      completedDate: '',
      details: [
        { product: 'ECO Chống ẩm E2 15x1220x2440 Phủ Men 3', batch: 'LOT-HMR-05', location: 'Rack-C5', quantity: 100 }
      ]
    }
  ])

  const [batches, setBatches] = useState([
    {
      id: 'BATCH-DEL-001',
      warehouse: 'Kho Tổng Gỗ Á Châu',
      vehicleNumber: '51D-555.55',
      assignee: 'Tài xế Minh',
      status: 'assign',
      imageUrl: '',
      expectedDate: todayStr,
      completedDate: '',
      details: [
        { doNumber: 'DO-003', customerName: 'Nội Thất Việt', customerPhone: '0933333333', soNumber: 'SO-1003', product: 'Ván MDF DW MBR E2 4.75x1220x2440', batch: 'LOT-MDF-03', location: 'Rack-A3', quantity: 300 },
        { doNumber: 'DO-004', customerName: 'An Cường', customerPhone: '0944444444', soNumber: 'SO-1004', product: 'ECO MDF E2 12x1220x2440 Phủ Giấy', batch: 'LOT-ECO-04', location: 'Rack-B4', quantity: 250 }
      ]
    }
  ])

  const [returns, setReturns] = useState([
    {
      id: 'RET-001',
      customerName: 'Gỗ Đức Thành',
      customerPhone: '0923456789',
      soNumber: 'SO-3001',
      warehouse: 'Kho Chờ xử lý QC',
      reason: 'Bề mặt Melamine bị trầy xước nặng',
      assignee: 'Đội kho nhập',
      status: 'assign',
      expectedDate: todayStr,
      completedDate: '',
      details: [
        { product: 'ECO MDF E2 15x1220x2440 Melamine', batch: 'LOT-FAIL-01', location: 'Rack-99', quantity: 5 }
      ]
    }
  ])

  const handleMakeOmiCall = (phone: string) => {
    // Tích hợp OMICall SDK giả lập
    if ((window as any).OmiCall) {
      (window as any).OmiCall.makeCall(phone);
    } else {
      alert(`[OMICall SDK] Đang gọi điện bảo mật đến máy khách hàng...`);
    }
  }

  const handleStart = (id: string, isOrder: boolean) => {
    if(isOrder) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'shipping' } : o))
    } else {
      setBatches(prev => prev.map(b => b.id === id ? { ...b, status: 'shipping' } : b))
    }
  }

  const updateVehicleNumber = (id: string, isOrder: boolean, newVal: string) => {
    if(isOrder) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, vehicleNumber: newVal } : o))
    } else {
      setBatches(prev => prev.map(b => b.id === id ? { ...b, vehicleNumber: newVal } : b))
    }
  }

  const handleUploadImage = (id: string, isOrder: boolean) => {
    // Fake picture taking
    alert(`Đã mở Camera để chụp chứng từ cho đơn/batch ${id}`);
    if(isOrder) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, imageUrl: 'https://via.placeholder.com/150' } : o))
    } else {
      setBatches(prev => prev.map(b => b.id === id ? { ...b, imageUrl: 'https://via.placeholder.com/150' } : b))
    }
  }

  const handleComplete = (id: string, isOrder: boolean) => {
    const item = (isOrder ? orders : batches).find((x: any) => x.id === id);
    if (!item?.imageUrl) {
      alert("Vui lòng chụp và tải lên chứng từ giao hàng trước khi hoàn tất!");
      return;
    }
    const compDate = new Date().toISOString().split('T')[0];
    if(isOrder) {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'done', completedDate: compDate } : o))
    } else {
      setBatches(prev => prev.map(b => b.id === id ? { ...b, status: 'done', completedDate: compDate } : b))
    }
  }

  const handleApproveReturn = (id: string, role: 'admin' | 'acc') => {
    setReturns(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (role === 'admin') return { ...r, status: 'admin_approved' };
      if (role === 'acc') {
        const compDate = new Date().toISOString().split('T')[0];
        return { ...r, status: 'done', completedDate: compDate };
      }
      return r;
    }))
  }

  const isDateInRange = (dateStr: string, filter: string) => {
    if (filter === 'all' || !dateStr) return true;
    const today = new Date();
    today.setHours(0,0,0,0);
    const targetDate = new Date(dateStr);
    targetDate.setHours(0,0,0,0);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    
    if (filter === 'today') return diffDays === 0;
    if (filter === 'yesterday') return diffDays === -1;
    if (filter === 'this_week') return diffDays >= -7 && diffDays <= 7;
    return true;
  }

  // Search logic
  const filteredData = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    const filterFn = (item: any) => {
      const targetDate = item.completedDate || item.expectedDate;
      const dateMatch = isDateInRange(targetDate, dateFilter);
      if (!dateMatch) return false;
      return true;
    }

    if (viewMode === 'order') {
      return orders.filter(o => 
        filterFn(o) && (
          o.id.toLowerCase().includes(lowerQuery) ||
          o.customerName.toLowerCase().includes(lowerQuery) ||
          o.soNumber.toLowerCase().includes(lowerQuery) ||
          o.warehouse.toLowerCase().includes(lowerQuery) ||
          o.vehicleNumber.toLowerCase().includes(lowerQuery) ||
          o.assignee.toLowerCase().includes(lowerQuery)
        )
      )
    } else if (viewMode === 'batch') {
      return batches.filter(b => 
        filterFn(b) && (
          b.id.toLowerCase().includes(lowerQuery) ||
          b.warehouse.toLowerCase().includes(lowerQuery) ||
          b.vehicleNumber.toLowerCase().includes(lowerQuery) ||
          b.assignee.toLowerCase().includes(lowerQuery) ||
          b.details.some((d: any) => 
            d.doNumber.toLowerCase().includes(lowerQuery) ||
            d.customerName.toLowerCase().includes(lowerQuery) ||
            d.soNumber.toLowerCase().includes(lowerQuery)
          )
        )
      )
    } else if (viewMode === 'return') {
      return returns.filter(r => 
        filterFn(r) && (
          r.id.toLowerCase().includes(lowerQuery) ||
          r.customerName.toLowerCase().includes(lowerQuery) ||
          r.soNumber.toLowerCase().includes(lowerQuery) ||
          r.warehouse.toLowerCase().includes(lowerQuery) ||
          r.assignee.toLowerCase().includes(lowerQuery) ||
          r.reason.toLowerCase().includes(lowerQuery)
        )
      )
    }
    return [];
  }, [searchQuery, dateFilter, viewMode, orders, batches, returns])

  const renderStatus = (status: string, mode: string) => {
    if (mode === 'return') {
      if (status === 'assign') return <Badge className="bg-yellow-100 text-yellow-800">Chờ Admin duyệt</Badge>
      if (status === 'admin_approved') return <Badge className="bg-blue-100 text-blue-800">Chờ KT duyệt</Badge>
      if (status === 'done') return <Badge className="bg-green-100 text-green-800">Hoàn tất thủ tục</Badge>
    } else {
      if (status === 'assign') return <Badge className="bg-yellow-100 text-yellow-800">Chờ giao (Assigned)</Badge>
      if (status === 'shipping') return <Badge className="bg-blue-100 text-blue-800">Đang giao</Badge>
      if (status === 'done') return <Badge className="bg-green-100 text-green-800">Hoàn tất</Badge>
    }
    return null;
  }

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Giao hàng (Dành cho NV/Tài xế)</h1>
        <p className="text-sm text-gray-500">Quản lý lộ trình và xác thực giao nhận</p>
      </div>

      <div className="flex bg-white rounded-lg p-1 border border-gray-200 mb-4 shadow-sm">
        <button 
          onClick={() => setViewMode('order')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'order' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Giao theo Đơn
        </button>
        <button 
           onClick={() => setViewMode('batch')}
           className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'batch' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Giao theo Batch
        </button>
        <button 
           onClick={() => setViewMode('return')}
           className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${viewMode === 'return' ? 'bg-amber-100 text-amber-800 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
        >
          Trả hàng
        </button>
      </div>

      <div className="flex bg-white rounded-lg p-3 shadow-sm border border-gray-100 mb-5 flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[140px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm mã phiếu, SĐT, biển số..."
            className="pl-9 bg-gray-50 border-gray-200 text-sm h-10 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex-1 min-w-[140px] flex items-center gap-2 bg-gray-50 px-3 h-10 rounded-md border border-gray-200 focus-within:border-amber-400">
          <Filter className="h-4 w-4 text-gray-400" />
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 w-full appearance-none"
          >
            <option value="all">Tất cả ngày</option>
            <option value="today">Hôm nay</option>
            <option value="yesterday">Hôm qua</option>
            <option value="this_week">Tuần này</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredData.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">Không tìm thấy dữ liệu giao hàng!</div>
        )}
        
        {filteredData.map((item: any) => (
          <Card key={item.id} className="overflow-hidden shadow-sm border-gray-200">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{item.id}</h3>
                  {(viewMode === 'order' || viewMode === 'return') && (
                    <div className="flex items-center text-sm text-amber-600 font-medium">
                      <span>{item.customerName} • {item.soNumber}</span>
                      <button 
                        onClick={() => handleMakeOmiCall(item.customerPhone)}
                        className="ml-2 p-1.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors shadow-sm"
                        title="Gọi khách hàng (OMICall)"
                      >
                        <Phone className="h-3.5 w-3.5 fill-current" />
                      </button>
                    </div>
                  )}
                </div>
                {renderStatus(item.status, viewMode)}
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3 text-xs">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> {item.warehouse}
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText className="h-3.5 w-3.5 mr-1.5 text-gray-400" /> Phụ trách: {item.assignee}
                </div>
                {viewMode === 'return' ? (
                  <div className="flex items-start text-red-600 col-span-2">
                    <FileText className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-red-400 flex-shrink-0" /> 
                    <span className="font-medium whitespace-pre-wrap">Lý do: {item.reason}</span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-600 col-span-2">
                    <Truck className="h-3.5 w-3.5 mr-1.5 text-gray-400 flex-shrink-0" /> 
                    <span className="whitespace-nowrap">Biển số:</span>
                    <input 
                      className="ml-1.5 px-1 py-0.5 w-24 bg-transparent border-b border-dashed border-gray-300 focus:border-amber-500 focus:bg-amber-50 focus:outline-none text-gray-800 font-medium transition-colors"
                      value={item.vehicleNumber}
                      onChange={(e) => updateVehicleNumber(item.id, viewMode === 'order', e.target.value)}
                      placeholder="Nhập BSX..."
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-xs px-3 py-2 bg-slate-50 border border-slate-100 rounded-md mb-4">
                <div className="flex flex-col">
                  <span className="text-gray-500 mb-0.5 flex items-center"><CalendarIcon className="h-3 w-3 mr-1"/> Dự kiến</span>
                  <span className="font-semibold text-gray-700">{item.expectedDate ? new Date(item.expectedDate).toLocaleDateString('vi-VN') : '---'}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-gray-500 mb-0.5 flex items-center justify-end"><CheckCircle className="h-3 w-3 mr-1"/> Hoàn tất</span>
                  <span className={`font-semibold ${item.completedDate ? 'text-green-600' : 'text-gray-400'}`}>
                    {item.completedDate ? new Date(item.completedDate).toLocaleDateString('vi-VN') : 'Đang xử lý'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center">
                  <Package className="h-3.5 w-3.5 mr-1 text-amber-500" /> 
                  Chi tiết hàng hoá ({item.details.length})
                </p>
                {item.details.map((detail: any, idx: number) => (
                  <div key={idx} className="bg-white p-2 border border-gray-200 rounded text-[11px] leading-relaxed">
                    {viewMode === 'batch' && (
                      <div className="flex items-center justify-between border-b border-gray-100 pb-1 mb-1">
                        <p className="font-medium text-amber-700">
                          {detail.doNumber} • {detail.customerName} ({detail.soNumber})
                        </p>
                        <button 
                          onClick={() => handleMakeOmiCall(detail.customerPhone)}
                          className="ml-2 p-1.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors shadow-sm shrink-0"
                          title="Gọi khách hàng (OMICall)"
                        >
                          <Phone className="h-3 w-3 fill-current" />
                        </button>
                      </div>
                    )}
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">{detail.product}</p>
                        <p className="text-gray-500">Lô: {detail.batch} | Tại: {detail.location}</p>
                      </div>
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 ml-2">
                        SL: {detail.quantity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {item.status === 'shipping' && (
                <div className="mb-4 flex flex-col gap-2">
                  <Button 
                    variant={item.imageUrl ? "outline" : "default"} 
                    className={item.imageUrl ? "border-green-200 text-green-700 w-full" : "w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"}
                    onClick={() => handleUploadImage(item.id, viewMode === 'order')}
                    size="sm"
                  >
                    {item.imageUrl ? <CheckCircle className="h-4 w-4 mr-2" /> : <Camera className="h-4 w-4 mr-2" />}
                    {item.imageUrl ? "Đã đính kèm chứng từ" : "Chụp hình chứng từ giao hàng"}
                  </Button>
                </div>
              )}

              <div className="pt-3 border-t border-gray-100 mt-2">
                {viewMode !== 'return' && item.status === 'assign' && (
                  <Button 
                    onClick={() => handleStart(item.id, viewMode === 'order')}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Bắt đầu giao hàng
                  </Button>
                )}
                {viewMode !== 'return' && item.status === 'shipping' && (
                  <Button 
                    onClick={() => handleComplete(item.id, viewMode === 'order')}
                    className="w-full bg-green-500 hover:bg-green-600 text-white shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Hoàn tất giao hàng
                  </Button>
                )}
                
                {/* Return Buttons */}
                {viewMode === 'return' && item.status === 'assign' && (
                  <Button 
                    onClick={() => handleApproveReturn(item.id, 'admin')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    [Admin] Duyệt trả hàng
                  </Button>
                )}
                {viewMode === 'return' && item.status === 'admin_approved' && (
                  <Button 
                    onClick={() => handleApproveReturn(item.id, 'acc')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    [Kế toán] Xác nhận & Nhập kho
                  </Button>
                )}

                {item.status === 'done' && (
                  <div className="text-center text-sm font-medium text-green-600 py-1">
                    <CheckCircle className="h-4 w-4 inline mr-1 mb-0.5" />
                    {viewMode === 'return' ? 'Hoàn tất thủ tục trả hàng' : 'Đơn hàng đã giao thành công'}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}