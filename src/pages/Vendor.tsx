import React, { useState } from 'react';
import { Store, Package, TrendingUp, DollarSign, Edit, AlertTriangle } from 'lucide-react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

// Mock vendor products data
const mockProducts = [
  {
    id: '1',
    name: 'Samsung 55" 4K Smart TV',
    price: 499.99,
    stock: 15,
    category: 'Electronics',
    aisle: 'Aisle 10',
    sales: 24,
    revenue: 11999.76
  },
  {
    id: '2',
    name: 'Apple AirPods Pro',
    price: 199.99,
    stock: 8,
    category: 'Electronics',
    aisle: 'Aisle 10',
    sales: 45,
    revenue: 8999.55
  },
  {
    id: '3',
    name: 'HP Pavilion Laptop',
    price: 799.99,
    stock: 3,
    category: 'Electronics',
    aisle: 'Aisle 10',
    sales: 12,
    revenue: 9599.88
  },
  {
    id: '4',
    name: 'Men\'s Denim Jacket',
    price: 39.99,
    stock: 25,
    category: 'Clothing',
    aisle: 'Aisle 5',
    sales: 18,
    revenue: 719.82
  }
];

const Vendor = () => {
  const [products, setProducts] = useState(mockProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStock, setNewStock] = useState<string>('');

  const handleStockUpdate = (productId: string, stock: number) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, stock }
          : product
      )
    );
    setEditingId(null);
    setNewStock('');
    
    // TODO: Update stock in database and trigger stock_engine.py
    console.log(`Updated stock for product ${productId} to ${stock}`);
  };

  const totalRevenue = products.reduce((sum, product) => sum + product.revenue, 0);
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const lowStockCount = products.filter(product => product.stock < 10).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Store className="h-8 w-8 text-primary" />
            Vendor Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your inventory and track performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold text-success">{totalSales}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-secondary">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                  <p className="text-2xl font-bold text-warning">{lowStockCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Product</th>
                    <th className="text-left py-3 px-2 font-semibold">Price</th>
                    <th className="text-left py-3 px-2 font-semibold">Stock</th>
                    <th className="text-left py-3 px-2 font-semibold">Category</th>
                    <th className="text-left py-3 px-2 font-semibold">Aisle</th>
                    <th className="text-left py-3 px-2 font-semibold">Sales</th>
                    <th className="text-left py-3 px-2 font-semibold">Revenue</th>
                    <th className="text-left py-3 px-2 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-2">
                        <div>
                          <p className="font-medium">{product.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-semibold">${product.price}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          {editingId === product.id ? (
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                value={newStock}
                                onChange={(e) => setNewStock(e.target.value)}
                                className="w-20"
                                placeholder={product.stock.toString()}
                              />
                              <Button
                                size="sm"
                                onClick={() => handleStockUpdate(product.id, parseInt(newStock) || product.stock)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingId(null);
                                  setNewStock('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span className={product.stock < 10 ? 'text-warning font-bold' : ''}>
                                {product.stock}
                              </span>
                              {product.stock < 10 && (
                                <Badge variant="secondary" className="bg-warning text-warning-foreground">
                                  Low
                                </Badge>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="py-4 px-2 text-muted-foreground">
                        {product.aisle}
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-medium">{product.sales}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-semibold text-success">
                          ${product.revenue.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        {editingId !== product.id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(product.id);
                              setNewStock(product.stock.toString());
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit Stock
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Vendor;