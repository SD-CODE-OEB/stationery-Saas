"use client";

import { z } from 'zod';
import React from 'react';
import Link from 'next/link';
// import useStore from '@/stores/store';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;


const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const [showPassword, setShowPassword] = React.useState(false);

  const { isAuthenticated, login, loginIsLoading, error: authError } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  React.useEffect(() => {
    if (isAuthenticated) {
      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, redirectTo, router]);
  const onSubmit = async (data: FormValues) => {
    login({ email: data.email, password: data.password });
  };

  return (
    isAuthenticated ? (
      <div className='container flex justify-center items-center w-full'>
        <Skeleton className='w-60 h-full' />
      </div>
    ) : (
      <>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              {authError && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-md text-sm">
                  {authError}
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            type="email"
                            autoComplete="email"
                            disabled={loginIsLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              disabled={loginIsLoading}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={loginIsLoading}>
                    {loginIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              <div className="text-sm text-center text-muted-foreground">
                Don&apos;t have an account yet?{' '}
                <Link
                  href={`/auth/signup${redirectTo !== '/' ? `?redirect=${redirectTo}` : '/'}`}
                  className="text-primary hover:underline"
                >
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </>
    )
  );
};



export default SignInPage;