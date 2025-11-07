import { createElement } from '../utils.js';

export class Projects {
    constructor() {
        this.projectsData = [
            {
                title: 'portfolio-rare',
                description: 'Portfolio interactivo con diseño de escritorio virtual, múltiples ventanas y experiencia única de usuario. Incluye terminal funcional y componentes modulares.',
                language: 'JavaScript',
                languageColor: '#f1e05a',
                stars: '12',
                forks: '3',
                updated: '2 days ago',
                topics: ['portfolio', 'javascript', 'css', 'modules', 'desktop-ui']
            },
            {
                title: 'ecommerce-platform',
                description: 'Plataforma completa de comercio electrónico con carrito de compras, pasarela de pagos Stripe, panel de administración y gestión de inventario.',
                language: 'React',
                languageColor: '#61dafb',
                stars: '28',
                forks: '8',
                updated: '5 days ago',
                topics: ['react', 'nodejs', 'mongodb', 'stripe', 'ecommerce']
            },
            {
                title: 'task-management-app',
                description: 'Aplicación de gestión de tareas con colaboración en tiempo real usando Socket.io, notificaciones push y reportes de productividad.',
                language: 'Vue',
                languageColor: '#4fc08d',
                stars: '15',
                forks: '4',
                updated: '1 week ago',
                topics: ['vue', 'laravel', 'socketio', 'mysql', 'productivity']
            },
            {
                title: 'api-rest-authentication',
                description: 'API RESTful robusta con autenticación JWT, middleware de seguridad, rate limiting y documentación completa con Swagger.',
                language: 'PHP',
                languageColor: '#777bb4',
                stars: '22',
                forks: '7',
                updated: '3 days ago',
                topics: ['php', 'jwt', 'api', 'security', 'laravel']
            }
        ];
        
        this.init();
        this.createProjectCards();
    }

    init() {
        this.element = createElement('div', 'github-style');
        this.element.innerHTML = `
            <div class="github-header">
                <i class="fa-solid fa-book repo-icon"></i>
                <h1>Repositorios públicos</h1>
            </div>
            <div class="github-tabs">
                <a href="#" class="github-tab">
                    <i class="fa-solid fa-book"></i> Repositories
                </a>
            </div>
            <div class="github-content">
                <ul class="repo-list"></ul>
            </div>
        `;
        
        this.cardsContainer = this.element.querySelector('.repo-list');
    }

    createProjectCards() {
        const cardsHTML = this.projectsData.map(project => `
            <li class="repo-item">
                <div class="repo-info">
                    <h3><a href="#">${project.title}</a></h3>
                    <p class="repo-description">${project.description}</p>
                    <div class="repo-meta">
                        <span class="repo-language">
                            <span class="language-color" style="background-color: ${project.languageColor}"></span>
                            ${project.language}
                        </span>
                        <span>
                            <i class="fa-solid fa-star"></i> ${project.stars}
                        </span>
                        <span>
                            <i class="fa-solid fa-code-fork"></i> ${project.forks}
                        </span>
                        <span>Actualizado ${project.updated}</span>
                    </div>
                    <div style="margin-top: 12px;">
                        ${project.topics.map(topic => 
                            `<span style="background-color: #f1f8ff; color: #0969da; padding: 2px 6px; border-radius: 12px; font-size: 11px; margin-right: 4px; border: 1px solid #d1d9e0;">${topic}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="repo-stats">
                    <div style="display: flex; gap: 8px;">
                        <a href="#" class="repo-btn">
                            <i class="fa-solid fa-external-link-alt"></i> Demo
                        </a>
                        <a href="#" class="repo-btn secondary">
                            <i class="fa-brands fa-github"></i> Code
                        </a>
                    </div>
                </div>
            </li>
        `).join('');
        
        this.cardsContainer.innerHTML = cardsHTML;
        this.setupProjectInteractions();
    }

    setupProjectInteractions() {
        const demoButtons = this.cardsContainer.querySelectorAll('[data-demo]');
        const codeButtons = this.cardsContainer.querySelectorAll('[data-code]');
        
        demoButtons.forEach(button => {
            button.addEventListener('click', () => {
                const url = button.dataset.demo;
                if (url !== '#') {
                    window.open(url, '_blank');
                } else {
                    this.showTooltip(button, "Demo próximamente disponible");
                }
            });
        });

        codeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const url = button.dataset.code;
                if (url !== '#') {
                    window.open(url, '_blank');
                } else {
                    this.showTooltip(button, "Código próximamente disponible");
                }
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = createElement('div', 'popup', text);
        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 40) + 'px';

        setTimeout(() => {
            if (document.body.contains(tooltip)) {
                document.body.removeChild(tooltip);
            }
        }, 2000);
    }
}
