'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
    router.refresh();
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-xs">
        <button type="button" onClick={handleDelete} className="font-semibold text-red-600">
          Confirmar
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="text-tinta/40">
          Cancelar
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label="Eliminar producto"
      className="text-tinta/30 hover:text-red-500"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
