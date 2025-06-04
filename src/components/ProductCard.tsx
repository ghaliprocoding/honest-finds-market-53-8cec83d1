
import React from 'react';
import { Star, MessageSquare, Share, Bookmark, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TrustBadge from './TrustBadge';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
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
  const { t } = useLanguage();

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in ${isTrending ? 'trending-glow' : ''}`}>
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-col space-y-2">
            {isNew && (
              <Badge className="bg-blue-500 text-white">
                {t('new')}
              </Badge>
            )}
            {isTrending && (
              <Badge className="bg-orange-500 text-white">
                {t('trending')}
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-purple-500 text-white">
                {t('featured')}
              </Badge>
            )}
          </div>

          {/* Trust Badge */}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
            <TrustBadge score={trustScore} totalVotes={totalVotes} size="sm" />
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                <Share className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              {t(category)}
            </Badge>
            <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
              <span>({reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>

          {/* Seller */}
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full mr-2 rtl:mr-0 rtl:ml-2"></div>
            <span className="text-sm text-gray-600">{t('created_by')} {seller}</span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-2xl font-bold text-emerald-600">
                {price === 0 ? t('free') : `${price} ${currency}`}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Button size="sm" variant="outline" className="text-gray-600 hover:text-emerald-600">
                <MessageSquare className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                {reviewCount}
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <ExternalLink className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                {t('view')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
