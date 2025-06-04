
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock data for products/courses
const mockProducts = [
  {
    id: '1',
    title: 'دورة تطوير تطبيقات الويب الشاملة',
    description: 'تعلم تطوير تطبيقات الويب من الصفر باستخدام أحدث التقنيات والأدوات',
    price: 299,
    currency: 'ريال',
    image: '/placeholder.svg',
    seller: 'أحمد محمد',
    category: 'programming',
    trustScore: 85,
    totalVotes: 124,
    reviewCount: 89,
    rating: 4.7,
    isNew: true,
    isTrending: true
  },
  {
    id: '2',
    title: 'كورس تصميم واجهات المستخدم UI/UX',
    description: 'احترف تصميم واجهات المستخدم وتحسين تجربة المستخدم',
    price: 199,
    currency: 'ريال',
    image: '/placeholder.svg',
    seller: 'سارة العلي',
    category: 'design',
    trustScore: 92,
    totalVotes: 156,
    reviewCount: 134,
    rating: 4.9,
    isFeatured: true
  },
  {
    id: '3',
    title: 'استراتيجيات التسويق الرقمي المتقدمة',
    description: 'تعلم أحدث استراتيجيات التسويق الرقمي وزيادة المبيعات',
    price: 149,
    currency: 'ريال',
    image: '/placeholder.svg',
    seller: 'محمد الخالدي',
    category: 'marketing',
    trustScore: 78,
    totalVotes: 95,
    reviewCount: 72,
    rating: 4.4
  },
  {
    id: '4',
    title: 'كتاب إدارة الأعمال الناجحة',
    description: 'دليل شامل لإدارة الأعمال وتطوير المشاريع الناجحة',
    price: 89,
    currency: 'ريال',
    image: '/placeholder.svg',
    seller: 'دار النشر العربية',
    category: 'books',
    trustScore: 88,
    totalVotes: 203,
    reviewCount: 167,
    rating: 4.6,
    isTrending: true
  },
  {
    id: '5',
    title: 'دورة تعلم اللغة الإنجليزية للمبتدئين',
    description: 'تعلم اللغة الإنجليزية من الأساسيات حتى المستوى المتقدم',
    price: 0,
    currency: 'ريال',
    image: '/placeholder.svg',
    seller: 'مركز اللغات الدولي',
    category: 'language',
    trustScore: 94,
    totalVotes: 312,
    reviewCount: 278,
    rating: 4.8,
    isNew: true
  },
  {
    id: '6',
    title: 'جهاز لابتوب للبرمجة والتصميم',
    description: 'لابتوب عالي الأداء مخصص للمطورين والمصممين',
    price: 3499,
    currency: 'ريال',
    image: '/placeholder.svg',
    seller: 'متجر التقنية',
    category: 'electronics',
    trustScore: 76,
    totalVotes: 45,
    reviewCount: 23,
    rating: 4.2
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(mockProducts.filter(product => product.category === category));
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Hero />
        
        {/* Products Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                اكتشف أفضل الدورات والمنتجات
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                تصفح مجموعة منتقاة من الدورات والمنتجات المُقيَّمة من قبل مجتمعنا
              </p>
            </div>
            
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </LanguageProvider>
  );
};

export default Index;
