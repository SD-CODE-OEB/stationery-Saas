"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/stores/store';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Package, User, LogOut, Settings } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ProfilePage = () => {
  const router = useRouter();

  const { isLoggedIn, _id, name, email, avatar } = useStore((state) => state);

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/signin?redirect=/profile');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
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
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={name || 'User'}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-muted h-full w-full flex items-center justify-center">
                        <User className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-center">{name}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground text-center">{email}</p>
                  <p className="text-sm text-muted-foreground text-center">Account ID: {_id}</p>
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
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Your recent orders will appear here.
                  </p>
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
