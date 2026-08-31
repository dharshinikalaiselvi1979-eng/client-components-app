'use client';

// ✅ CLIENT COMPONENT — 'use client' is at the very top
// This is marked as a Client Component because it:
//   1. Uses React's useState hook
//   2. Has an onClick event handler
//   3. Needs to respond to user interaction in the browser

import { useState } from 'react';
import { useCart } from './CartContext';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  productPrice: number;
}

export default function AddToCartButton({
  productId,
  productName,
  productPrice,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleClick = () => {
    setAdded(true);
    addToCart({ id: productId, name: productName, price: productPrice });
    console.log(`Added ${productName} (id: ${productId}) to cart`);
    
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: '100%',
        padding: '10px 16px',
        backgroundColor: added ? '#22c55e' : '#6366f1',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px',
        fontFamily: 'inherit',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        boxShadow: added
          ? '0 4px 12px rgba(34, 197, 94, 0.3)'
          : '0 4px 12px rgba(99, 102, 241, 0.3)',
        transform: added ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {added ? '✓ Added!' : '🛒 Add to Cart'}
    </button>
  );
}

