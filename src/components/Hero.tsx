
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, value: '10K+', label: 'مستخدم نشط' },
    { icon: Shield, value: '95%', label: 'معدل الثقة' },
    { icon: TrendingUp, value: '5K+', label: 'منتج مُقيَّم' }
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Hero Content */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t('search_placeholder')}
                className="pl-12 rtl:pl-4 rtl:pr-12 h-14 text-lg bg-white border-2 border-gray-200 focus:border-emerald-500 rounded-xl shadow-lg"
              />
              <Button 
                size="lg" 
                className="absolute right-2 rtl:right-auto rtl:left-2 top-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              >
                {t('search')}
              </Button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" size="lg" className="hover:bg-emerald-50 hover:border-emerald-200">
              {t('trending')}
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-emerald-50 hover:border-emerald-200">
              {t('top_rated')}
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-emerald-50 hover:border-emerald-200">
              {t('new')}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
