# Plataforma Web - Hermes Nicolás Oscco Polar (Arequipa Avancemos)

Esta es la plataforma oficial de campaña, diseñada con Next.js 14, Tailwind CSS, Prisma ORM y SQLite.

## Requisitos Previos
- Node.js 18.x o superior
- NPM o Yarn

## Variables de Entorno (`.env`)
Antes de iniciar, asegúrate de configurar el archivo `.env` en la raíz del proyecto:
```env
# Configuración de Base de Datos
DATABASE_URL="file:./dev.db"

# Configuración de NextAuth (Seguridad)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="cambiar_por_una_cadena_aleatoria_segura_en_produccion"
```

## Instalación y Configuración
1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Generar el cliente de Prisma y Sincronizar la BD:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Nota: En producción con PostgreSQL, usar `npx prisma migrate deploy`)*

3. **Poblar la BD (Seeders):**
   ```bash
   npm run seed:admin  # Crea el administrador por defecto
   npm run seed        # Carga obras, noticias y propuestas reales
   ```

4. **Ejecutar en modo Desarrollo:**
   ```bash
   npm run dev
   ```

5. **Compilar para Producción:**
   ```bash
   npm run build
   npm run start
   ```

## Acceso Administrativo
El panel de control `/admin` está protegido por NextAuth. 
*Por defecto, el script inicializador crea las siguientes credenciales maestras:*
- **Correo:** `admin@hermesoscco.pe`
- **Contraseña:** `admin123`

## Características Principales
- **Plan de Gobierno Dinámico:** Gestión completa de propuestas y ejes técnicos desde el dashboard.
- **CMS Integrado:** Publicación de noticias y feed de obras.
- **CRM Vecinal:** Buzón de contacto ciudadano y captación de voluntarios.
- **Imágenes AI Optimizadas:** Los assets fotográficos hiperrealistas de la campaña y el logo se sirven de forma local en `/public/assets` para prevenir cuellos de botella de red (Error 429).
