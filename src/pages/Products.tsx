import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// Mock product data
const allProducts = [
  {
    id: '1',
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD display with HDR technology',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1593305841991-2b567f6b6d7e?w=400&h=400&fit=crop',
    stock: 15,
    category: 'Electronics',
    aisle: 'Aisle 10',
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Apple AirPods Pro',
    description: 'Wireless earbuds with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1600294037681-c80e0417681c?w=400&h=400&fit=crop',
    stock: 30,
    category: 'Electronics',
    aisle: 'Aisle 10',
    rating: 4.8,
    reviews: 256
  },
  {
    id: '3',
    name: 'Men\'s Denim Jacket',
    description: 'Classic blue denim jacket',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601333118714-7f7380b28f10?w=400&h=400&fit=crop',
    stock: 8,
    category: 'Clothing',
    aisle: 'Aisle 5',
    rating: 4.2,
    reviews: 64
  },
  {
    id: '4',
    name: 'HP Pavilion Laptop',
    description: '16GB RAM, 512GB SSD, Intel i5',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1587613750950-9e5b7c8ae0e9?w=400&h=400&fit=crop',
    stock: 12,
    category: 'Electronics',
    aisle: 'Aisle 10',
    rating: 4.3,
    reviews: 89
  },
  {
    id: '5',
    name: 'Women\'s Athletic Leggings',
    description: 'High-waisted, stretchable fabric',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1575052814086-f9e4d0eb1370?w=400&h=400&fit=crop',
    stock: 75,
    category: 'Clothing',
    aisle: 'Aisle 5',
    rating: 4.6,
    reviews: 142
  },
  {
    id: '6',
    name: 'Organic Whole Milk',
    description: '1-gallon jug of fresh organic milk',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop',
    stock: 200,
    category: 'Groceries',
    aisle: 'Aisle 8',
    rating: 4.6,
    reviews: 89
  }
];

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', 'Electronics', 'Clothing', 'Groceries', 'Home'];

  const filteredProducts = allProducts
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
          <p className="text-muted-foreground">
            Discover our complete product catalog with AI-powered recommendations
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{filteredProducts.length} products found</span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search criteria or browse our categories</p>
            </div>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;