const BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`;

export interface ContactRequest {
    name: string;
    email: string;
    phone: string;
    comment: string;
}

export async function sendContactEmail(request: ContactRequest): Promise<void> {
    const response = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to send message');
}
