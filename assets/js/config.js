// ================== CONFIGURACIÓN DE VIDEOS ==================
// Configuración de los videos disponibles en el proyecto
const VIDEO_CONFIG = {
    // Lista de videos con sus metadatos
    videos: [
        {
            id: 1,
            filename: '171802746_AQNq8csbgGakvG9bWpZCg4kC6Q0J_x1EP5uFCsJZxSIh3GFvyp7_x_.mp4',
            title: 'AI Agents - Introducción y Fundamentos',
            description: 'Clase introductoria sobre agentes de inteligencia artificial',
            duration: '45:00',
            size: '250 MB',
            date: '2024-01-15',
            category: 'fundamentos',
            tags: ['introducción', 'conceptos básicos', 'AI'],
            favorite: false
        },
        {
            id: 2,
            filename: '171802746_AQOKUrjj3wW1rxOwDzACLxxoIzV6rBj2OaA8ddCtifm6o_EZCfev6o.mp4',
            title: 'Arquitectura de Agentes Inteligentes',
            description: 'Diseño y estructura de sistemas de agentes',
            duration: '52:30',
            size: '280 MB',
            date: '2024-01-22',
            category: 'arquitectura',
            tags: ['arquitectura', 'diseño', 'sistemas'],
            favorite: false
        },
        {
            id: 3,
            filename: '171802746_AQOmYbcbuHxFei9i2V2J2SPD_ZRLPRUwAY1Ey00o5_8wXBmk1Dcsfc.mp4',
            title: 'Implementación con LangChain',
            description: 'Desarrollo práctico usando LangChain framework',
            duration: '48:15',
            size: '265 MB',
            date: '2024-01-29',
            category: 'implementación',
            tags: ['langchain', 'código', 'práctica'],
            favorite: true
        },
        {
            id: 4,
            filename: '171802746_AQOUUtzxvVG87witO8sAQ5WcrxPmH92gB5Xb1mqDZsN_XIqzq4j3GS.mp4',
            title: 'Agentes Conversacionales',
            description: 'Creación de chatbots y asistentes virtuales',
            duration: '55:45',
            size: '310 MB',
            date: '2024-02-05',
            category: 'chatbots',
            tags: ['conversacional', 'chatbot', 'NLP'],
            favorite: false
        },
        {
            id: 5,
            filename: '171802746_AQOz9liS5zWFmjfJvzSMv_pHT79HU_FkfG_6vV3TAQvu5IuQ1GUi5_.mp4',
            title: 'Integración con APIs y Servicios',
            description: 'Conectando agentes con servicios externos',
            duration: '42:20',
            size: '235 MB',
            date: '2024-02-12',
            category: 'integración',
            tags: ['APIs', 'integración', 'servicios'],
            favorite: true
        },
        {
            id: 6,
            filename: '171802746_AQPiIftp9dP2iNFs9k2qCOJZ0_F6JWfpNudJR_QSow93oUbr1u9fvX.mp4',
            title: 'Optimización y Mejores Prácticas',
            description: 'Técnicas avanzadas de optimización',
            duration: '50:10',
            size: '275 MB',
            date: '2024-02-19',
            category: 'optimización',
            tags: ['optimización', 'mejores prácticas', 'rendimiento'],
            favorite: false
        },
        {
            id: 7,
            filename: '171802746_AQP_p_9tAhIuRrbI2hx2Me2JVzW5PsExWX_Yv4UaeRIYXqRP7nWZiY.mp4',
            title: 'Proyecto Final y Casos de Uso',
            description: 'Desarrollo de proyecto completo y ejemplos reales',
            duration: '58:30',
            size: '320 MB',
            date: '2024-02-26',
            category: 'proyecto',
            tags: ['proyecto', 'casos de uso', 'ejemplos'],
            favorite: true
        }
    ],

    // Configuración de rutas
    paths: {
        // Ruta relativa a los videos desde el HTML
        videos: '../',  // Los videos están en la carpeta padre
        // También puedes usar rutas absolutas si prefieres
        // videos: 'file:///C:/Users/codex/Documents/AI%20AGENTS%20CLASE/'
    },

    // Configuración de la aplicación
    settings: {
        autoplay: false,
        defaultView: 'grid', // 'grid' o 'list'
        videosPerPage: 12,
        enableSearch: true,
        enableFilters: true,
        enableFavorites: true,
        enableUpload: true,
        theme: 'default' // Puedes agregar más temas
    },

    // Categorías disponibles
    categories: [
        { id: 'all', name: 'Todos', icon: 'fa-border-all' },
        { id: 'fundamentos', name: 'Fundamentos', icon: 'fa-book' },
        { id: 'arquitectura', name: 'Arquitectura', icon: 'fa-building' },
        { id: 'implementación', name: 'Implementación', icon: 'fa-code' },
        { id: 'chatbots', name: 'Chatbots', icon: 'fa-comments' },
        { id: 'integración', name: 'Integración', icon: 'fa-plug' },
        { id: 'optimización', name: 'Optimización', icon: 'fa-rocket' },
        { id: 'proyecto', name: 'Proyectos', icon: 'fa-folder-open' }
    ]
};

// Función helper para obtener la ruta completa del video
function getVideoPath(filename) {
    return VIDEO_CONFIG.paths.videos + filename;
}

// Función para formatear la duración
function formatDuration(duration) {
    return duration || 'N/A';
}

// Función para formatear el tamaño del archivo
function formatFileSize(size) {
    return size || 'N/A';
}

// Función para formatear la fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Exportar configuración para uso en otros scripts
window.VIDEO_CONFIG = VIDEO_CONFIG;