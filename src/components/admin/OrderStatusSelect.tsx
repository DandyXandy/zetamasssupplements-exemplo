'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const OPTIONS = ['pendiente', 'en_revision', 'aprobado', 'rechazado'];

export function OrderStatusSelect({
  orderId,
  status,
  className,
}: {
  orderId: string;
  status: string;
  className: string;
}) {
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(next: string) {
    setValue(next);
    setSaving(true);
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    setSaving(false);
    router.refresh();
  }

  return (
    <select
      value={value}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value)}
      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold capitalize outline-none ${className}`}
    >
      {OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {opt.replace('_', ' ')}
        </option>
      ))}
    </select>
  );
}
