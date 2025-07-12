import React, { useState } from 'react';
import { Package, Calendar, DollarSign, Search } from 'lucide-react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    created_at: '2024-01-15T10:30:00Z',
    total: 549.97,
    status: 'delivered',
    products: [
      { id: '1', name: 'Samsung 55" 4K Smart TV', price: 499.99, quantity: 1 },
      { id: '2', name: 'HDMI Cable', price: 19.99, quantity: 2 },
      { id: '3', name: 'TV Mount', price: 29.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-002',
    created_at: '2024-01-10T14:20:00Z',
    total: 224.97,
    status: 'shipped',
    products: [
      { id: '4', name: 'Apple AirPods Pro', price: 199.99, quantity: 1 },
      { id: '5', name: 'Phone Case', price: 24.98, quantity: 1 }
    ]
  },
  {
    id: 'ORD-003',
    created_at: '2024-01-05T09:15:00Z',
    total: 89.96,
    status: 'delivered',
    products: [
      { id: '6', name: 'Men\'s Denim Jacket', price: 39.99, quantity: 1 },
      { id: '7', name: 'Cotton T-Shirt', price: 24.99, quantity: 2 }
    ]
  }
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedStatus === 'all' || order.status === selectedStatus)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-success-foreground';
      case 'shipped': return 'bg-primary text-primary-foreground';
      case 'processing': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Package className="h-8 w-8 text-primary" />
            Order History
          </h1>
          <p className="text-muted-foreground">
            Track your purchases and order details
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order {order.id}</CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <p className="text-lg font-bold text-primary mt-2 flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Products Purchased:</h3>
                  <div className="space-y-3">
                    {order.products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${(product.price * product.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Try adjusting your search criteria' : 'You haven\'t placed any orders yet'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;