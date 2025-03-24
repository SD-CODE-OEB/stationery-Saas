"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/stores/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/stores/orderSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ChevronLeft, Truck, CreditCard, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Helper function to get badge color based on status (reused from orders page)
const getStatusColor = (status: OrderStatus) => {
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


const OrderDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const orderId = params.id as string;
    const { getOrderById } = useStore(state => state);
    const { isAuthenticated } = useAuth();
    const [order, setOrder] = React.useState<Order | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/signin?redirect=/order/' + orderId);
            return;
        }

        // In a real app, fetch specific order from API
        if (!orderId) {
            setError('Order ID not provided');
            setLoading(false);
            return;
        } else {
            const fetchedOrder = getOrderById(orderId);
            setOrder(fetchedOrder || null);
        }

        setLoading(false);
    }, [isAuthenticated, orderId, router, getOrderById]);

    if (loading) {
        return (
            <>
                <div className="container mx-auto px-4 py-8 flex justify-center">
                    <p>Loading order details...</p>
                </div>
            </>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    if (error || !order) {
        return (
            <>
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="h-16 w-16 text-destructive mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Order not found</h2>
                        <p className="text-muted-foreground mb-6">
                            {error || "This order does not exist or you may not have permission to view it."}
                        </p>
                        <Link href="/orders">
                            <Button>
                                Back to Orders
                            </Button>
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const renderOrderTimeline = () => {
        const steps = [
            { status: 'pending', label: 'Order Placed', icon: <Clock className="h-5 w-5" /> },
            { status: 'processing', label: 'Processing', icon: <CreditCard className="h-5 w-5" /> },
            { status: 'shipped', label: 'Shipped', icon: <Package className="h-5 w-5" /> },
            { status: 'delivered', label: 'Delivered', icon: <CheckCircle className="h-5 w-5" /> },
        ];

        // Get the current step index based on order status
        const currentStepIndex = steps.findIndex(step => step.status === order.status);
        if (currentStepIndex === -1) return null; // If cancelled or other status

        return (
            <div className="relative mt-8 mb-12">
                <div className="absolute left-0 right-0 top-[24px] border-t border-gray-200 dark:border-gray-700" />
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const isActive = index <= currentStepIndex;
                        return (
                            <div key={step.status} className="flex flex-col items-center">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {step.icon}
                                </div>
                                <span className={`mt-2 text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Button variant="ghost" onClick={() => router.push('/orders')} className="mb-2">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Button>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold">Order #{order.$id}</h1>
                            <p className="text-sm text-muted-foreground">
                                Placed on {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                            </p>
                        </div>
                        <span className={`text-sm px-3 py-1 rounded-full inline-flex items-center justify-center font-medium ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Show order status timeline for non-cancelled orders */}
                {order.status !== 'cancelled' && renderOrderTimeline()}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Order Items - Takes up 2 columns on large screens */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 divide-y">
                                    {order.items.map(item => (
                                        <div key={item.$id} className="flex gap-4 py-4 first:pt-0">
                                            <div className="relative h-20 w-20 rounded overflow-hidden bg-muted flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-medium">{item.name}</h3>
                                                <div className="text-sm text-muted-foreground">
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>${item.price.toFixed(2)} each</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">${item.subtotal?.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tracking Information */}
                        {order.trackingNumber && (
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-2">
                                    <Truck className="h-5 w-5 text-muted-foreground" />
                                    <CardTitle>Shipping Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-4 bg-muted/60 rounded-md">
                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-medium">Tracking Number</p>
                                                <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                                            </div>
                                            {order.status === 'shipped' && (
                                                <Button size="sm" variant="outline" onClick={() => window.open(`https://example.com/track/${order.trackingNumber}`, '_blank')}>
                                                    Track Package
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Order Information - Takes up 1 column on large screens */}
                    <div className="space-y-6">
                        {/* Shipping Address */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Shipping Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <address className="not-italic">
                                    <p>{order.shippingAddress.street}</p>
                                    <p>
                                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                                    </p>
                                    <p>{order.shippingAddress.country}</p>
                                </address>
                            </CardContent>
                        </Card>

                        {/* Payment Information */}
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-2">
                                <CreditCard className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Payment Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="capitalize font-medium">
                                    {order.paymentInfo.method.replace('_', ' ')}
                                </p>
                                {order.paymentInfo.transactionId && (
                                    <p className="text-sm text-muted-foreground">
                                        Transaction ID: {order.paymentInfo.transactionId}
                                    </p>
                                )}
                                <p className="text-sm mt-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.paymentInfo.status === 'completed'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                        {order.paymentInfo.status.charAt(0).toUpperCase() + order.paymentInfo.status.slice(1)}
                                    </span>
                                </p>
                            </CardContent>
                        </Card>

                        {/* Help & Support */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Need Help?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm">
                                    If you have any questions or issues with your order, our support team is here to help.
                                </p>
                                <Button variant="outline" className="w-full">
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderDetailsPage;
