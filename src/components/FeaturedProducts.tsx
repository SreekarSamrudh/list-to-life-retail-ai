import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ProductCard from './ProductCard';
import { supabase } from '../integrations/supabase/client';

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
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: productsData, error } = await supabase
          .from('products')
          .select('*')
          .limit(8);

        if (error) {
          console.error('Error fetching products:', error);
          setProducts(featuredProducts); // Fallback to mock data
          return;
        }

        // Fetch inventory data for stock levels
        const { data: inventoryData } = await supabase
          .from('inventory')
          .select('product_id, current_stock')
          .in('product_id', productsData?.map(p => p.product_id) || []);

        // Transform data to match expected format
        const transformedProducts = productsData?.map(product => ({
          id: product.product_id,
          name: product.product_name,
          description: product.description,
          price: product.price,
          image: product.image_url,
          stock: inventoryData?.find(inv => inv.product_id === product.product_id)?.current_stock || 0,
          category: product.category,
          aisle: 'Aisle 1', // Default for now
          rating: 4.5,
          reviews: 50
        })) || [];

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Error:', error);
        setProducts(featuredProducts); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Loading products...
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="bg-muted h-48 rounded-lg mb-4"></div>
                <div className="bg-muted h-4 rounded mb-2"></div>
                <div className="bg-muted h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;