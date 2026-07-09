import { createWork } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Save, Image as ImageIcon, Video, Layout, Info } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewWorkPage() {
  async function onSubmit(formData: FormData) {
    'use server';
    const result = await createWork(formData);
    if (result.success) {
      redirect('/admin/obras');
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <Link href="/admin/obras" className="flex items-center text-sm text-gray-500 hover:text-brand-red transition-colors mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Volver a Obras
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-blue">Registrar Nueva Obra</h1>
      </div>

      <form action={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUMNA PRINCIPAL */}
        <div className="md:col-span-2 space-y-6">
          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layout className="w-5 h-5 text-brand-red" /> Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la Obra</Label>
                <Input id="title" name="title" required placeholder="Ej. Renovación Integral de la Av. San Martín" className="rounded-xl h-12" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input id="slug" name="slug" required placeholder="ej-renovacion-san-martin" className="rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación / Sector</Label>
                  <Input id="location" name="location" required placeholder="Ej. Socabaya Tradicional" className="rounded-xl h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Breve Resumen</Label>
                <Textarea id="description" name="description" required placeholder="Resumen corto para la tarjeta principal..." className="rounded-xl min-h-[80px]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-red" /> Storytelling e Impacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storytelling">Narrativa de la Obra (El &ldquo;Por Qué&rdquo;)</Label>
                <Textarea id="storytelling" name="storytelling" placeholder="Cuenta la historia detrás de esta obra, la necesidad del vecino y cómo se gestionó..." className="rounded-xl min-h-[150px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="results">Resultados y Beneficios (Métricas)</Label>
                <Textarea id="results" name="results" placeholder="Ej. 5km de veredas nuevas, 200 luminarias LED, mejora la seguridad de 500 familias." className="rounded-xl min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-brand-red" /> Multimedia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beforeImg">URL Imagen &ldquo;Antes&rdquo;</Label>
                  <Input id="beforeImg" name="beforeImg" placeholder="https://..." className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="afterImg">URL Imagen &ldquo;Después&rdquo; / Render</Label>
                  <Input id="afterImg" name="afterImg" placeholder="https://..." className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoUrl">URL Video (YouTube / Drive)</Label>
                <Input id="videoUrl" name="videoUrl" placeholder="https://youtube.com/watch?v=..." className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gallery">Galería de Imágenes (JSON array de URLs)</Label>
                <Input id="gallery" name="gallery" placeholder='["url1", "url2"]' className="rounded-xl" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA LATERAL (CONFIGURACIÓN) */}
        <div className="space-y-6">
          <Card className="rounded-3xl border shadow-sm bg-brand-blue text-white">
            <CardHeader>
              <CardTitle className="text-lg">Estado de Ejecución</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white/70">Estado Actual</Label>
                <select id="status" name="status" className="w-full bg-white/10 border border-white/20 rounded-xl h-12 px-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow">
                  <option value="PLANNED">Planificada</option>
                  <option value="IN_PROGRESS" selected>En Ejecución</option>
                  <option value="COMPLETED">Completada</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="progress" className="text-white/70">Progreso (%)</Label>
                <Input id="progress" name="progress" type="number" min="0" max="100" defaultValue="50" className="bg-white/10 border-white/20 text-white rounded-xl h-12" />
              </div>
              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="featured" name="featured" className="w-5 h-5 rounded border-gray-300 text-brand-red focus:ring-brand-red" />
                <Label htmlFor="featured" className="text-white font-bold cursor-pointer">Destacar en la Home</Label>
              </div>
              <Button type="submit" className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-blue font-bold rounded-xl h-14 text-lg mt-4">
                <Save className="w-5 h-5 mr-2" /> Guardar Obra
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 bg-brand-red/10 border-2 border-brand-red/20 rounded-3xl text-brand-red text-sm">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <Video className="w-4 h-4" /> Recomendación de Prensa
            </h4>
            <p>Asegúrate de subir fotos en alta resolución (1920x1080) para que el storytelling visual impacte más al vecino.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
