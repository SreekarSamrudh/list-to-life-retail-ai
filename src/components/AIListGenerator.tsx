import React, { useState } from 'react';
import { Brain, Sparkles, ShoppingCart, Loader2, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface AIListItem {
  name: string;
  quantity: number;
  price: number;
  stock: number;
  reason?: string;
}

interface AIListResponse {
  items: AIListItem[];
  total: number;
  suggestions: string[];
  preferences: any;
}

const AIListGenerator = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateList = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Mock AI response for now - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse: AIListResponse = {
        items: [
          {
            name: 'Ground Turkey',
            quantity: 2,
            price: 5.99,
            stock: 40,
            reason: 'Lean protein for healthy tacos'
          },
          {
            name: 'Taco Shells',
            quantity: 1,
            price: 2.49,
            stock: 60,
            reason: 'Hard shell tacos as requested'
          },
          {
            name: 'Salsa',
            quantity: 1,
            price: 3.29,
            stock: 50,
            reason: 'Medium heat salsa for flavor'
          },
          {
            name: 'Avocados',
            quantity: 3,
            price: 1.99,
            stock: 120,
            reason: 'Fresh avocados for guacamole'
          },
          {
            name: 'Shredded Cheese',
            quantity: 1,
            price: 4.99,
            stock: 30,
            reason: 'Mexican blend cheese'
          }
        ],
        total: 18.75,
        suggestions: [
          'Add lime for fresh flavor',
          'Consider sour cream for toppings',
          'Tortilla chips for appetizers'
        ],
        preferences: {}
      };
      
      setResponse(mockResponse);
    } catch (err) {
      setError('Failed to generate list. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addAllToCart = () => {
    // TODO: Implement add all to cart
    console.log('Adding all items to cart:', response?.items);
  };

  const addItemToCart = (item: AIListItem) => {
    // TODO: Implement add single item to cart
    console.log('Adding item to cart:', item);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary-light/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Brain className="h-4 w-4" />
          AI-Powered List Generation
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Tell us your plans, we'll create your list
        </h2>
        <p className="text-muted-foreground">
          Our AI assistant understands your needs and creates personalized shopping lists with real-time inventory
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="e.g., Plan a taco night for 4 people, Healthy meal prep for the week, Birthday party for kids..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-lg py-3"
                onKeyPress={(e) => e.key === 'Enter' && generateList()}
              />
            </div>
            <Button 
              onClick={generateList} 
              disabled={!query.trim() || loading}
              variant="hero"
              size="lg"
              className="px-8"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Generate List
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Example Prompts */}
      {!response && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Try these examples:</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Plan a taco night for 4 people',
              'Healthy meal prep for the week',
              'Birthday party for 8-year-old',
              'Weekend BBQ with friends',
              'Back-to-school supplies',
              'Date night dinner at home'
            ].map((example) => (
              <Button
                key={example}
                variant="outline"
                size="sm"
                onClick={() => setQuery(example)}
                className="text-sm"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="mb-8 border-destructive">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-destructive">
              <MessageCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {response && (
        <div className="space-y-6">
          {/* List Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Your AI-Generated Shopping List
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on: "{query}"
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ${response.total.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {response.items.length} items
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button onClick={addAllToCart} variant="hero" className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart (${response.total.toFixed(2)})
              </Button>
            </CardContent>
          </Card>

          {/* Items List */}
          <div className="grid gap-4">
            {response.items.map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant="outline">Qty: {item.quantity}</Badge>
                        {item.stock < 20 && (
                          <Badge variant="secondary" className="bg-warning text-warning-foreground">
                            Low Stock
                          </Badge>
                        )}
                      </div>
                      {item.reason && (
                        <p className="text-sm text-muted-foreground mb-2">
                          💡 {item.reason}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {item.stock} in stock
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() => addItemToCart(item)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Suggestions */}
          {response.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {response.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-secondary">•</span>
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default AIListGenerator;