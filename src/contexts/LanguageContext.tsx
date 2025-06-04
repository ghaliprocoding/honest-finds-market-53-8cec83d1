
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    courses: 'الدورات',
    products: 'المنتجات',
    sellers: 'البائعون',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    dashboard: 'لوحة التحكم',
    
    // Home page
    hero_title: 'اكتشف الدورات والمنتجات الموثوقة',
    hero_subtitle: 'منصة تقييم شفافة تساعدك على اتخاذ قرارات شراء ذكية',
    search_placeholder: 'ابحث عن دورات أو منتجات...',
    search: 'بحث',
    
    // Trust indicators
    trust_score: 'نقاط الثقة',
    trusted: 'موثوق',
    not_trusted: 'غير موثوق',
    reviews: 'تقييم',
    votes: 'صوت',
    helpful: 'مفيد',
    
    // Categories
    all: 'الكل',
    programming: 'البرمجة',
    design: 'التصميم',
    business: 'الأعمال',
    marketing: 'التسويق',
    language: 'اللغات',
    electronics: 'الإلكترونيات',
    books: 'الكتب',
    
    // Product/Course details
    price: 'السعر',
    free: 'مجاني',
    description: 'الوصف',
    seller: 'البائع',
    created_by: 'من إنشاء',
    add_review: 'إضافة تقييم',
    write_review: 'اكتب تقييمك',
    view: 'عرض',
    
    // Actions
    vote_up: 'تصويت إيجابي',
    vote_down: 'تصويت سلبي',
    share: 'مشاركة',
    report: 'إبلاغ',
    save: 'حفظ',
    cancel: 'إلغاء',
    
    // Dashboard
    my_products: 'منتجاتي',
    my_reviews: 'تقييماتي',
    analytics: 'الإحصائيات',
    settings: 'الإعدادات',
    
    // Status
    trending: 'رائج',
    top_rated: 'الأعلى تقييماً',
    new: 'جديد',
    featured: 'مميز'
  },
  en: {
    // Navigation
    home: 'Home',
    courses: 'Courses',
    products: 'Products',
    sellers: 'Sellers',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    
    // Home page
    hero_title: 'Discover Trusted Courses & Products',
    hero_subtitle: 'A transparent review platform to help you make smart purchase decisions',
    search_placeholder: 'Search for courses or products...',
    search: 'Search',
    
    // Trust indicators
    trust_score: 'Trust Score',
    trusted: 'Trusted',
    not_trusted: 'Not Trusted',
    reviews: 'Reviews',
    votes: 'Votes',
    helpful: 'Helpful',
    
    // Categories
    all: 'All',
    programming: 'Programming',
    design: 'Design',
    business: 'Business',
    marketing: 'Marketing',
    language: 'Languages',
    electronics: 'Electronics',
    books: 'Books',
    
    // Product/Course details
    price: 'Price',
    free: 'Free',
    description: 'Description',
    seller: 'Seller',
    created_by: 'Created by',
    add_review: 'Add Review',
    write_review: 'Write your review',
    view: 'View',
    
    // Actions
    vote_up: 'Vote Up',
    vote_down: 'Vote Down',
    share: 'Share',
    report: 'Report',
    save: 'Save',
    cancel: 'Cancel',
    
    // Dashboard
    my_products: 'My Products',
    my_reviews: 'My Reviews',
    analytics: 'Analytics',
    settings: 'Settings',
    
    // Status
    trending: 'Trending',
    top_rated: 'Top Rated',
    new: 'New',
    featured: 'Featured'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Set document direction and language
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
