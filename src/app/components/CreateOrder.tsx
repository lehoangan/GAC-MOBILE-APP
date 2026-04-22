import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { PriceList } from './PriceList'
import { ShoppingCart, User, Calculator, FileText, Minus, Plus, Trash2, ArrowLeft, Search, X, QrCode, Percent, Calendar as CalendarIcon, MapPin, ShieldAlert, BadgeInfo, Tag, Briefcase } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { format } from 'date-fns'
import { Calendar } from './ui/calendar'
import { cn } from './ui/utils'

export function CreateOrder() {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [customerInfo, setCustomerInfo] = useState<any>(null)
  const [customerSearchTerm, setCustomerSearchTerm] = useState('')
  const [productSearchTerm, setProductSearchTerm] = useState('')
  
  // Configuration Dialog State
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [configProduct, setConfigProduct] = useState<any>(null)
  const [configQty, setConfigQty] = useState(1)
  const [configDiscount, setConfigDiscount] = useState(0)
  const [configVan, setConfigVan] = useState(false)
  const [configGiay, setConfigGiay] = useState(false)

  // New Fields State
  const [priority, setPriority] = useState('Trung bình')
  const [pickupLocation, setPickupLocation] = useState('')
  const [customPriceList, setCustomPriceList] = useState('')
  const [orderStatus, setOrderStatus] = useState('Mới')
  const [expectedFinishDate, setExpectedFinishDate] = useState<Date>()
  const [salesAppointmentDate, setSalesAppointmentDate] = useState<Date>()
  const [restockDate, setRestockDate] = useState<Date>()
  const [committedDeliveryDate, setCommittedDeliveryDate] = useState<Date>()

  const customers = [
    { 
      id: '1', 
      name: 'Công ty TNHH Nội Thất Việt', 
      type: 'wholesale',
      discount: 10,
      email: 'contact@noithatviet.com',
      phone: '0909123456' 
    },
    { 
      id: '2', 
      name: 'Khách sạn Luxury Hotel', 
      type: 'vip',
      discount: 5,
      email: 'purchasing@luxuryhotel.com',
      phone: '0908234567' 
    },
    { 
      id: '3', 
      name: 'Nguyễn Văn A', 
      type: 'standard',
      discount: 0,
      email: 'nguyenvana@gmail.com',
      phone: '0907345678' 
    },
    { 
      id: '4', 
      name: 'Văn phòng ABC Corp', 
      type: 'vip',
      discount: 5,
      email: 'admin@abccorp.vn',
      phone: '0906456789' 
    },
    { 
      id: '5', 
      name: 'Trần Thị B', 
      type: 'standard',
      discount: 0,
      email: 'tranthib@yahoo.com',
      phone: '0905567890' 
    }
  ]

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm)
  )

  const handleCustomerSelect = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    setSelectedCustomer(customerId)
    setCustomerInfo(customer)
    setCustomerSearchTerm('')
  }

  const handleAddProduct = (product: any) => {
    const customerType = customerInfo?.type || 'standard'
    const productPrice = product.prices[customerType]
    
    setConfigProduct(product)
    setConfigQty(1)
    setConfigDiscount(productPrice.discount || 0)
    setConfigVan(false)
    setConfigGiay(false)
    setIsConfigOpen(true)
  }

  const confirmAddProduct = () => {
    if (!configProduct) return

    const customerType = customerInfo?.type || 'standard'
    const productPrice = configProduct.prices[customerType]
    
    const existingItem = orderItems.find(item => item.id === configProduct.id)
    
    if (existingItem) {
      setOrderItems(orderItems.map(item => 
        item.id === configProduct.id 
          ? { 
              ...item, 
              quantity: item.quantity + configQty,
              discount: configDiscount,
              mangVan: configVan,
              mangGiay: configGiay,
              total: calculateItemTotal({ ...item, quantity: item.quantity + configQty, discount: configDiscount }) 
            }
          : item
      ))
    } else {
      const newItem = {
        ...configProduct,
        quantity: configQty,
        unitPrice: productPrice.price,
        discount: configDiscount,
        phuThu: configProduct.phuThu || 0,
        tax: configProduct.tax || 0,
        mangVan: configVan,
        mangGiay: configGiay,
      }
      newItem.total = calculateItemTotal(newItem)
      setOrderItems([...orderItems, newItem])
    }
    
    setIsConfigOpen(false)
    toast.success(`Đã thêm ${configProduct.name} vào giỏ hàng`)
  }

  const calculateItemTotal = (item: any) => {
    const baseAmount = (item.unitPrice * (1 - (item.discount || 0) / 100) + (item.phuThu || 0)) * item.quantity
    return baseAmount
  }

  const updateItemField = (id: number, field: string, value: any) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value }
        newItem.total = calculateItemTotal(newItem)
        return newItem
      }
      return item
    }))
  }

  const calculateTotalTax = () => {
    return orderItems.reduce((sum, item) => {
      const amountBeforeTax = calculateItemTotal(item)
      const itemTax = amountBeforeTax * (item.tax / 100)
      return sum + itemTax
    }, 0)
  }

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTotalTax()
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setOrderItems(orderItems.filter(item => item.id !== id))
    } else {
      updateItemField(id, 'quantity', newQuantity)
    }
  }

  const removeItem = (id: number) => {
    setOrderItems(orderItems.filter(item => item.id !== id))
  }

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTotalDiscount = () => {
    return orderItems.reduce((sum, item) => {
      const originalPrice = item.basePrice * item.quantity
      return sum + (originalPrice - item.total)
    }, 0)
  }

  const clearCustomerSearch = () => {
    setCustomerSearchTerm('')
  }

  const clearProductSearch = () => {
    setProductSearchTerm('')
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/sales')}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo đơn hàng mới</h1>
          </div>
        </div>
      </div>

      <Tabs defaultValue="customer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl mb-6">
          <TabsTrigger value="customer" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <User className="h-4 w-4" />
            <span>Khách hàng</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <FileText className="h-4 w-4" />
            <span>Sản phẩm</span>
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Calculator className="h-4 w-4" />
            <span>Tổng kết</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="space-y-4">
          <Card className="p-4 border-0 shadow-sm bg-white">
            <h3 className="font-bold text-gray-900 mb-4">Thông tin khách hàng</h3>
            <div className="space-y-4">
              {/* Customer Search */}
              <div>
                <Label htmlFor="customer-search">Tìm kiếm khách hàng</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="customer-search"
                    placeholder="Tìm theo tên, email hoặc số điện thoại..."
                    value={customerSearchTerm}
                    onChange={(e) => setCustomerSearchTerm(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {customerSearchTerm && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCustomerSearch}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Customer Selection */}
              <div>
                <Label htmlFor="customer">Chọn khách hàng</Label>
                <Select value={selectedCustomer} onValueChange={handleCustomerSelect}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Chọn khách hàng từ danh sách" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCustomers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-gray-500">{customer.email} • {customer.phone}</div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`ml-2 text-xs ${
                              customer.type === 'vip' ? 'border-yellow-200 text-yellow-700' :
                              customer.type === 'wholesale' ? 'border-purple-200 text-purple-700' :
                              'border-blue-200 text-blue-700'
                            }`}
                          >
                            {customer.type === 'vip' ? 'VIP' : 
                             customer.type === 'wholesale' ? 'Sỉ' : 'Thường'}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {customerInfo && (
                <>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-4">
                    <h4 className="font-bold text-emerald-900 mb-2">{customerInfo.name}</h4>
                    <div className="space-y-1 text-sm text-emerald-700/80">
                      <p>Email: {customerInfo.email}</p>
                      <p>Điện thoại: {customerInfo.phone}</p>
                      <p>Loại khách hàng: 
                        <Badge className="ml-2 text-xs bg-emerald-100 text-emerald-700 border-emerald-200">
                          {customerInfo.type === 'vip' ? 'VIP' : 
                           customerInfo.type === 'wholesale' ? 'Khách sỉ' : 'Khách thường'}
                        </Badge>
                      </p>
                      {customerInfo.discount > 0 && (
                        <p>Chiết khấu: <span className="font-bold text-green-600">{customerInfo.discount}%</span></p>
                      )}
                    </div>
                  </div>

                  {/* Additional Order Info */}
                  <Card className="p-4 border border-gray-100 shadow-sm space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <BadgeInfo className="h-4 w-4 text-emerald-600" />
                      Thông tin bổ sung đơn hàng
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Priority */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <ShieldAlert className="h-3 w-3" />
                          Mức độ ưu tiên
                        </Label>
                        <Select value={priority} onValueChange={setPriority}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Thấp">Thấp</SelectItem>
                            <SelectItem value="Trung bình">Trung bình</SelectItem>
                            <SelectItem value="Cao">Cao</SelectItem>
                            <SelectItem value="Khẩn cấp">Khẩn cấp</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Pickup Location */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          Nơi lấy hàng
                        </Label>
                        <Select value={pickupLocation} onValueChange={setPickupLocation}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn kho hàng..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kho Thành Phố">Kho Thành Phố</SelectItem>
                            <SelectItem value="Kho Bình Dương">Kho Bình Dương</SelectItem>
                            <SelectItem value="Kho Đồng Nai">Kho Đồng Nai</SelectItem>
                            <SelectItem value="Kho Trực Tiếp">Giao trực tiếp từ xưởng</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Processing Status */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Briefcase className="h-3 w-3" />
                          Trạng thái xử lý
                        </Label>
                        <Select value={orderStatus} onValueChange={setOrderStatus}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mới">Đơn hàng mới</SelectItem>
                            <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                            <SelectItem value="Chờ về hàng">Chờ về hàng</SelectItem>
                            <SelectItem value="Đã sản xuất">Đã sản xuất xong</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Custom Price List */}
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Tag className="h-3 w-3" />
                          Bảng giá riêng
                        </Label>
                        <Input 
                          placeholder="Tên bảng giá áp dụng..."
                          value={customPriceList}
                          onChange={(e) => setCustomPriceList(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Date Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Expected Finish */}
                      <div className="space-y-2">
                        <Label>Ngày dự kiến hoàn thành</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !expectedFinishDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {expectedFinishDate ? format(expectedFinishDate, "dd/MM/yyyy") : <span>Chọn ngày...</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={expectedFinishDate}
                              onSelect={setExpectedFinishDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Sales Appointment */}
                      <div className="space-y-2">
                        <Label>Ngày sales hẹn</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !salesAppointmentDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {salesAppointmentDate ? format(salesAppointmentDate, "dd/MM/yyyy") : <span>Chọn ngày...</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={salesAppointmentDate}
                              onSelect={setSalesAppointmentDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Restock Date */}
                      <div className="space-y-2">
                        <Label>Ngày về hàng</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !restockDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {restockDate ? format(restockDate, "dd/MM/yyyy") : <span>Chọn ngày...</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={restockDate}
                              onSelect={setRestockDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Committed Delivery */}
                      <div className="space-y-2">
                        <Label>Ngày cam kết giao</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !committedDeliveryDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {committedDeliveryDate ? format(committedDeliveryDate, "dd/MM/yyyy") : <span>Chọn ngày...</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={committedDeliveryDate}
                              onSelect={setCommittedDeliveryDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          {!selectedCustomer ? (
            <Card className="p-6 border-0 shadow-sm bg-white text-center">
              <p className="text-gray-500">Vui lòng chọn khách hàng trước khi chọn sản phẩm</p>
            </Card>
          ) : (
            <>
              {/* Product Search */}
              <Card className="p-4 border-0 shadow-sm bg-white">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      value={productSearchTerm}
                      onChange={(e) => setProductSearchTerm(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    {productSearchTerm && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearProductSearch}
                        className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    onClick={() => toast.info('Chức năng quét mã QR đang được khởi tạo')}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              <PriceList 
                customerType={customerInfo?.type} 
                showActions={true}
                onSelectProduct={handleAddProduct}
                searchTerm={productSearchTerm}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card className="p-4 border-0 shadow-sm bg-white">
            <h3 className="font-bold text-gray-900 mb-4">Giỏ hàng ({orderItems.length} sản phẩm)</h3>
            
            {orderItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Chưa có sản phẩm nào trong giỏ hàng</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex flex-col p-4 bg-gray-50 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-sm text-emerald-700 font-bold">
                            {item.unitPrice.toLocaleString('vi-VN')} ₫
                          </span>
                          {item.phuThu > 0 && (
                            <Badge className="text-[10px] bg-green-100 text-green-700 border-green-200">
                              +Phụ thu: {item.phuThu.toLocaleString('vi-VN')} ₫
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1 bg-green-50 border border-green-100 rounded px-1.5 py-0.5">
                            <Percent className="h-3 w-3 text-green-600" />
                            <input 
                              type="number" 
                              value={item.discount}
                              onChange={(e) => updateItemField(item.id, 'discount', parseInt(e.target.value) || 0)}
                              className="w-8 bg-transparent text-[10px] font-bold text-green-700 focus:outline-none"
                            />
                            <span className="text-[10px] text-green-700">%</span>
                          </div>
                          <Badge className="text-[10px] bg-blue-100 text-blue-700 border-blue-200">
                            Thuế: {item.tax}%
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs text-gray-500 uppercase">Số lượng</Label>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 rounded-lg border-emerald-200 text-emerald-700"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input 
                            type="number" 
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                            className="h-8 w-16 text-center text-sm font-bold border-emerald-200"
                          />
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-lg border-emerald-200 text-emerald-700"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`van-${item.id}`} 
                            checked={item.mangVan}
                            onCheckedChange={(checked) => updateItemField(item.id, 'mangVan', checked)}
                          />
                          <Label htmlFor={`van-${item.id}`} className="text-xs font-medium">Mang Ván</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`giay-${item.id}`} 
                            checked={item.mangGiay}
                            onCheckedChange={(checked) => updateItemField(item.id, 'mangGiay', checked)}
                          />
                          <Label htmlFor={`giay-${item.id}`} className="text-xs font-medium">Mang Giấy</Label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Thành tiền:</span>
                      <p className="font-bold text-gray-900 text-lg">
                        {item.total.toLocaleString('vi-VN')} ₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {orderItems.length > 0 && (
            <>
              <Card className="p-4 border-0 shadow-sm bg-white">
                <h3 className="font-bold text-gray-900 mb-4">Tổng kết đơn hàng</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tạm tính:</span>
                    <span>{calculateTotal().toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Tổng tiền thuế:</span>
                    <span>+{calculateTotalTax().toLocaleString('vi-VN')} ₫</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-emerald-700">{calculateGrandTotal().toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-0 shadow-sm bg-white">
                <h3 className="font-bold text-gray-900 mb-4">Ghi chú đơn hàng</h3>
                <Textarea 
                  placeholder="Ghi chú thêm cho đơn hàng..."
                  className="min-h-[80px]"
                />
              </Card>

              <div className="flex space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Lưu nháp
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
                >
                  Tạo đơn hàng
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-emerald-600" />
              Cấu hình sản phẩm
            </DialogTitle>
            <DialogDescription>
              {configProduct?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label className="text-sm font-bold text-gray-700">Số lượng mua</Label>
              <div className="flex items-center space-x-3">
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => setConfigQty(Math.max(1, configQty - 1))}
                  className="h-10 w-10 rounded-xl border-emerald-200 text-emerald-700 shadow-sm"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input 
                  type="number" 
                  value={configQty}
                  onChange={(e) => setConfigQty(parseInt(e.target.value) || 1)}
                  className="h-12 text-center text-lg font-bold border-emerald-200 rounded-xl focus:ring-emerald-500"
                />
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => setConfigQty(configQty + 1)}
                  className="h-10 w-10 rounded-xl border-emerald-200 text-emerald-700 shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label className="text-sm font-bold text-gray-700">Giảm giá (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <Input 
                  type="number" 
                  value={configDiscount}
                  onChange={(e) => setConfigDiscount(parseInt(e.target.value) || 0)}
                  className="pl-10 h-12 text-lg font-bold border-emerald-200 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                  configVan ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-gray-100'
                }`}
                onClick={() => setConfigVan(!configVan)}
              >
                <Checkbox 
                  id="config-van" 
                  checked={configVan}
                  onCheckedChange={(checked) => setConfigVan(checked as boolean)}
                />
                <Label htmlFor="config-van" className="text-sm font-bold cursor-pointer">Mang Ván</Label>
              </div>

              <div 
                className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                  configGiay ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-gray-100'
                }`}
                onClick={() => setConfigGiay(!configGiay)}
              >
                <Checkbox 
                  id="config-giay" 
                  checked={configGiay}
                  onCheckedChange={(checked) => setConfigGiay(checked as boolean)}
                />
                <Label htmlFor="config-giay" className="text-sm font-bold cursor-pointer">Mang Giấy</Label>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-row gap-3 pt-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={() => setIsConfigOpen(false)}
              className="flex-1 h-12 rounded-xl border-gray-200 text-gray-700 font-bold"
            >
              Hủy
            </Button>
            <Button 
              onClick={confirmAddProduct}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 font-bold shadow-lg shadow-emerald-200"
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
