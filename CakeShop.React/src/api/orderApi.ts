const BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`;

export interface OrderRequest {
    name: string;
    email: string;
    phone: string;
    cakeType: string;
    cakeSize: string;
    cakeFlavor: string;
    frostingFlavor: string;
    dateNeeded: string;
    specialInstructions: string;
}

export async function sendOrderRequest(request: OrderRequest): Promise<void> {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to submit order');
}
