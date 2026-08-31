'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

export default function CartIcon() {
  const { cart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '8px 16px',
          color: 'var(--text)',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
        }}
      >
        <span>🛒</span>
        <span>Cart</span>
        {cart.length > 0 && (
          <span
            style={{
              background: 'var(--accent)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '50%',
              lineHeight: 1,
            }}
          >
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '46px',
            right: 0,
            width: '280px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            padding: '16px',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '8px',
            }}
          >
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Your Cart</h3>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px 0' }}>
              Your cart is empty.
            </p>
          ) : (
            <>
              <div
                style={{
                  maxHeight: '180px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {cart.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>{item.name}</span>
                    <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>${item.price}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                <span>Total:</span>
                <span style={{ color: 'var(--accent-2)' }}>
                  ${cart.reduce((sum, item) => sum + item.price, 0)}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
