import { $, createElement, removeElement, log } from './utils.js';

class WindowManager {
    constructor() {
        this.windows = {};
        this.focusedWindow = null;
        this.nextId = 0;
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
            }
            
            log('Windows remaining:', Object.keys(this.windows).length);
        }
    }

    setFocus(window) {
        if (this.focusedWindow && this.focusedWindow !== window) {
            const previousZ = this.focusedWindow.zIndex;
            this.focusedWindow.setZIndex(window.zIndex);
            window.setZIndex(previousZ);
        }
        this.focusedWindow = window;
    }

    getNextId() {
        return this.nextId++;
    }
}

class Window {
    constructor(manager) {
        this.manager = manager;
        this.id = manager.getNextId();
        this.zIndex = this.id + 1;
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
        this.closeButton.addEventListener('click', () => {
            this.manager.removeWindow(this.id);
        });

        // Touch events para móvil
        if (this.isMobile) {
            this.header.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.startDrag(e.touches[0]);
            }, { passive: false });
            
            document.addEventListener('touchmove', (e) => {
                e.preventDefault();
                if (e.touches[0]) {
                    this.drag(e.touches[0]);
                }
            }, { passive: false });
            
            document.addEventListener('touchend', this.stopDrag);
        }

        // Mouse events para desktop
        this.header.addEventListener('mousedown', this.startDrag);
        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.stopDrag);
        
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.manager.removeWindow(this.id);
            }
        });

        this.element.addEventListener('mousedown', () => {
            this.manager.setFocus(this);
        });

        this.element.addEventListener('touchstart', () => {
            this.manager.setFocus(this);
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
