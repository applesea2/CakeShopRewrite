import React from 'react';
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Hr,
    Row,
    Column,
} from '@react-email/components';

interface OrderConfirmationEmailProps {
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

export default function OrderConfirmationEmail({
    name = '{{name}}',
    email = '{{email}}',
    phone = '{{phone}}',
    cakeType = '{{cakeType}}',
    cakeSize = '{{cakeSize}}',
    cakeFlavor = '{{cakeFlavor}}',
    frostingFlavor = '{{frostingFlavor}}',
    dateNeeded = '{{dateNeeded}}',
    specialInstructions = '{{specialInstructions}}',
}: Partial<OrderConfirmationEmailProps>) {
    return (
        <Html lang="en">
            <Head />
            <Body style={body}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Text style={shopName}>Jesse's Cakes</Text>
                        <Text style={shopTagline}>Homemade with love</Text>
                    </Section>

                    {/* Main content */}
                    <Section style={content}>
                        <Text style={heading}>Your Order Has Been Received!</Text>
                        <Text style={paragraph}>Hi {name},</Text>
                        <Text style={paragraph}>
                            Thank you for your order! We've received your request and will be in
                            touch at our earliest convenience to confirm the details.
                        </Text>

                        <Hr style={divider} />

                        <Text style={sectionHeading}>Your Details</Text>
                        <Row style={row}>
                            <Column style={labelCol}>Name</Column>
                            <Column style={valueCol}>{name}</Column>
                        </Row>
                        <Row style={row}>
                            <Column style={labelCol}>Email</Column>
                            <Column style={valueCol}>{email}</Column>
                        </Row>
                        <Row style={row}>
                            <Column style={labelCol}>Phone</Column>
                            <Column style={valueCol}>{phone}</Column>
                        </Row>

                        <Hr style={divider} />

                        <Text style={sectionHeading}>Order Details</Text>
                        <Row style={row}>
                            <Column style={labelCol}>Cake Type</Column>
                            <Column style={valueCol}>{cakeType}</Column>
                        </Row>
                        <Row style={row}>
                            <Column style={labelCol}>Cake Size</Column>
                            <Column style={valueCol}>{cakeSize}</Column>
                        </Row>
                        <Row style={row}>
                            <Column style={labelCol}>Cake Flavor</Column>
                            <Column style={valueCol}>{cakeFlavor}</Column>
                        </Row>
                        <Row style={row}>
                            <Column style={labelCol}>Frosting Flavor</Column>
                            <Column style={valueCol}>{frostingFlavor}</Column>
                        </Row>
                        <Row style={row}>
                            <Column style={labelCol}>Date Needed</Column>
                            <Column style={valueCol}>{dateNeeded}</Column>
                        </Row>

                        <Hr style={divider} />

                        <Text style={sectionHeading}>Special Instructions</Text>
                        <Text style={instructionsBox}>{specialInstructions}</Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            We'll be in touch at our earliest convenience. If you have any
                            questions feel free to reply to this email.
                        </Text>
                        <Text style={footerBrand}>Jesse's Cakes</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

const body: React.CSSProperties = {
    backgroundColor: '#FAF6F0',
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    margin: 0,
    padding: '32px 0',
};

const container: React.CSSProperties = {
    maxWidth: '580px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
};

const header: React.CSSProperties = {
    backgroundColor: '#aa3bff',
    padding: '32px 40px',
    textAlign: 'center',
};

const shopName: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: '600',
    margin: '0',
    letterSpacing: '-0.5px',
};

const shopTagline: React.CSSProperties = {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    margin: '4px 0 0',
};

const content: React.CSSProperties = {
    padding: '32px 40px',
};

const heading: React.CSSProperties = {
    color: '#08060d',
    fontSize: '22px',
    fontWeight: '600',
    margin: '0 0 16px',
    letterSpacing: '-0.3px',
};

const paragraph: React.CSSProperties = {
    color: '#6b6375',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 12px',
};

const sectionHeading: React.CSSProperties = {
    color: '#08060d',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    margin: '16px 0 8px',
};

const row: React.CSSProperties = {
    marginBottom: '6px',
};

const labelCol: React.CSSProperties = {
    color: '#6b6375',
    fontSize: '14px',
    width: '140px',
    verticalAlign: 'top',
    paddingRight: '12px',
};

const valueCol: React.CSSProperties = {
    color: '#08060d',
    fontSize: '14px',
    fontWeight: '500',
    verticalAlign: 'top',
};

const instructionsBox: React.CSSProperties = {
    backgroundColor: '#FAF6F0',
    borderRadius: '6px',
    padding: '12px 16px',
    color: '#6b6375',
    fontSize: '14px',
    lineHeight: '1.6',
    margin: '0',
    borderLeft: '3px solid #aa3bff',
};

const divider: React.CSSProperties = {
    borderColor: '#e5e4e7',
    margin: '24px 0',
};

const footer: React.CSSProperties = {
    backgroundColor: '#FAF6F0',
    padding: '24px 40px',
    borderTop: '1px solid #e5e4e7',
    textAlign: 'center',
};

const footerText: React.CSSProperties = {
    color: '#6b6375',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0 0 8px',
};

const footerBrand: React.CSSProperties = {
    color: '#aa3bff',
    fontSize: '13px',
    fontWeight: '600',
    margin: '0',
};
