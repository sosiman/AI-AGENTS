# 📚 INSTRUCCIONES DE USO - AI Agents Video Gallery

## 🚀 INICIO RÁPIDO

### Paso 1: Preparar los Videos
Los videos ya están en la carpeta padre. Tienes dos opciones:

**Opción A - Usar desde la ubicación actual:**
1. Los videos ya están configurados para cargarse desde `C:\Users\codex\Documents\AI AGENTS CLASE\`
2. Solo abre el archivo `index.html` en tu navegador

**Opción B - Copiar videos a la carpeta del proyecto:**
1. Copia los 7 archivos MP4 desde la carpeta padre a la carpeta `video-gallery-project`
2. Modifica el archivo `assets/js/config.js` línea 78:
   ```javascript
   videos: './'  // Cambiar de '../' a './'
   ```

### Paso 2: Abrir la Galería

#### Método 1: Directo (Más Simple)
1. Navega a `C:\Users\codex\Documents\AI AGENTS CLASE\video-gallery-project\`
2. Haz doble clic en `index.html`
3. ¡Listo! La galería se abrirá en tu navegador

#### Método 2: Con Servidor Local (Recomendado)
```bash
# Opción 1: Con Python
cd "C:\Users\codex\Documents\AI AGENTS CLASE\video-gallery-project"
python -m http.server 8000
# Abre http://localhost:8000 en tu navegador

# Opción 2: Con Node.js
npm install
npm start
# Se abrirá automáticamente en http://localhost:8080

# Opción 3: Con extensión Live Server en VS Code
# Click derecho en index.html → "Open with Live Server"
```

## 📦 SUBIR A GITHUB

### 1. Crear Repositorio en GitHub
1. Ve a [GitHub.com](https://github.com)
2. Click en "New repository"
3. Nombre: `ai-agents-video-gallery`
4. Descripción: "Galería de videos del curso AI Agents"
5. Público o Privado según prefieras
6. NO inicialices con README (ya tenemos uno)

### 2. Subir el Proyecto
```bash
# En la carpeta del proyecto
cd "C:\Users\codex\Documents\AI AGENTS CLASE\video-gallery-project"

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Crear primer commit
git commit -m "🎬 Initial commit - AI Agents Video Gallery"

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/ai-agents-video-gallery.git

# Subir a GitHub
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages (Opcional)
1. Ve a Settings → Pages en tu repositorio
2. Source: Deploy from a branch
3. Branch: main / root
4. Save
5. Tu sitio estará en: `https://TU-USUARIO.github.io/ai-agents-video-gallery`

**Nota**: Los videos MP4 no se subirán debido al `.gitignore`. Para GitHub Pages, considera:
- Usar un servicio de hosting de videos (YouTube, Vimeo)
- Subir a un CDN (Cloudinary, AWS S3)
- Usar GitHub LFS para archivos grandes

## 🎨 PERSONALIZACIÓN

### Cambiar Colores
Edita `assets/css/style.css` línea 3-15:
```css
:root {
    --primary-color: #667eea;    /* Color principal */
    --secondary-color: #764ba2;  /* Color secundario */
    --accent-color: #f093fb;     /* Color de acento */
}
```

### Modificar Información de Videos
Edita `assets/js/config.js` línea 5-75:
```javascript
{
    id: 1,
    filename: 'nombre-del-archivo.mp4',
    title: 'Título del Video',
    description: 'Descripción',
    duration: '45:00',
    // ... más propiedades
}
```

### Agregar Nuevas Categorías
Edita `assets/js/config.js` línea 95-104:
```javascript
categories: [
    { id: 'nueva-categoria', name: 'Nueva Categoría', icon: 'fa-icon' }
]
```

## 🔧 SOLUCIÓN DE PROBLEMAS

### Los videos no se reproducen
**Problema**: Los navegadores bloquean archivos locales por seguridad.
**Solución**: 
1. Usa un servidor local (ver Método 2 arriba)
2. O sube los videos a la misma carpeta del proyecto

### Los thumbnails no se generan
**Problema**: CORS policy con archivos locales.
**Solución**:
1. Usa un servidor HTTP local
2. Los thumbnails se generarán automáticamente

### La galería está vacía
**Problema**: Ruta incorrecta a los videos.
**Solución**:
1. Verifica la ruta en `config.js` línea 78
2. Asegúrate de que los videos están en la ubicación correcta

### Error 404 en los videos
**Problema**: Los videos no están donde el código los busca.
**Solución**:
1. Copia los videos a la carpeta del proyecto
2. O ajusta la ruta en `config.js`

## 📱 CARACTERÍSTICAS DE USO

### Atajos de Teclado
- `ESC` - Cerrar modal de video
- `←` - Video anterior
- `→` - Video siguiente  
- `Espacio` - Play/Pausa

### Funciones Interactivas
- **🔍 Buscar**: Escribe en la barra superior
- **🏷️ Filtrar**: Click en los botones de categoría
- **⭐ Favoritos**: Click en la estrella de cada video
- **📺 Ver Video**: Click en cualquier miniatura
- **➕ Agregar Videos**: Click en el botón flotante (+)

### Vistas Disponibles
- **Grid View**: Vista de cuadrícula (por defecto)
- **List View**: Vista de lista compacta
- **Fullscreen**: Pantalla completa del navegador

## 🌐 DESPLIEGUE EN PRODUCCIÓN

### Opción 1: Netlify (Gratis)
1. Ve a [netlify.com](https://www.netlify.com)
2. Arrastra la carpeta del proyecto al área "drop"
3. ¡Listo! Tu sitio está online

### Opción 2: Vercel (Gratis)
```bash
npm i -g vercel
vercel
# Sigue las instrucciones
```

### Opción 3: Surge.sh (Gratis)
```bash
npm install -g surge
surge
# Elige un dominio: tu-proyecto.surge.sh
```

### Opción 4: Hosting Tradicional
1. Sube todos los archivos por FTP
2. Asegúrate de subir también los videos
3. Accede a tu-dominio.com

## 📊 ESTRUCTURA DE ARCHIVOS

```
video-gallery-project/
│
├── 📄 index.html           (Página principal)
├── 📄 README.md           (Documentación)
├── 📄 LICENSE             (Licencia MIT)
├── 📄 package.json        (Configuración NPM)
├── 📄 .gitignore          (Archivos ignorados)
├── 📄 INSTRUCTIONS.md     (Este archivo)
│
├── 📁 assets/
│   ├── 📁 css/
│   │   └── 📄 style.css   (Estilos)
│   └── 📁 js/
│       ├── 📄 config.js   (Configuración)
│       └── 📄 main.js     (Lógica)
│
└── 📁 videos/
    └── 📄 .gitkeep        (Mantiene la carpeta)
```

## 💡 TIPS PROFESIONALES

1. **Optimización de Videos**:
   - Usa HandBrake para comprimir videos sin perder calidad
   - Formato recomendado: MP4 H.264
   - Resolución: 1920x1080 o 1280x720

2. **SEO y Metadatos**:
   - Actualiza las meta tags en `index.html`
   - Usa nombres descriptivos para los videos
   - Agrega transcripciones si es posible

3. **Performance**:
   - Los videos grandes pueden tardar en cargar
   - Considera usar un CDN para producción
   - Habilita compresión GZIP en el servidor

4. **Seguridad**:
   - No subas contenido con derechos de autor
   - Usa HTTPS en producción
   - Implementa autenticación si es contenido privado

## 🆘 SOPORTE

Si tienes problemas:
1. Revisa esta guía completa
2. Busca en los issues de GitHub
3. Crea un nuevo issue con detalles del problema
4. Contacta al instructor del curso

## ✅ CHECKLIST DE LANZAMIENTO

- [ ] Videos copiados o rutas configuradas
- [ ] Información de videos actualizada en config.js
- [ ] Probado en navegador local
- [ ] Thumbnails generándose correctamente
- [ ] Búsqueda y filtros funcionando
- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] GitHub Pages configurado (opcional)
- [ ] Dominio personalizado (opcional)
- [ ] README actualizado con tu información

¡Disfruta tu galería de videos! 🎬✨