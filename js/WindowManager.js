import { $, createElement, removeElement, log } from './utils.js';

class WindowManager {
    constructor() {
        this.windows = {};
        this.focusedWindow = null;
        this.nextId = 0;
        this.currentMaxZIndex = 1;
    }

    createWindow() {
        const window = new Window(this);
        this.windows[window.id] = window;
        this.setFocus(window);
        return window;
    }

    removeWindow(windowId) {
        const window = this.windows[windowId];
        if (window) {
            removeElement(window.element);
            delete this.windows[windowId];
            
            if (this.focusedWindow === window) {
                this.focusedWindow = null;
                // Enfocar la ventana con mayor z-index
                this.focusTopWindow();
            }
            
            log('Windows remaining:', Object.keys(this.windows).length);
        }
    }

    setFocus(window) {
        if (this.focusedWindow === window) return; // Ya está enfocada
        
        // Incrementar el z-index máximo y asignarlo a la ventana enfocada
        this.currentMaxZIndex++;
        window.setZIndex(this.currentMaxZIndex);
        this.focusedWindow = window;
        
        // Agregar clase visual de enfoque
        this.updateWindowFocus();
    }

    focusTopWindow() {
        let topWindow = null;
        let maxZ = 0;
        
        for (let id in this.windows) {
            const window = this.windows[id];
            if (window.zIndex > maxZ) {
                maxZ = window.zIndex;
                topWindow = window;
            }
        }
        
        if (topWindow) {
            this.focusedWindow = topWindow;
            this.updateWindowFocus();
        }
    }

    updateWindowFocus() {
        // Remover clase de enfoque de todas las ventanas
        for (let id in this.windows) {
            this.windows[id].element.classList.remove('window-focused');
        }
        
        // Agregar clase de enfoque a la ventana actual
        if (this.focusedWindow) {
            this.focusedWindow.element.classList.add('window-focused');
        }
    }

    getNextId() {
        return this.nextId++;
    }
}

class Window {
    constructor(manager) {
        this.manager = manager;
        this.id = manager.getNextId();
        this.zIndex = ++manager.currentMaxZIndex; // Asignar el siguiente z-index disponible
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.position = { x: 0, y: 0 };
        this.isMobile = this.detectMobile();
        
        // Bind methods to maintain context
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        
        this.init();
        this.setupEventListeners();
        this.element.focus();
    }

    detectMobile() {
        return window.innerWidth <= 768 || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0);
    }

    init() {
        this.element = createElement('div', 'window');
        this.element.innerHTML = `
            <header class="header_windows">
                <div class="close">×</div>
            </header>
        `;
        
        this.header = this.element.querySelector('.header_windows');
        this.closeButton = this.element.querySelector('.close');
        
        // Posicionamiento responsive
        if (this.isMobile) {
            this.element.style.width = '95vw';
            this.element.style.height = 'calc(100vh - 100px)';
            this.element.style.top = '10px';
            this.element.style.left = '2.5vw';
            this.element.style.right = 'auto';
        } else {
            this.element.style.right = '20%';
            this.element.style.top = '10%';
        }
        
        this.element.style.zIndex = this.zIndex;
        this.element.tabIndex = 0;
        
        document.body.appendChild(this.element);
    }

    setupEventListeners() {
        // Mejorar el evento de cierre para móvil
        this.closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.manager.removeWindow(this.id);
        });

        // Agregar evento touch para móvil
        this.closeButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.manager.removeWindow(this.id);
        });

        // Touch events para móvil - solo en el header, no en el botón de cierre
        if (this.isMobile) {
            this.header.addEventListener('touchstart', (e) => {
                // No procesar si el toque es en el botón de cierre
                if (this.closeButton.contains(e.target)) {
                    return;
                }
                e.preventDefault();
                this.manager.setFocus(this);
                this.startDrag(e.touches[0]);
            }, { passive: false });
            
            document.addEventListener('touchmove', (e) => {
                if (this.isDragging) {
                    e.preventDefault();
                    if (e.touches[0]) {
                        this.drag(e.touches[0]);
                    }
                }
            }, { passive: false });
            
            document.addEventListener('touchend', (e) => {
                if (this.isDragging) {
                    this.stopDrag();
                }
            });
        }

        // Mouse events para desktop
        this.header.addEventListener('mousedown', (e) => {
            // No procesar si el click es en el botón de cierre
            if (this.closeButton.contains(e.target)) {
                return;
            }
            this.manager.setFocus(this);
            this.startDrag(e);
        });
        
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.stopDrag);
        
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.manager.removeWindow(this.id);
            }
        });

        // Enfocar ventana al hacer click en cualquier parte
        this.element.addEventListener('mousedown', (e) => {
            // Solo si no se está haciendo click en el header (ya manejado arriba)
            if (!this.header.contains(e.target)) {
                this.manager.setFocus(this);
            }
        });

        this.element.addEventListener('touchstart', (e) => {
            // Solo si no se está haciendo click en el header
            if (!this.header.contains(e.target)) {
                this.manager.setFocus(this);
            }
        });

        // Prevenir zoom en mobile al hacer doble tap
        this.element.addEventListener('touchend', (e) => {
            e.preventDefault();
        });
    }

    startDrag(e) {
        // En móvil, solo permitir drag si no está en pantalla completa
        if (this.isMobile && window.innerWidth <= 768) {
            return; // Desactivar drag en móvil para evitar problemas de UI
        }

        this.isDragging = true;
        this.dragOffset.x = e.clientX || e.pageX;
        this.dragOffset.y = e.clientY || e.pageY;
        
        const rect = this.element.getBoundingClientRect();
        this.position.x = rect.left;
        this.position.y = rect.top;
    }

    drag(e) {
        if (!this.isDragging) return;
        
        const clientX = e.clientX || e.pageX;
        const clientY = e.clientY || e.pageY;
        
        if (clientX === undefined || clientY === undefined) return;
        
        const newX = this.position.x + clientX - this.dragOffset.x;
        const newY = this.position.y + clientY - this.dragOffset.y;
        
        // Limitar el arrastre dentro de la ventana del navegador
        const maxX = window.innerWidth - this.element.offsetWidth;
        const maxY = window.innerHeight - this.element.offsetHeight;
        
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));
        
        this.element.style.left = `${constrainedX}px`;
        this.element.style.top = `${constrainedY}px`;
        this.element.style.right = 'auto';
    }

    stopDrag() {
        this.isDragging = false;
    }

    setZIndex(z) {
        this.zIndex = z;
        this.element.style.zIndex = z;
    }

    setContent(content) {
        this.element.appendChild(content);
    }
}

export default WindowManager;
