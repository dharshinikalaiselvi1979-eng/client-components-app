import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import CartIcon from '@/components/CartIcon';

export const metadata: Metadata = {
  title: 'Client Components Demo | Next.js',
  description:
    'Demonstrating when to use the use client directive in Next.js App Router — keeping client boundaries small for optimal bundle size.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <nav
            style={{
              borderBottom: '1px solid var(--border)',
              padding: '0 2rem',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(10, 10, 15, 0.85)',
              backdropFilter: 'blur(12px)',
              position: 'sticky',
              top: 0,
              zIndex: 100,
            }}
          >
            <a
              href="/"
              style={{
                fontWeight: 800,
                fontSize: '18px',
                background: 'linear-gradient(135deg, #6366f1, #818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              ⚡ ClientDemo
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { href: '/', label: 'Home' },
                  { href: '/products', label: 'Products' },
                  { href: '/todos', label: 'Todos' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--text-muted)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <CartIcon />
            </div>
          </nav>

          <main>{children}</main>

          <footer
            style={{
              borderTop: '1px solid var(--border)',
              padding: '24px 2rem',
              textAlign: 'center',
              fontSize: '13px',
              color: 'var(--text-muted)',
              marginTop: '80px',
            }}
          >
            Next.js Client Component Boundaries Demo — use client only where needed
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

