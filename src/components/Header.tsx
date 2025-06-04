
import React from 'react';
import { Search, User, Bell, Globe, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HF</span>
              </div>
              <span className="mr-2 ml-2 text-xl font-bold text-gray-900">Honest Finds</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              <Link to="/" className="text-gray-900 hover:text-emerald-600 font-medium transition-colors">
                {t('home')}
              </Link>
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center space-x-2 rtl:space-x-reverse">
                      <User className="w-4 h-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center space-x-2 rtl:space-x-reverse text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}
            
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
