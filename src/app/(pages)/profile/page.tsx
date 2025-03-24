"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/stores/store';
import { useRouter } from 'next/navigation';
import { Order } from '@/stores/orderSlice';
import { getStatusColor } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Package, User, LogOut, Settings, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
const ProfilePage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const { $id, name, email, getUserOrders } = useStore((state) => state);
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin?redirect=/profile');
    } else if ($id) {
      setOrders(getUserOrders($id) as Order[]);
    }
  }, [isAuthenticated, router, $id, getUserOrders]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-primary">
                    <div className="bg-muted h-full w-full flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-center">{name}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">{email}</p>
                  <p className="text-sm text-muted-foreground text-center">Account ID: {$id}</p>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/orders')}
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Orders
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={() => router.push('/auth/signout')}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-center py-12">
                  {isAuthenticated && orders.length === 0 ?
                    <>
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Your recent orders will appear here.
                      </p>
                    </> :
                    <Card className="overflow-hidden">
                      <CardHeader className="bg-muted/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">
                              Order placed: {orders[0].createdAt?.toLocaleString()}
                            </p>
                            <CardTitle className="text-lg font-semibold">
                              Order #{orders[0].$id}
                            </CardTitle>
                          </div>

                          <div className="flex flex-col sm:items-end gap-2">
                            <span className={`text-xs px-3 py-1 rounded-full inline-flex items-center justify-center font-medium ${getStatusColor(orders[0].status)}`}>
                              {orders[0].status.charAt(0).toUpperCase() + orders[0].status.slice(1)}
                            </span>
                            <p className="font-semibold">${orders[0].total.toFixed(2)}</p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6">
                        <div className="space-y-4 divide-y">
                          {orders[0].items.map(item => (
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

                        {orders[0].status !== 'cancelled' && orders[0].status !== 'delivered' && (
                          <div className="mt-6 flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/order/${orders[0].$id}`)}
                            >
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        )}

                        {orders[0].trackingNumber && (
                          <div className="mt-4 p-3 bg-muted/60 rounded-md flex items-center gap-2">
                            <Package className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Tracking Number</p>
                              <p className="text-sm text-muted-foreground">{orders[0].trackingNumber}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  }

                  <Link href="/orders">
                    <Button>View All Orders</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Personal Details</h3>
                  <p className="mt-1">{name}</p>
                  <p>{email}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Default Shipping Address</h3>
                  <p className="mt-1 text-muted-foreground italic">No address saved yet</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Methods</h3>
                  <p className="mt-1 text-muted-foreground italic">No payment methods saved yet</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" size="sm">Edit Information</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
