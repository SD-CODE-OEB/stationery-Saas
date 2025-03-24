"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/stores/store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Package, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '@/stores/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

// Helper function to get badge color based on status
export const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'processing':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  }
};



const OrdersPage = () => {
  const router = useRouter();
  const { $id: userId, getUserOrders } = useStore(state => state);
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin?redirect=/orders');
      return;
    }
    setOrders(getUserOrders(userId));
    setLoading(false);
  }, [userId, router, getUserOrders, isAuthenticated]);

  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <p>Loading your orders...</p>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (orders.length === 0) {
    return (
      <>
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6">
              You haven&apos;t placed any orders yet.
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
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <Card key={order.$id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Order placed: {order.createdAt.toLocaleString()}
                    </p>
                    <CardTitle className="text-lg font-semibold">
                      Order #{order.$id}
                    </CardTitle>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full inline-flex items-center justify-center font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-4 divide-y">
                  {order.items.map(item => (
                    <div key={item.$id} className="flex gap-4 py-4 first:pt-0">
                      <div className="relative h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <p>Quantity: {item.quantity}</p>
                          <p>${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/order/${order.$id}`)}
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {order.trackingNumber && (
                  <div className="mt-4 p-3 bg-muted/60 rounded-md flex items-center gap-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Tracking Number</p>
                      <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;