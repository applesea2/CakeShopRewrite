import type { MenuItem } from '../types/menu';

const BASE_URL = '/api/v1';

export async function getMenuItems(): Promise<MenuItem[]> {
    const response = await fetch(`${BASE_URL}/menu`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    return response.json();
}

export async function getMenuItemById(id: number): Promise<MenuItem> {
    const response = await fetch(`${BASE_URL}/menu/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    return response.json();
}

