# 🎬 AI Agents Video Gallery

Una galería de videos moderna y responsiva para el curso de AI Agents, desarrollada con HTML5, CSS3 y JavaScript vanilla.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Descripción

Galería interactiva de videos diseñada para mostrar y organizar las clases del curso de AI Agents. Incluye características avanzadas como búsqueda en tiempo real, filtros, favoritos, múltiples vistas y reproducción modal.

## ✨ Características

### 🎯 Funcionalidades Principales
- **Galería Responsiva**: Diseño adaptable a cualquier dispositivo
- **Thumbnails Automáticos**: Generación automática de miniaturas desde los videos
- **Reproducción Modal**: Visualización en pantalla completa con controles
- **Búsqueda en Tiempo Real**: Encuentra videos por título, descripción o etiquetas
- **Sistema de Filtros**: Organiza por categorías, recientes o favoritos
- **Favoritos**: Marca y guarda tus videos preferidos
- **Múltiples Vistas**: Alterna entre vista de cuadrícula y lista
- **Carga de Videos**: Arrastra y suelta para agregar nuevos videos

### 🎨 Interfaz de Usuario
- **Diseño Moderno**: Gradientes y animaciones suaves
- **Modo Oscuro**: Reproductor con tema oscuro para mejor visualización
- **Animaciones CSS**: Transiciones fluidas y efectos hover
- **Iconos Font Awesome**: Interfaz intuitiva con iconos profesionales
- **Loading Screen**: Pantalla de carga animada

### ⚡ Optimización
- **Lazy Loading**: Carga diferida de videos
- **Debounce en Búsqueda**: Optimización de rendimiento
- **LocalStorage**: Persistencia de favoritos
- **Sin Dependencias**: JavaScript vanilla para máximo rendimiento

## 📁 Estructura del Proyecto

```
video-gallery-project/
│
├── index.html                 # Página principal
├── README.md                  # Documentación
├── .gitignore                # Archivos ignorados por Git
├── package.json              # Configuración del proyecto
│
├── assets/                   # Recursos estáticos
│   ├── css/
│   │   └── style.css        # Estilos principales
│   └── js/
│       ├── config.js        # Configuración de videos
│       └── main.js          # Lógica principal
│
└── videos/                   # Carpeta para videos (vacía)
```

## 🚀 Instalación

### Opción 1: Uso Local
1. Clona o descarga el repositorio
2. Copia tus videos MP4 a la carpeta raíz del proyecto
3. Actualiza `config.js` con la información de tus videos
4. Abre `index.html` en tu navegador

### Opción 2: Servidor Local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx http-server

# Con PHP
php -S localhost:8000
```

## ⚙️ Configuración

### Configurar Videos
Edita el archivo `assets/js/config.js`:

```javascript
const VIDEO_CONFIG = {
    videos: [
        {
            id: 1,
            filename: 'tu-video.mp4',
            title: 'Título del Video',
            description: 'Descripción',
            duration: '45:00',
            size: '250 MB',
            date: '2024-01-15',
            category: 'categoria',
            tags: ['tag1', 'tag2'],
            favorite: false
        }
    ]
};
```

### Personalizar Rutas
```javascript
paths: {
    videos: '../'  // Ajusta según la ubicación de tus videos
}
```

## 🎮 Uso

### Controles de Teclado
- `ESC` - Cerrar modal/ventanas
- `←` / `→` - Navegar entre videos en el modal
- `Espacio` - Play/Pausa en el modal

### Características Interactivas
1. **Buscar Videos**: Usa la barra de búsqueda superior
2. **Filtrar**: Haz clic en los botones de filtro
3. **Ordenar**: Selecciona criterio en el dropdown
4. **Favoritos**: Clic en la estrella de cada video
5. **Vista Modal**: Clic en cualquier video para reproducir
6. **Cargar Videos**: Clic en el botón + flotante

## 🌐 Despliegue

### GitHub Pages
1. Sube el proyecto a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama y carpeta
4. Tu sitio estará en: `https://tu-usuario.github.io/tu-repo`

### Netlify
1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. ¡Listo! Tu sitio está online

### Vercel
```bash
npm i -g vercel
vercel
```

## 📸 Capturas de Pantalla

### Vista Principal
- Galería en cuadrícula con thumbnails automáticos
- Barra de búsqueda y filtros
- Estadísticas en tiempo real

### Modal de Reproducción
- Reproductor de video completo
- Controles de navegación
- Información del video

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Flexbox, Grid, Animaciones
- **JavaScript ES6+**: Módulos, Arrow Functions, Async/Await
- **Font Awesome 6**: Iconos vectoriales
- **LocalStorage API**: Persistencia de datos
- **Canvas API**: Generación de thumbnails

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Desarrollado para el curso de AI Agents

## 🤝 Contribuciones

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o problema:
- Abre un issue en GitHub
- Contacta al instructor del curso

## 🔄 Changelog

### v1.0.0 (2024)
- Lanzamiento inicial
- Galería completa con 7 videos del curso
- Sistema de búsqueda y filtros
- Reproducción modal
- Favoritos con persistencia
- Diseño responsivo

## 🎯 Roadmap

- [ ] Soporte para subtítulos
- [ ] Velocidad de reproducción variable
- [ ] Compartir en redes sociales
- [ ] Modo oscuro/claro
- [ ] Estadísticas de visualización
- [ ] Comentarios por video
- [ ] Exportar lista de reproducción

## 💡 Tips de Uso

1. **Mejor experiencia**: Usa Chrome o Firefox actualizados
2. **Videos locales**: Para videos locales, usa un servidor HTTP
3. **Rendimiento**: Los videos grandes pueden tardar en cargar thumbnails
4. **Favoritos**: Se guardan localmente en tu navegador

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!