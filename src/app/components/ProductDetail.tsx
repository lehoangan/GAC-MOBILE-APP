import { useLocation, useNavigate } from 'react-router'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ArrowLeft, Package, Star, Tag, Info, Layers, Beaker, CheckCircle } from 'lucide-react'

export function ProductDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const product = (location.state as { product?: any })?.product

  if (!product) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <p className="text-gray-500 mb-4">Không tìm thấy thông tin sản phẩm</p>
        <button onClick={() => navigate('/products')} className="text-amber-600 font-medium">
          Quay lại danh sách
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 pt-4 pb-6 border-b border-amber-100 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-amber-900 mb-4 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Quay lại</span>
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">
              {product.name}
            </h1>
            <Badge 
              className={`text-xs ${
                product.status === 'Có sẵn' 
                  ? 'bg-green-100 text-green-700 border-green-200' 
                  : 'bg-red-100 text-red-700 border-red-200'
              }`}
            >
              {product.status}
            </Badge>
          </div>
          <div className="bg-white p-2 rounded-xl border border-amber-200/50 shadow-sm text-center min-w-[80px]">
            <p className="text-xs text-amber-700/70 font-medium tracking-wide">Kho</p>
            <p className="text-xl font-bold text-amber-600">{product.stock}</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Main Info */}
        <Card className="p-4 space-y-4 border-0 shadow-sm bg-white overflow-hidden">
          <div className="w-full h-40 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center overflow-hidden border border-amber-100">
            {product.image ? (
               <img src={product.image} className="object-cover w-full h-full opacity-90" alt="Product" />
            ) : (
               <Package className="h-16 w-16 text-amber-600/50" />
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Giá bán</p>
              <p className="text-2xl font-bold text-gray-900">
                {product.price.toLocaleString('vi-VN')} ₫
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <span className="flex items-center text-gray-500 text-xs mb-1">
                  <Tag className="h-3.5 w-3.5 mr-1" /> Danh mục
                </span>
                <span className="font-semibold text-gray-800">{product.category}</span>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <span className="flex items-center text-gray-500 text-xs mb-1">
                  <Layers className="h-3.5 w-3.5 mr-1" /> Chất liệu
                </span>
                <span className="font-semibold text-gray-800">{product.material}</span>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <span className="flex items-center text-gray-500 text-xs mb-1">
                  <Star className="h-3.5 w-3.5 mr-1 text-amber-400" /> Đánh giá
                </span>
                <span className="font-semibold text-gray-800">{product.rating} / 5</span>
              </div>
              <div className="flex flex-col bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <span className="flex items-center text-gray-500 text-xs mb-1">
                  <Info className="h-3.5 w-3.5 mr-1" /> Mã sản phẩm
                </span>
                <span className="font-semibold text-gray-800">SP00{product.id}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Định mức nguyên vật liệu (BOM) */}
        {product.bom && product.bom.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Beaker className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="font-bold text-gray-900 text-lg">Định mức nguyên vật liệu</h2>
            </div>
            
            <div className="space-y-3">
              {product.bom.map((mat: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="bg-white p-1 rounded-full border border-gray-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{mat}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
