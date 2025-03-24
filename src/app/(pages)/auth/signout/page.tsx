"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const SignOutPage = () => {
  const router = useRouter();
  const { logout, isLoading, isAuthenticated } = useAuth();

  React.useEffect(() => {
    // If the user is already logged out, redirect to home
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSignOut = async () => {
    if (isLoading) {
      return;
    }
    logout();
  };

  const handleCancel = () => {
    router.back();
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center">
                <LogOut className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Sign Out</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-center text-muted-foreground">
              Are you sure you want to sign out? You will need to sign in again to access your account.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleSignOut}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SignOutPage;