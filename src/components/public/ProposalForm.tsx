'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCitizenProposal } from '@/lib/actions';

export function ProposalForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await createCitizenProposal(formData);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Error desconocido');
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="bg-brand-blue text-white p-8 rounded-3xl text-center border-4 border-brand-yellow/20">
        <h3 className="font-bold text-2xl mb-4">¡Tu voz ha sido escuchada!</h3>
        <p className="text-gray-300">Hemos recibido tu propuesta. El equipo técnico del alcalde la evaluará para priorizar acciones en tu sector. Gracias por construir una mejor Cerro Colorado.</p>
        <Button onClick={() => setSuccess(false)} variant="outline" className="mt-6 border-white/20 text-brand-blue bg-white hover:bg-gray-100">
          Enviar otra propuesta
        </Button>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="citizenName" className="font-bold text-brand-blue">Nombre y Apellido</Label>
          <Input id="citizenName" name="citizenName" required placeholder="Ej. Ana Mamani" className="h-12 rounded-xl bg-gray-50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="prop_phone" className="font-bold text-brand-blue">Celular / WhatsApp</Label>
          <Input id="prop_phone" name="phone" required placeholder="900 000 000" className="h-12 rounded-xl bg-gray-50" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="prop_district" className="font-bold text-brand-blue">Sector / Urbanización</Label>
        <Input id="prop_district" name="district" required placeholder="Ej. 4 de Octubre" className="h-12 rounded-xl bg-gray-50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="topic" className="font-bold text-brand-blue">Tema Principal</Label>
        <select id="topic" name="topic" required className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option value="">Selecciona una categoría...</option>
          <option value="SEGURIDAD">Seguridad Ciudadana</option>
          <option value="INFRAESTRUCTURA">Pistas, Veredas y Parques</option>
          <option value="LIMPIEZA">Limpieza Pública</option>
          <option value="ORDEN">Ordenamiento y Tránsito</option>
          <option value="OTRO">Otro tema urgente</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" className="font-bold text-brand-blue">Describe el problema o tu propuesta</Label>
        <textarea 
          id="description" 
          name="description" 
          required 
          rows={4}
          placeholder="Cuéntanos cuál es la situación en tu barrio y qué solución técnica sugieres..." 
          className="flex w-full rounded-xl border border-input bg-gray-50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl h-14 text-lg">
        {loading ? 'Enviando...' : 'Enviar Propuesta Vecinal'}
      </Button>
    </form>
  );
}
