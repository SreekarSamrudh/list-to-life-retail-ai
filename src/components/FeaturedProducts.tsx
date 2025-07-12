import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ProductCard from './ProductCard';

// Mock product data
const featuredProducts = [
  {
    id: '1',
    name: 'Samsung 55" 4K Smart TV',
    description: 'Crystal UHD display with HDR technology for stunning picture quality',
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
    description: 'Wireless earbuds with active noise cancellation',
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
    description: 'Classic blue denim jacket with medium fit',
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

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Discover our top picks and trending items
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;