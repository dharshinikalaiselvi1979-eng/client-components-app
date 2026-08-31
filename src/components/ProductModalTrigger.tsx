'use client';

import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
  category: string;
}

export default function ProductModalTrigger({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);

  // Simulated static specifications passed to client
  const specs: Record<number, string[]> = {
    1: ['16GB Unified Memory', '512GB SSD Storage', 'Apple M3 Chip', '18-hour battery life'],
    2: ['6.7-inch Super Retina XDR display', 'Pro camera system', 'A17 Pro chip with 6-core GPU', 'USB-C support'],
    3: ['11-inch Liquid Retina display', 'M2 chip', '128GB Storage', 'Wi-Fi 6E support'],
    4: ['Active Noise Cancellation', 'Transparency mode', 'Personalized Spatial Audio', 'Up to 20 hours battery'],
    5: ['Always-On Retina display', 'S9 SiP processor', 'Double tap gesture', 'Blood Oxygen app'],
    6: ['24.2MP CMOS sensor', '4K UHD video recording', '3-inch vari-angle touchscreen', 'Wi-Fi/Bluetooth'],
  };

  const productSpecs = specs[product.id] || ['Premium Build Quality', '1-Year Warranty Included'];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '10px 14px',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '13px',
          transition: 'all 0.2s',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--text)';
          e.currentTarget.style.borderColor = 'var(--accent)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        🔍 Specs
      </button>

      {/* Glassmorphism Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 5, 8, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
              padding: '32px',
              position: 'relative',
              animation: 'fadeIn 0.2s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            {/* Header info */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '48px' }}>{product.emoji}</span>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: 'var(--accent-glow)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--accent-2)',
                    marginBottom: '6px',
                  }}
                >
                  {product.category}
                </span>
                <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                  {product.name}
                </h2>
              </div>
            </div>

            {/* Spec list */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Specifications
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {productSpecs.map((spec, i) => (
                  <li key={i} style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent)' }}>✦</span> {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Add to Cart wrapper */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border)',
                paddingTop: '20px',
                marginTop: '20px',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>Price</span>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-2)' }}>${product.price}</span>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  // Simulates click on parent's cart action by dispatching a custom event
                  const cartBtn = document.getElementById(`cart-btn-${product.id}`);
                  if (cartBtn) cartBtn.click();
                }}
                style={{
                  padding: '10px 20px',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
