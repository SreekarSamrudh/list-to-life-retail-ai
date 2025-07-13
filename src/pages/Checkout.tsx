import React from 'react';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useCart } from '@/hooks/useCart';
import { Link }
from 'react-router-dom';

const Checkout = () => {
    const { cartItems, subtotal, tax, total } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Add your shipping form here */}
                                <p>Shipping form will go here.</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button variant="hero" size="lg" className="w-full">
                                    Place Order
                                </Button>
                                <div className="text-center">
                                    <Link to="/cart">
                                        <Button variant="outline" className="w-full">
                                            Back to Cart
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
