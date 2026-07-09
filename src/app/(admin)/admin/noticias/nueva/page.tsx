import { createPost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Save, FileText, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function onSubmit(formData: FormData) {
    'use server';
    const result = await createPost(formData);
    if (result.success) {
      redirect('/admin/noticias');
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <Link href="/admin/noticias" className="flex items-center text-sm text-gray-500 hover:text-brand-green transition-colors mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" /> Volver a Noticias
      </Link>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-blue">Redactar Noticia / Blog</h1>
      </div>

      <form action={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* COLUMNA PRINCIPAL */}
        <div className="md:col-span-2 space-y-6">
          <Card className="rounded-3xl border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-green" /> Contenido Editorial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Artículo</Label>
                <Input id="title" name="title" required placeholder="Ej. Hermes Oscco supervisa avance de muros de contención" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input id="slug" name="slug" required placeholder="supervision-muros-contencion" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Resumen Corto (Excerpt)</Label>
                <Textarea id="excerpt" name="excerpt" placeholder="Breve descripción que aparecerá en los listados..." className="rounded-xl min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Cuerpo del Artículo (Markdown)</Label>
                <Textarea id="content" name="content" required placeholder="Escribe el contenido completo aquí..." className="rounded-xl min-h-[400px] font-mono text-sm" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* COLUMNA LATERAL (CONFIGURACIÓN) */}
        <div className="space-y-6">
          <Card className="rounded-3xl border shadow-sm bg-brand-blue text-white">
            <CardHeader>
              <CardTitle className="text-lg">Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white/70">Categoría</Label>
                <select id="category" name="category" className="w-full bg-white/10 border border-white/20 rounded-xl h-12 px-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow">
                  <option value="SEGURIDAD">Seguridad Ciudadana</option>
                  <option value="INFRAESTRUCTURA">Infraestructura</option>
                  <option value="SALUD">Salud y Deporte</option>
                  <option value="TERRITORIO">Trabajo en Territorio</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="featuredImg" className="text-white/70">Imagen Destacada (URL)</Label>
                <Input id="featuredImg" name="featuredImg" placeholder="https://..." className="bg-white/10 border-white/20 text-white rounded-xl h-12" />
              </div>
              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="published" name="published" defaultChecked className="w-5 h-5 rounded border-gray-300 text-brand-green focus:ring-brand-green" />
                <Label htmlFor="published" className="text-white font-bold cursor-pointer">Publicar Inmediatamente</Label>
              </div>
              <Button type="submit" className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-blue font-bold rounded-xl h-14 text-lg mt-4">
                <Save className="w-5 h-5 mr-2" /> Guardar Noticia
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 bg-brand-yellow/10 border-2 border-brand-yellow/20 rounded-3xl text-brand-blue text-sm">
            <h4 className="font-bold flex items-center gap-2 mb-2">
              <ImageIcon className="w-4 h-4" /> Tip Editorial
            </h4>
            <p>Usa subtítulos y párrafos cortos para facilitar la lectura en móviles, que es donde el 80% de los vecinos nos leerán.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
