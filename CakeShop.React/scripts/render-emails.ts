import { render } from '@react-email/render';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import React from 'react';

import OrderConfirmationEmail from '../src/components/emails/OrderConfirmationEmail.tsx';
import OrderNotificationEmail from '../src/components/emails/OrderNotificationEmail.tsx';
import ContactEmail from '../src/components/emails/ContactEmail.tsx';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../../CakeShop.Service/EmailTemplates');

async function renderTemplate(component: React.ReactElement, filename: string) {
    const html = await render(component);
    const outPath = resolve(outDir, filename);
    writeFileSync(outPath, html, 'utf-8');
    console.log(`  ✓ ${filename}`);
}

console.log('Rendering email templates...');

await renderTemplate(
    React.createElement(OrderConfirmationEmail, {}),
    'OrderConfirmation.html'
);

await renderTemplate(
    React.createElement(OrderNotificationEmail, {}),
    'OrderNotification.html'
);

await renderTemplate(
    React.createElement(ContactEmail, {}),
    'Contact.html'
);

console.log('Done. Templates written to CakeShop.Service/EmailTemplates/');
