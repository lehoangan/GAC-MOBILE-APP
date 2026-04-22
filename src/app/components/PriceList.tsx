import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Package, Percent, Star, Award, Users, Crown, Settings, Tag, PlusCircle } from 'lucide-react'

interface PriceListProps {
  customerType?: 'standard' | 'vip' | 'wholesale' | null
  showActions?: boolean
  onSelectProduct?: (product: any) => void
  searchTerm?: string
}

export function PriceList({ customerType = null, showActions = false, onSelectProduct, searchTerm = '' }: PriceListProps) {
  const productPrices = {
    furniture: [
      {
        id: 1,
        name: 'Bàn gỗ sồi cao cấp Executive',
        category: 'Bàn làm việc',
        basePrice: 12500000,
        prices: {
          standard: { price: 12500000, discount: 0 },
          vip: { price: 11875000, discount: 5 },
          wholesale: { price: 11250000, discount: 10 }
        },
        unit: 'cái',
        inStock: 15,
        minOrder: 1,
        phuThu: 500000,
        tax: 10,
        description: 'Bàn làm việc cao cấp từ gỗ sồi tự nhiên',
        specs: [
          { label: 'Chất liệu', value: 'Gỗ sồi Nga' },
          { label: 'Kích thước', value: '1800x900x750mm' },
          { label: 'Màu sắc', value: 'Cánh gián nhạt' }
        ]
      },
      {
        id: 2,
        name: 'Ghế gỗ cao su Ergonomic',
        category: 'Ghế văn phòng',
        basePrice: 4200000,
        prices: {
          standard: { price: 4200000, discount: 0 },
          vip: { price: 3990000, discount: 5 },
          wholesale: { price: 3780000, discount: 10 }
        },
        unit: 'cái',
        inStock: 42,
        minOrder: 2,
        phuThu: 150000,
        tax: 8,
        description: 'Ghế ergonomic từ gỗ cao su với đệm êm',
        specs: [
          { label: 'Chất liệu', value: 'Gỗ cao su, Nệm vải' },
          { label: 'Chân ghế', value: 'Xoay 360 độ' },
          { label: 'Màu sắc', value: 'Xám đậm' }
        ]
      },
      {
        id: 3,
        name: 'Tủ áo gỗ thông Nordic',
        category: 'Tủ áo',
        basePrice: 8900000,
        prices: {
          standard: { price: 8900000, discount: 0 },
          vip: { price: 8455000, discount: 5 },
          wholesale: { price: 8010000, discount: 10 }
        },
        unit: 'cái',
        inStock: 8,
        minOrder: 1,
        phuThu: 800000,
        tax: 10,
        description: 'Tủ áo phong cách Nordic từ gỗ thông',
        specs: [
          { label: 'Chất liệu', value: 'Gỗ thông Chile' },
          { label: 'Số cánh', value: '3 cánh' },
          { label: 'Kích thước', value: '1600x2000x600mm' }
        ]
      },
      {
        id: 4,
        name: 'Kệ sách gỗ tự nhiên',
        category: 'Kệ sách',
        basePrice: 3200000,
        prices: {
          standard: { price: 3200000, discount: 0 },
          vip: { price: 3040000, discount: 5 },
          wholesale: { price: 2880000, discount: 10 }
        },
        unit: 'cái',
        inStock: 25,
        minOrder: 1,
        phuThu: 200000,
        tax: 10,
        description: 'Kệ sách đa năng từ gỗ tự nhiên',
        specs: [
          { label: 'Chất liệu', value: 'Gỗ xoan đào' },
          { label: 'Số tầng', value: '5 tầng' },
          { label: 'Tải trọng', value: '20kg/tầng' }
        ]
      }
    ],
    accessories: [
      {
        id: 5,
        name: 'Tay nắm đồng cao cấp',
        category: 'Phụ kiện',
        basePrice: 250000,
        prices: {
          standard: { price: 250000, discount: 0 },
          vip: { price: 225000, discount: 10 },
          wholesale: { price: 200000, discount: 20 }
        },
        unit: 'bộ',
        inStock: 150,
        minOrder: 10,
        phuThu: 0,
        tax: 8,
        description: 'Tay nắm đồng thau chống gỉ',
        specs: [
          { label: 'Vật liệu', value: 'Đồng thau nguyên chất' },
          { label: 'Kiểu dáng', value: 'Cổ điển' }
        ]
      },
      {
        id: 6,
        name: 'Ray trượt chất lượng cao',
        category: 'Phụ kiện',
        basePrice: 180000,
        prices: {
          standard: { price: 180000, discount: 0 },
          vip: { price: 162000, discount: 10 },
          wholesale: { price: 144000, discount: 20 }
        },
        unit: 'bộ',
        inStock: 200,
        minOrder: 20,
        phuThu: 0,
        tax: 8,
        description: 'Ray trượt im lặng cao cấp',
        specs: [
          { label: 'Vật liệu', value: 'Thép không gỉ' },
          { label: 'Tính năng', value: 'Giảm chấn' }
        ]
      }
    ]
  }

  const getCustomerTypeInfo = (type: string) => {
    switch (type) {
      case 'vip':
        return { 
          label: 'Khách hàng VIP', 
          icon: Star, 
          color: 'from-yellow-500 to-orange-500',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700'
        }
      case 'wholesale':
        return { 
          label: 'Khách hàng sỉ', 
          icon: Crown, 
          color: 'from-purple-500 to-purple-600',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700'
        }
      default:
        return { 
          label: 'Khách hàng thường', 
          icon: Users, 
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700'
        }
    }
  }

  const filterProducts = (products: any[]) => {
    if (!searchTerm) return products
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const renderProductCard = (product: any) => {
    const currentPrice = customerType ? product.prices[customerType] : product.prices.standard
    const discountAmount = product.basePrice - currentPrice.price

    return (
      <Card key={product.id} className="p-4 border-0 shadow-sm bg-white hover:shadow-md transition-all overflow-hidden group">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-base group-hover:text-amber-600 transition-colors">{product.name}</h4>
              <Badge variant="outline" className="text-[10px] mt-1.5 border-amber-200 text-amber-700 bg-amber-50">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.category !== 'Phụ kiện' && product.specs && product.specs.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-3 space-y-2 border border-gray-100">
              <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="h-3 w-3" /> Thông số kỹ thuật
              </h5>
              <div className="grid grid-cols-2 gap-2">
                {product.specs?.map((spec: any, idx: number) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[10px] text-gray-500">{spec.label}</span>
                    <span className="text-xs font-medium text-gray-800">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Details */}
          <div className="bg-gradient-to-br from-white to-amber-50/30 border border-amber-100 rounded-xl p-3 space-y-2">
             <div className="grid grid-cols-2 gap-2 text-xs border-b border-amber-100 pb-2 mb-2">
                <div className="flex justify-between items-center pr-2 border-r border-amber-100">
                  <span className="text-gray-500">Giá gốc:</span>
                  <span className="font-medium text-gray-700 line-through decoration-gray-400">
                    {product.basePrice.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <div className="flex justify-between items-center pl-2">
                  <span className="text-gray-500">Giảm giá:</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">
                    -{currentPrice.discount}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center pr-2 border-r border-amber-100">
                  <span className="text-gray-500">Phụ thu:</span>
                  <span className="font-medium text-orange-600">
                    +{product.phuThu.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <div className="flex justify-between items-center pl-2">
                  <span className="text-gray-500">Thuế:</span>
                  <span className="font-medium text-blue-600">{product.tax}%</span>
                </div>
             </div>
             
             <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-amber-700/70 font-bold uppercase tracking-wide">Đơn giá hiện tại</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-amber-900 tracking-tight">
                      {currentPrice.price.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-sm font-bold text-amber-700">₫/{product.unit}</span>
                  </div>
                </div>
                {showActions && (
                  <Button 
                    size="sm" 
                    onClick={() => onSelectProduct?.(product)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-200 rounded-xl"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Thêm
                  </Button>
                )}
             </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
               Min: <span className="font-bold text-gray-600">{product.minOrder} {product.unit}</span>
            </span>
            <span className="italic">{product.description}</span>
          </div>
        </div>
      </Card>
    )
  }

  const customerTypeInfo = customerType ? getCustomerTypeInfo(customerType) : null

  const filteredFurniture = filterProducts(productPrices.furniture)
  const filteredAccessories = filterProducts(productPrices.accessories)

  return (
    <div className="space-y-4">
      {customerType && customerTypeInfo && (
        <Card className="p-4 border-0 shadow-sm bg-white">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl ${customerTypeInfo.bgColor} flex items-center justify-center`}>
              <div className={`w-6 h-6 bg-gradient-to-r ${customerTypeInfo.color} rounded-lg flex items-center justify-center`}>
                <customerTypeInfo.icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{customerTypeInfo.label}</h3>
              <p className={`text-sm ${customerTypeInfo.textColor}`}>
                Bảng giá đã áp dụng ưu đãi cho khách hàng
              </p>
            </div>
          </div>
        </Card>
      )}

      {searchTerm && (
        <Card className="p-3 border-0 shadow-sm bg-blue-50">
          <p className="text-sm text-blue-700">
            Tìm kiếm cho: "<span className="font-medium">{searchTerm}</span>" 
            - {filteredFurniture.length + filteredAccessories.length} kết quả
          </p>
        </Card>
      )}

      <Tabs defaultValue="furniture" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="furniture" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Package className="h-4 w-4" />
            <span>Nội thất ({filteredFurniture.length})</span>
          </TabsTrigger>
          <TabsTrigger value="accessories" className="flex items-center space-x-2 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
            <Award className="h-4 w-4" />
            <span>Phụ kiện ({filteredAccessories.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="furniture" className="mt-4">
          {filteredFurniture.length === 0 ? (
            <Card className="p-6 border-0 shadow-sm bg-white text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Không tìm thấy sản phẩm nội thất phù hợp</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredFurniture.map(renderProductCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="accessories" className="mt-4">
          {filteredAccessories.length === 0 ? (
            <Card className="p-6 border-0 shadow-sm bg-white text-center">
              <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Không tìm thấy phụ kiện phù hợp</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredAccessories.map(renderProductCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}