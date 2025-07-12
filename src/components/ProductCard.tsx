import React from 'react';
import { Star, ShoppingCart, Heart, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  aisle?: string;
  rating?: number;
  reviews?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  stock,
  category,
  aisle,
  rating = 4.5,
  reviews = 0
}) => {
  const isLowStock = stock < 10;
  const isOutOfStock = stock === 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/10 hover:border-primary/30">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isLowStock && !isOutOfStock && (
          <Badge variant="secondary" className="absolute top-2 left-2 bg-warning text-warning-foreground">
            Low Stock
          </Badge>
        )}
        {isOutOfStock && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          {aisle && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1" />
              {aisle}
            </div>
          )}
        </div>

        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? 'text-warning fill-warning'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {stock} in stock
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            variant="cart"
            className="flex-1"
            disabled={isOutOfStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;