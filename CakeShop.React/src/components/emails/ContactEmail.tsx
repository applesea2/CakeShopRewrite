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

interface ContactEmailProps {
    name: string;
    email: string;
    phone: string;
    comment: string;
}

export default function ContactEmail({
    name = '{{name}}',
    email = '{{email}}',
    phone = '{{phone}}',
    comment = '{{comment}}',
}: Partial<ContactEmailProps>) {
    return (
        <Html lang="en">
            <Head />
            <Body style={body}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Text style={shopName}>Jesse's Cakes</Text>
                        <Text style={badge}>New Contact Inquiry</Text>
                    </Section>

                    {/* Main content */}
                    <Section style={content}>
                        <Text style={heading}>You've received a new message!</Text>

                        <Hr style={divider} />

                        <Text style={sectionHeading}>Contact Details</Text>
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

                        <Text style={sectionHeading}>Message</Text>
                        <Text style={commentBox}>{comment}</Text>
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

const badge: React.CSSProperties = {
    display: 'inline-block',
    color: '#aa3bff',
    backgroundColor: '#ffffff',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    borderRadius: '20px',
    padding: '4px 14px',
    margin: '10px 0 0',
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

const commentBox: React.CSSProperties = {
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
