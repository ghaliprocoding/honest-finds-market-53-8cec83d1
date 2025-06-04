
import React from 'react';
import { Shield, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrustBadgeProps {
  score: number;
  totalVotes: number;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ 
  score, 
  totalVotes, 
  size = 'md', 
  showDetails = false 
}) => {
  const { t } = useLanguage();
  
  const isTrusted = score >= 70;
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <div
        className={`
          inline-flex items-center space-x-1 rtl:space-x-reverse rounded-full font-medium
          ${sizeClasses[size]}
          ${isTrusted 
            ? 'trust-badge text-white' 
            : 'bg-red-100 text-red-800'
          }
        `}
      >
        <Shield className={iconSize[size]} />
        <span>{score}%</span>
        {isTrusted ? (
          <ThumbsUp className={iconSize[size]} />
        ) : (
          <ThumbsDown className={iconSize[size]} />
        )}
      </div>
      
      {showDetails && (
        <span className="text-gray-500 text-sm">
          {totalVotes} {t('votes')}
        </span>
      )}
    </div>
  );
};

export default TrustBadge;
