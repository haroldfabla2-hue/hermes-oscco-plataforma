"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border-t-8 border-brand-green">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 relative">
              <Image 
                src="/assets/logo.png" 
                alt="Logo" 
                fill 
                className="object-contain"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-brand-blue mb-2">Acceso Administrativo</h2>
          <p className="text-center text-gray-500 mb-8">Gestión de Plataforma - Hermes Oscco</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                placeholder="admin@hermesoscco.pe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl py-6 text-lg font-bold"
              disabled={loading}
            >
              {loading ? "Verificando..." : "Ingresar al Sistema"}
            </Button>
          </form>
        </div>
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-100">
          Uso exclusivo del equipo de campaña
        </div>
      </div>
    </div>
  );
}
