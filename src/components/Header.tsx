
import React from 'react';
import { Search, User, Bell, Globe, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HF</span>
              </div>
              <span className="mr-2 ml-2 text-xl font-bold text-gray-900">Honest Finds</span>
            </div>
            
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              <a href="#" className="text-gray-900 hover:text-emerald-600 font-medium transition-colors">
                {t('home')}
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                {t('courses')}
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                {t('products')}
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">
                {t('sellers')}
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={t('search_placeholder')}
                className="pl-10 rtl:pl-3 rtl:pr-10 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center space-x-1 rtl:space-x-reverse"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {t('login')}
            </Button>
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
