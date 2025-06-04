
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, User, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TrustBadge from './TrustBadge';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price?: number;
  currency?: string;
  image: string;
  seller: string;
  category: string;
  trustScore: number;
  totalVotes: number;
  reviewCount: number;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  currency,
  image,
  seller,
  category,
  trustScore,
  totalVotes,
  reviewCount,
  rating,
  isNew,
  isTrending,
  isFeatured
}) => {
  return (
    <Link to={`/products/${id}`}>
      <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-md overflow-hidden">
        <div className="relative">
          <img 
            src={image || '/placeholder.svg'} 
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {isNew && (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                جديد
              </Badge>
            )}
            {isTrending && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                رائج
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                مميز
              </Badge>
            )}
          </div>

          {/* Price */}
          {price !== undefined && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="font-bold text-lg text-gray-900">
                {price === 0 ? 'مجاني' : `${price} ${currency}`}
              </span>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Seller */}
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <User className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
            <span>{seller}</span>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{rating}</span>
              <span className="text-sm text-gray-500">({reviewCount})</span>
            </div>
          </div>

          {/* Trust Badge */}
          <TrustBadge 
            score={trustScore} 
            totalVotes={totalVotes}
            size="sm"
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
