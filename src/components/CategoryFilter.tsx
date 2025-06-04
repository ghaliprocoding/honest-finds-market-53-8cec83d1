
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const { t } = useLanguage();
  
  const categories = [
    { id: 'all', name: 'الكل', nameEn: 'All' },
    { id: 'programming', name: 'البرمجة', nameEn: 'Programming' },
    { id: 'design', name: 'التصميم', nameEn: 'Design' },
    { id: 'business', name: 'الأعمال', nameEn: 'Business' },
    { id: 'marketing', name: 'التسويق', nameEn: 'Marketing' },
    { id: 'language', name: 'اللغات', nameEn: 'Languages' },
    { id: 'electronics', name: 'الإلكترونيات', nameEn: 'Electronics' },
    { id: 'books', name: 'الكتب', nameEn: 'Books' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedCategory === category.id
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {t(category.id) || category.nameEn}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryFilter;
