import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { 
  User, 
  Package, 
  Heart, 
  LogOut, 
  CreditCard, 
  MapPin 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>My Account | Leatherly</title>
        <meta name="description" content="Manage your account, orders, and preferences." />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-medium text-leather-800 mb-6">My Account</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
              {/* Sidebar */}
              <aside className="space-y-2">
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    activeTab === 'profile' 
                      ? 'bg-leather-700 hover:bg-leather-800' 
                      : 'hover:bg-leather-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === 'orders' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    activeTab === 'orders' 
                      ? 'bg-leather-700 hover:bg-leather-800' 
                      : 'hover:bg-leather-100'
                  }`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    activeTab === 'addresses' 
                      ? 'bg-leather-700 hover:bg-leather-800' 
                      : 'hover:bg-leather-100'
                  }`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </Button>
                <Button
                  variant={activeTab === 'wishlist' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    activeTab === 'wishlist' 
                      ? 'bg-leather-700 hover:bg-leather-800' 
                      : 'hover:bg-leather-100'
                  }`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
                <Button
                  variant={activeTab === 'payment' ? 'default' : 'ghost'}
                  className={`w-full justify-start ${
                    activeTab === 'payment' 
                      ? 'bg-leather-700 hover:bg-leather-800' 
                      : 'hover:bg-leather-100'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </aside>
              
              {/* Content */}
              <div className="bg-white rounded-lg shadow-sm border border-leather-100 p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="hidden">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="addresses">Addresses</TabsTrigger>
                    <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                  </TabsList>
                  
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-leather-100">
                      <User className="h-5 w-5 text-leather-700" />
                      <h2 className="text-xl font-medium text-leather-800">Profile Information</h2>
                    </div>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue="+234 800 123 4567" />
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button 
                          type="submit"
                          className="bg-leather-700 hover:bg-leather-800"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  {/* Orders Tab */}
                  <TabsContent value="orders" className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-leather-100">
                      <Package className="h-5 w-5 text-leather-700" />
                      <h2 className="text-xl font-medium text-leather-800">Order History</h2>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        {
                          id: 'ORD123456',
                          date: '2023-06-15',
                          status: 'Delivered',
                          total: 22300
                        },
                        {
                          id: 'ORD123455',
                          date: '2023-05-20',
                          status: 'Delivered',
                          total: 9800
                        }
                      ].map((order) => (
                        <div 
                          key={order.id} 
                          className="p-4 border border-leather-100 rounded-lg hover:border-leather-200 transition-colors"
                        >
                          <div className="flex flex-wrap justify-between gap-3">
                            <div>
                              <div className="font-medium text-leather-800">{order.id}</div>
                              <div className="text-sm text-leather-500">
                                {new Date(order.date).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-right font-medium">
                                ₦{order.total.toLocaleString()}
                              </div>
                              <div className="text-sm text-green-600 text-right">
                                {order.status}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-leather-700 border-leather-200"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Other tabs would be implemented similarly */}
                  <TabsContent value="addresses">
                    <div className="flex items-center gap-3 pb-4 border-b border-leather-100 mb-6">
                      <MapPin className="h-5 w-5 text-leather-700" />
                      <h2 className="text-xl font-medium text-leather-800">Saved Addresses</h2>
                    </div>
                    
                    <div className="text-center py-8">
                      <p className="text-leather-600 mb-4">You don't have any saved addresses yet.</p>
                      <Button className="bg-leather-700 hover:bg-leather-800">
                        Add New Address
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="wishlist">
                    <div className="flex items-center gap-3 pb-4 border-b border-leather-100 mb-6">
                      <Heart className="h-5 w-5 text-leather-700" />
                      <h2 className="text-xl font-medium text-leather-800">Wishlist</h2>
                    </div>
                    
                    <div className="text-center py-8">
                      <p className="text-leather-600 mb-4">Your wishlist is empty.</p>
                      <Button 
                        className="bg-leather-700 hover:bg-leather-800"
                        onClick={() => window.location.href = '/products'}
                      >
                        Browse Products
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment">
                    <div className="flex items-center gap-3 pb-4 border-b border-leather-100 mb-6">
                      <CreditCard className="h-5 w-5 text-leather-700" />
                      <h2 className="text-xl font-medium text-leather-800">Payment Methods</h2>
                    </div>
                    
                    <div className="text-center py-8">
                      <p className="text-leather-600 mb-4">You don't have any saved payment methods yet.</p>
                      <Button className="bg-leather-700 hover:bg-leather-800">
                        Add Payment Method
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
