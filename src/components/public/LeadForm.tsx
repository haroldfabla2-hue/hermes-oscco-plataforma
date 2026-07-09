'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLead } from '@/lib/actions';

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createLead(formData);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Error desconocido');
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center border border-green-200">
        <h3 className="font-bold text-xl mb-2">¡Gracias por unirte!</h3>
        <p>Tu registro fue exitoso. Nos pondremos en contacto contigo pronto vía WhatsApp.</p>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-brand-blue font-bold">Nombre completo</Label>
        <Input id="name" name="name" required placeholder="Ej. Carlos Mendoza" className="rounded-xl h-12 bg-gray-50 border-gray-200" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-brand-blue font-bold">Número de celular (WhatsApp)</Label>
        <Input id="phone" name="phone" required type="tel" placeholder="Ej. 987 654 321" className="rounded-xl h-12 bg-gray-50 border-gray-200" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="district" className="text-brand-blue font-bold">Barrio / Sector</Label>
        <Input id="district" name="district" required placeholder="Ej. Ciudad Mi Trabajo" className="rounded-xl h-12 bg-gray-50 border-gray-200" />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold rounded-xl h-12 text-lg">
        {loading ? 'Procesando...' : 'Unirme al movimiento'}
      </Button>
    </form>
  );
}
