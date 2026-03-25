import type { CakeSize, FrostingOption } from '../types/options';

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1`;

export async function getCakeSizes(): Promise<CakeSize[]> {
    const response = await fetch(`${BASE_URL}/options/sizes`);
    if (!response.ok) throw new Error('Failed to fetch cake sizes');
    return response.json();
}

export async function getFrostingOptions(): Promise<FrostingOption[]> {
    const response = await fetch(`${BASE_URL}/options/frostings`);
    if (!response.ok) throw new Error('Failed to fetch frosting options');
    return response.json();
}
