// ================== MAIN APPLICATION ==================
// JavaScript principal para la galería de videos

// Estado de la aplicación
const AppState = {
    videos: [],
    filteredVideos: [],
    currentView: 'grid',
    currentFilter: 'all',
    currentSort: 'name',
    searchTerm: '',
    currentVideoIndex: 0,
    uploadedVideos: [],
    favorites: JSON.parse(localStorage.getItem('favoriteVideos') || '[]')
};

// ================== INICIALIZACIÓN ==================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Cargar videos de la configuración
    AppState.videos = VIDEO_CONFIG.videos;
    AppState.filteredVideos = [...AppState.videos];
    
    // Renderizar galería inicial
    renderGallery();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Actualizar estadísticas
    updateStats();
    
    // Ocultar pantalla de carga
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
        }
    }, 1000);
}

// ================== EVENT LISTENERS ==================
function setupEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // Vistas
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => switchView('grid'));
    }
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => switchView('list'));
    }
    
    // Pantalla completa
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Modal
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('videoModal');
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeVideoModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
    
    // Controles del modal
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', () => navigateVideo(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigateVideo(1));
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Upload
    const uploadFab = document.getElementById('uploadFab');
    const uploadSection = document.getElementById('uploadSection');
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadFab) {
        uploadFab.addEventListener('click', () => {
            uploadSection.classList.add('show');
        });
    }
    
    if (uploadSection) {
        uploadSection.addEventListener('click', (e) => {
            if (e.target === uploadSection) {
                uploadSection.classList.remove('show');
            }
        });
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            handleFileUpload(e.dataTransfer.files);
        });
    }
    
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            handleFileUpload(e.target.files);
        });
    }
    
    // Atajos de teclado
    document.addEventListener('keydown', handleKeyPress);
}

// ================== RENDERIZADO ==================
function renderGallery() {
    const gallery = document.getElementById('videoGallery');
    const emptyState = document.getElementById('emptyState');
    
    if (!gallery) return;
    
    // Limpiar galería
    gallery.innerHTML = '';
    
    // Verificar si hay videos
    if (AppState.filteredVideos.length === 0) {
        gallery.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    gallery.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';
    
    // Renderizar cada video
    AppState.filteredVideos.forEach((video, index) => {
        const card = createVideoCard(video, index);
        gallery.appendChild(card);
    });
    
    // Generar thumbnails después de renderizar
    setTimeout(generateThumbnails, 100);
}

function createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.videoId = video.id;
    
    const isFavorite = AppState.favorites.includes(video.id);
    
    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${video.id})">
            <i class="fas fa-star"></i>
        </button>
        <div class="video-thumbnail" onclick="openVideoModal(${index})">
            <canvas id="thumbnail-${video.id}"></canvas>
            <video preload="metadata" style="display: none;">
                <source src="${getVideoPath(video.filename)}" type="video/mp4">
            </video>
            <div class="play-overlay">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
            </div>
        </div>
        <div class="video-info">
            <h3 class="video-title">${video.title}</h3>
            <div class="video-meta">
                <span><i class="fas fa-clock"></i> ${video.duration}</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(video.date)}</span>
            </div>
        </div>
    `;
    
    return card;
}

// ================== THUMBNAILS ==================
function generateThumbnails() {
    const videos = document.querySelectorAll('.video-thumbnail video');
    
    videos.forEach(video => {
        const canvas = video.parentElement.querySelector('canvas');
        if (!canvas) return;
        
        video.addEventListener('loadeddata', function() {
            // Saltar a 10 segundos para obtener un frame más interesante
            video.currentTime = 10;
        });
        
        video.addEventListener('seeked', function() {
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Remover el video después de capturar el thumbnail
            video.remove();
        });
        
        // Cargar el video
        video.load();
    });
}

// ================== MODAL ==================
function openVideoModal(index) {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDuration = document.getElementById('modalDuration');
    const modalSize = document.getElementById('modalSize');
    
    if (!modal || !modalVideo) return;
    
    AppState.currentVideoIndex = index;
    const video = AppState.filteredVideos[index];
    
    // Configurar video
    modalVideo.src = getVideoPath(video.filename);
    modalTitle.textContent = video.title;
    modalDuration.innerHTML = `<i class="fas fa-clock"></i> ${video.duration}`;
    modalSize.innerHTML = `<i class="fas fa-file"></i> ${video.size}`;
    
    // Mostrar modal
    modal.classList.add('show');
    document.body.classList.add('no-scroll');
    
    // Auto-reproducir
    modalVideo.play();
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    if (modal) {
        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
    
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = '';
    }
}

function navigateVideo(direction) {
    const newIndex = AppState.currentVideoIndex + direction;
    
    if (newIndex >= 0 && newIndex < AppState.filteredVideos.length) {
        openVideoModal(newIndex);
    }
}

function togglePlayPause() {
    const modalVideo = document.getElementById('modalVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    
    if (!modalVideo) return;
    
    if (modalVideo.paused) {
        modalVideo.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
    } else {
        modalVideo.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    }
}

// ================== BÚSQUEDA Y FILTROS ==================
function handleSearch(e) {
    AppState.searchTerm = e.target.value.toLowerCase();
    filterVideos();
}

function handleFilter(e) {
    // Remover clase activa de todos los botones
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase activa al botón clickeado
    e.target.classList.add('active');
    
    // Obtener filtro
    AppState.currentFilter = e.target.dataset.filter;
    filterVideos();
}

function handleSort(e) {
    AppState.currentSort = e.target.value;
    sortVideos();
}

function filterVideos() {
    let filtered = [...AppState.videos];
    
    // Aplicar búsqueda
    if (AppState.searchTerm) {
        filtered = filtered.filter(video => {
            return video.title.toLowerCase().includes(AppState.searchTerm) ||
                   video.description.toLowerCase().includes(AppState.searchTerm) ||
                   video.tags.some(tag => tag.toLowerCase().includes(AppState.searchTerm));
        });
    }
    
    // Aplicar filtro
    switch (AppState.currentFilter) {
        case 'recent':
            const lastWeek = new Date();
            lastWeek.setDate(lastWeek.getDate() - 30);
            filtered = filtered.filter(video => new Date(video.date) > lastWeek);
            break;
        case 'favorites':
            filtered = filtered.filter(video => AppState.favorites.includes(video.id));
            break;
    }
    
    AppState.filteredVideos = filtered;
    sortVideos();
}

function sortVideos() {
    switch (AppState.currentSort) {
        case 'name':
            AppState.filteredVideos.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'date':
            AppState.filteredVideos.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'duration':
            AppState.filteredVideos.sort((a, b) => {
                const aDuration = parseDuration(a.duration);
                const bDuration = parseDuration(b.duration);
                return bDuration - aDuration;
            });
            break;
    }
    
    renderGallery();
    updateStats();
}

function parseDuration(duration) {
    const parts = duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

// ================== FAVORITOS ==================
function toggleFavorite(videoId) {
    const index = AppState.favorites.indexOf(videoId);
    
    if (index > -1) {
        AppState.favorites.splice(index, 1);
    } else {
        AppState.favorites.push(videoId);
    }
    
    // Guardar en localStorage
    localStorage.setItem('favoriteVideos', JSON.stringify(AppState.favorites));
    
    // Actualizar UI
    const btn = document.querySelector(`.video-card[data-video-id="${videoId}"] .favorite-btn`);
    if (btn) {
        btn.classList.toggle('active');
    }
    
    // Re-filtrar si está en vista de favoritos
    if (AppState.currentFilter === 'favorites') {
        filterVideos();
    }
}

// ================== VISTAS ==================
function switchView(view) {
    const gallery = document.getElementById('videoGallery');
    const gridBtn = document.getElementById('gridViewBtn');
    const listBtn = document.getElementById('listViewBtn');
    
    if (!gallery) return;
    
    AppState.currentView = view;
    
    // Actualizar clases
    gallery.className = `video-gallery ${view}-view`;
    
    // Actualizar botones
    if (view === 'grid') {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        gridBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// ================== UPLOAD ==================
function handleFileUpload(files) {
    const videoFiles = Array.from(files).filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length === 0) {
        alert('Por favor selecciona archivos de video válidos');
        return;
    }
    
    videoFiles.forEach(file => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const newVideo = {
                id: Date.now() + Math.random(),
                filename: file.name,
                title: file.name.replace(/\.[^/.]+$/, ''),
                description: 'Video cargado por el usuario',
                duration: 'N/A',
                size: formatBytes(file.size),
                date: new Date().toISOString().split('T')[0],
                category: 'uploaded',
                tags: ['uploaded'],
                favorite: false,
                url: e.target.result
            };
            
            AppState.videos.push(newVideo);
            AppState.uploadedVideos.push(newVideo);
            
            filterVideos();
        };
        
        reader.readAsDataURL(file);
    });
    
    // Cerrar modal de upload
    document.getElementById('uploadSection').classList.remove('show');
    document.getElementById('fileInput').value = '';
}

// ================== UTILIDADES ==================
function updateStats() {
    const videoCount = document.getElementById('videoCount');
    const totalDuration = document.getElementById('totalDuration');
    
    if (videoCount) {
        videoCount.innerHTML = `<i class="fas fa-video"></i> ${AppState.filteredVideos.length} videos`;
    }
    
    if (totalDuration) {
        const total = AppState.filteredVideos.reduce((acc, video) => {
            return acc + parseDuration(video.duration);
        }, 0);
        
        const hours = Math.floor(total / 60);
        const minutes = total % 60;
        
        totalDuration.innerHTML = `<i class="fas fa-clock"></i> Duración total: ${hours}h ${minutes}m`;
    }
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleKeyPress(e) {
    // ESC para cerrar modal
    if (e.key === 'Escape') {
        closeVideoModal();
        document.getElementById('uploadSection').classList.remove('show');
    }
    
    // Flechas para navegar en el modal
    if (document.getElementById('videoModal').classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            navigateVideo(-1);
        } else if (e.key === 'ArrowRight') {
            navigateVideo(1);
        } else if (e.key === ' ') {
            e.preventDefault();
            togglePlayPause();
        }
    }
}

// ================== EXPORT ==================
window.toggleFavorite = toggleFavorite;
window.openVideoModal = openVideoModal;