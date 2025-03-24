"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/stores/store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, MinusCircle, PlusCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const CartPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    items,
    total,
    itemCount,
    removeProduct,
    incrQuantity,
    decrQuantity,
    clearCart,
  } = useStore((state) => state);
  const { isAuthenticated } = useAuth();
  const handleCheckout = () => {
    setIsLoading(true);
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/auth/signin?redirect=/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {items.map((item) => (
                  <div key={item.$id} className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-0">
                    <div className="relative h-24 w-24 rounded overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.$id}`}>
                          <h3 className="font-medium hover:underline">{item.name}</h3>
                        </Link>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
                      </div>

                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => decrQuantity(item.$id)}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => incrQuantity(item.$id)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(item.$id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => clearCart()}>
                    Clear Cart
                  </Button>
                  <Link href="/">
                    <Button variant="ghost">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({itemCount})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;