'use client';

// ✅ CLIENT COMPONENT — 'use client' at the very top
// This component receives serializable initialTodos from the Server Component parent.
// It manages client-side interactivity (useState, toggling, filtering) without re-fetching data.

import { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [showCompleted, setShowCompleted] = useState(true);

  // Toggle todo completion locally in client state
  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filtered = todos.filter((todo) => showCompleted || !todo.completed);

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: '32px',
        boxShadow: 'var(--shadow)',
        marginTop: '24px',
      }}
    >
      {/* Header and Toggle Control */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '20px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>
          Todo Items ({filtered.length})
        </h2>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'var(--text-muted)',
            fontWeight: 500,
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            style={{
              width: '16px',
              height: '16px',
              accentColor: 'var(--accent)',
              cursor: 'pointer',
            }}
          />
          Show completed
        </label>
      </div>

      {/* Todo List */}
      {filtered.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            padding: '24px 0',
            fontSize: '14px',
          }}
        >
          No todos found. Try checking &quot;Show completed&quot;!
        </p>
      ) : (
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {filtered.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 18px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--green)',
                  cursor: 'pointer',
                }}
              />
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: todo.completed ? 'var(--text-muted)' : 'var(--text)',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  transition: 'color 0.2s, text-decoration 0.2s',
                  lineHeight: 1.4,
                }}
              >
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
