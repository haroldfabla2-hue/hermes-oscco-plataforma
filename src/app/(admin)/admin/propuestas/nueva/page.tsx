"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createProposal } from "@/lib/actions";

export default function NuevaPropuestaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(e.currentTarget);
    const result = await createProposal(formData);
    
    if (result.success) {
      router.push("/admin/propuestas");
      router.refresh();
    } else {
      setError(result.error || "Error al guardar");
      setLoading(false);
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue">Nuevo Eje de Campaña</h1>
        <p className="text-muted-foreground">Estructura un nuevo plan de gobierno para el portal público.</p>
      </div>

      <Card className="rounded-2xl border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-brand-blue">Detalles de la Propuesta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título del Plan</label>
                <input 
                  name="title"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Ej. Serenazgo Inteligente 24/7"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Categoría (Eje)</label>
                <select 
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                >
                  <option value="Seguridad">Seguridad Ciudadana</option>
                  <option value="Infraestructura">Infraestructura y Obras</option>
                  <option value="Limpieza">Limpieza Pública</option>
                  <option value="Desarrollo">Desarrollo Social</option>
                  <option value="Salud">Salud</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción Detallada</label>
              <textarea 
                name="description"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Explica técnicamente cómo se logrará este objetivo..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre de Ícono (opcional)</label>
              <input 
                name="icon"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Ej. Shield, Truck, HardHat"
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="bg-brand-blue hover:bg-brand-blue/90">
                {loading ? "Guardando..." : "Publicar Propuesta"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
