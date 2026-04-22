import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { PriceList } from './PriceList'
import { Users, Search, Phone, Mail, MapPin, Star, Crown, DollarSign, Eye, Plus, Calendar, Package } from 'lucide-react'

export function Customers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)

  const customersData = {
    'all': [
      {
        id: 1,
        name: 'Công ty TNHH Nội Thất Việt',
        type: 'wholesale',
        email: 'contact@noithatviet.com',
        phone: '0909123456',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        totalOrders: 45,
        totalValue: 890000000,
        lastOrder: '2025-08-10',
        status: 'active',
        discount: 10,
        joinDate: '2023-05-15',
        totalDebt: 50000000,
        debtOrders: [
          { id: 'DH001', debt: 15000000, status: 'Quá hạn' },
          { id: 'DH012', debt: 35000000, status: 'Đang nợ' }
        ]
      },
      {
        id: 2,
        name: 'Khách sạn Luxury Hotel',
        type: 'vip',
        email: 'purchasing@luxuryhotel.com',
        phone: '0908234567',
        address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
        totalOrders: 28,
        totalValue: 560000000,
        lastOrder: '2025-08-12',
        status: 'active',
        discount: 5,
        joinDate: '2023-08-20'
      },
      {
        id: 3,
        name: 'Nguyễn Văn A',
        type: 'standard',
        email: 'nguyenvana@gmail.com',
        phone: '0907345678',
        address: '789 Đường Pasteur, Quận 3, TP.HCM',
        totalOrders: 8,
        totalValue: 125000000,
        lastOrder: '2025-08-11',
        status: 'active',
        discount: 0,
        joinDate: '2024-01-10'
      },
      {
        id: 4,
        name: 'Văn phòng ABC Corp',
        type: 'vip',
        email: 'admin@abccorp.vn',
        phone: '0906456789',
        address: '321 Đường Võ Văn Tần, Quận 3, TP.HCM',
        totalOrders: 15,
        totalValue: 285000000,
        lastOrder: '2025-08-09',
        status: 'active',
        discount: 5,
        joinDate: '2023-12-05'
      },
      {
        id: 5,
        name: 'Trần Thị B',
        type: 'standard',
        email: 'tranthib@yahoo.com',
        phone: '0905567890',
        address: '654 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM',
        totalOrders: 3,
        totalValue: 45000000,
        lastOrder: '2025-07-25',
        status: 'inactive',
        discount: 0,
        joinDate: '2024-03-18'
      }
    ]
  }

  const getCustomerTypeInfo = (type: string) => {
    switch (type) {
      case 'vip':
        return { 
          label: 'VIP', 
          icon: Star, 
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          iconColor: 'text-yellow-600'
        }
      case 'wholesale':
        return { 
          label: 'Khách sỉ', 
          icon: Crown, 
          color: 'bg-purple-100 text-purple-700 border-purple-200',
          iconColor: 'text-purple-600'
        }
      default:
        return { 
          label: 'Khách thường', 
          icon: Users, 
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          iconColor: 'text-blue-600'
        }
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-700 border-green-200'
      : 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const filteredCustomers = customersData.all.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  )

  const renderCustomerCard = (customer: any) => {
    const typeInfo = getCustomerTypeInfo(customer.type)
    const IconComponent = typeInfo.icon

    return (
      <Card key={customer.id} className="p-4 mb-3 border-0 shadow-sm bg-white">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-bold text-gray-900">{customer.name}</h4>
                <div className={`w-6 h-6 rounded-lg ${typeInfo.color} flex items-center justify-center`}>
                  <IconComponent className={`h-3 w-3 ${typeInfo.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={`text-xs ${typeInfo.color}`}>
                  {typeInfo.label}
                </Badge>
                <Badge className={`text-xs ${getStatusColor(customer.status)}`}>
                  {customer.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                </Badge>
                {customer.discount > 0 && (
                  <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                    -{customer.discount}%
                  </Badge>
                )}
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{customer.address}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-emerald-700/70">Tổng đơn hàng:</span>
                <p className="font-bold text-emerald-900">{customer.totalOrders}</p>
              </div>
              <div>
                <span className="text-emerald-700/70">Tổng giá trị:</span>
                <p className="font-bold text-emerald-900">
                  {(customer.totalValue / 1000000).toFixed(0)}M ₫
                </p>
              </div>
              <div>
                <span className="text-emerald-700/70">Đơn gần nhất:</span>
                <p className="font-medium text-emerald-900">
                  {new Date(customer.lastOrder).toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div>
                <span className="text-emerald-700/70">Khách từ:</span>
                <p className="font-medium text-emerald-900">
                  {new Date(customer.joinDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-2 pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedCustomer(customer)}
                  className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Bảng giá
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <span>Bảng giá cho {customer.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <PriceList customerType={customer.type} showActions={false} />
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => navigate(`/customers/${customer.id}/debt`, { state: { customer } })}
              className={`flex-1 ${
                customer.totalDebt !== undefined 
                  ? 'border-red-200 text-red-700 hover:bg-red-50' 
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Eye className="h-4 w-4 mr-2" />
              Tổng công nợ
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex items-center justify-end mb-2">
        <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Thêm mới
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6 border-0 shadow-sm bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm khách hàng theo tên, email hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 border-0 shadow-sm bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{filteredCustomers.length}</p>
              <p className="text-sm text-gray-600">Tổng khách hàng</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-0 shadow-sm bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(customersData.all.reduce((sum, c) => sum + c.totalValue, 0) / 1000000)}M
              </p>
              <p className="text-sm text-gray-600">Tổng doanh thu</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Customer List */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="all" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Users className="h-4 w-4" />
            <span className="text-xs">Tất cả</span>
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
              {customersData.all.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="vip" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Star className="h-4 w-4" />
            <span className="text-xs">VIP</span>
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
              {customersData.all.filter(c => c.type === 'vip').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="wholesale" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Crown className="h-4 w-4" />
            <span className="text-xs">Sỉ</span>
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
              {customersData.all.filter(c => c.type === 'wholesale').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="standard" className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Package className="h-4 w-4" />
            <span className="text-xs">Thường</span>
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
              {customersData.all.filter(c => c.type === 'standard').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="space-y-3">
            {filteredCustomers.map(renderCustomerCard)}
          </div>
        </TabsContent>

        <TabsContent value="vip" className="mt-4">
          <div className="space-y-3">
            {filteredCustomers.filter(c => c.type === 'vip').map(renderCustomerCard)}
          </div>
        </TabsContent>

        <TabsContent value="wholesale" className="mt-4">
          <div className="space-y-3">
            {filteredCustomers.filter(c => c.type === 'wholesale').map(renderCustomerCard)}
          </div>
        </TabsContent>

        <TabsContent value="standard" className="mt-4">
          <div className="space-y-3">
            {filteredCustomers.filter(c => c.type === 'standard').map(renderCustomerCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}