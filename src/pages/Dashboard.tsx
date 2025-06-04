
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import { Plus, Package, Star } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    imageURL: '',
    category: ''
  });

  useEffect(() => {
    if (user?.role === 'seller') {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await productsAPI.create(productForm);
      toast({
        title: "تم إضافة المنتج بنجاح",
        description: "سيظهر المنتج في القائمة قريباً",
      });
      setProductForm({ title: '', description: '', imageURL: '', category: '' });
      setShowAddProduct(false);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "خطأ في إضافة المنتج",
        description: error.response?.data?.message || "حدث خطأ ما",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">يجب تسجيل الدخول أولاً</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            مرحباً، {user.name}
          </h1>
          <p className="text-gray-600">
            {user.role === 'seller' ? 'لوحة تحكم البائع' : 'لوحة تحكم المستخدم'}
          </p>
        </div>

        {user.role === 'seller' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">منتجاتي</h2>
              <Button 
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                إضافة منتج جديد
              </Button>
            </div>

            {showAddProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>إضافة منتج جديد</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div>
                      <Label htmlFor="title">عنوان المنتج</Label>
                      <Input
                        id="title"
                        value={productForm.title}
                        onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">الوصف</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageURL">رابط الصورة</Label>
                      <Input
                        id="imageURL"
                        type="url"
                        value={productForm.imageURL}
                        onChange={(e) => setProductForm({...productForm, imageURL: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">الفئة</Label>
                      <Select onValueChange={(value) => setProductForm({...productForm, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programming">البرمجة</SelectItem>
                          <SelectItem value="design">التصميم</SelectItem>
                          <SelectItem value="marketing">التسويق</SelectItem>
                          <SelectItem value="books">الكتب</SelectItem>
                          <SelectItem value="language">اللغات</SelectItem>
                          <SelectItem value="electronics">الإلكترونيات</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        إضافة المنتج
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowAddProduct(false)}
                      >
                        إلغاء
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <Card key={product._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <Package className="w-12 h-12 text-emerald-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{product.averageRating || 0}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {user.role === 'user' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الحساب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>الاسم</Label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <Label>البريد الإلكتروني</Label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <Label>نوع الحساب</Label>
                    <p className="text-lg">مستخدم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
