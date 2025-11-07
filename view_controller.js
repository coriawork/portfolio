import WindowManager from './js/WindowManager.js';
import { Console } from './js/components/Console.js';
import { Projects } from './js/components/Projects.js';
import { $, $$, createElement } from './js/utils.js';

class PortfolioApp {
    constructor() {
        this.windowManager = new WindowManager();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupToast();
            this.setupIconHandlers();
        });
    }

    setupToast() {
        const closeToast = () => {
            const toast = $('.toast');
            if (toast) toast.remove();
        };

        const closeButton = $('#close-toast');
        if (closeButton) {
            closeButton.addEventListener('click', closeToast);
        }
    }

    setupIconHandlers() {
        const iconHandlers = {
            console: () => this.createConsoleWindow(),
            home: () => this.createAboutWindow(),
            skill: () => this.createSkillsWindow(),
            warning: () => this.createProjectsWindow(),
            contact: () => this.createContactWindow()
        };

        const icons = $$('.icono');
        icons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const handler = iconHandlers[e.target.id];
                if (handler) {
                    handler();
                } else {
                    this.createWarningWindow();
                }
            });
        });
    }

    createConsoleWindow() {
        const window = this.windowManager.createWindow();
        const console = new Console();
        window.setContent(console.element);
    }

    createProjectsWindow() {
        const window = this.windowManager.createWindow();
        const projects = new Projects();
        window.setContent(projects.element);
    }

    createAboutWindow() {
        const window = this.windowManager.createWindow();
        const about = this.createAboutContent();
        window.setContent(about);
    }

    createSkillsWindow() {
        const window = this.windowManager.createWindow();
        const skills = this.createSkillsContent();
        window.setContent(skills);
    }

    createContactWindow() {
        const window = this.windowManager.createWindow();
        const contact = this.createContactContent();
        window.setContent(contact);
    }

    createWarningWindow() {
        const window = this.windowManager.createWindow();
        const warning = createElement('div', 'container-warning', `
            <i class="fa-solid fa-warning"></i>
            <p>Lo sentimos, estamos trabajando en esta página</p>
            <p>Regresa más tarde, quizás ya esté lista...</p>
        `);
        window.setContent(warning);
    }

    createAboutContent() {
        return createElement('div', 'container-home', `
            <header class="header-home">
                <div class="prev-post">
                    <i class="fa-solid fa-arrow-left"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <i class="fa-regular fa-bookmark"></i>
                <div id="ip" contenteditable="true">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    Sobre Mi
                </div>
            </header>
            <section class="secction-home">
                <div class="header-content">
                    <i class="fa-solid fa-bars"></i>
                    <a class="img-block" href="www.wikipedia.com">
                        <img id="word" src="https://es.wikipedia.org/static/images/icons/wikipedia.png" alt="">
                        <div class="img-text">
                            <img id="text1" src="https://es.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en.svg" alt="">
                            <img id="text1" src="https://es.wikipedia.org/static/images/mobile/copyright/wikipedia-tagline-es.svg" alt="">
                        </div>
                    </a>
                    <div class="navigate">
                        <i class="fa-sharp-duotone fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Buscar en wikipedia">
                        <button class="navigate-button">Buscar</button>
                    </div>
                </div>
                <article class="article-content">
                    <section class="description">
                        <header>
                            <h1>Manuel Coria</h1>
                        </header>
                        <p>
                            Soy desarrollador full-stack con 7 años de aprendizaje, combinando estudio autodidacta con formación académica. Mi pasión por la tecnología comenzó en la escuela secundaria y desde entonces he trabajado en diversos proyectos, aplicando lenguajes de programación, frameworks modernos y metodologías ágiles. Actualmente, estudio la Licenciatura en Sistemas en la Universidad Nacional de La Plata, donde perfecciono mis habilidades técnicas y de resolución de problemas.
                            <br><br>
                            Además de desarrollar software, disfruto explorar nuevas tecnologías y compartir conocimientos. Mi meta es seguir creciendo como profesional, participando en proyectos innovadores y desafiantes.
                            <br><br>
                            <b>Si quieres saber más sobre mi trabajo, te invito a explorar los proyectos destacados y habilidades en este portafolio.</b>
                        </p>
                    </section>
                    <section class="information">
                        <h2>Manuel Coria</h2>
                        <img id="profile" src="profile.jpg" alt="">
                        <h3>Información personal</h3>
                        <section>
                            <div><p><b>Edad</b></p><p>22 años</p></div>
                            <div><p><b>Nacionalidad</b></p><p>Argentina</p></div>
                            <div><p><b>Idiomas</b></p><p>Español, Inglés</p></div>
                        </section>
                        <h3>Estudios</h3>
                        <section>
                            <div><p><b>Universidad</b></p><p><a href="">Universidad Nacional de La Plata</a></p></div>
                            <div><p><b>Carrera</b></p><p>Licenciatura en sistemas</p></div>
                            <div><p><b>Cursando</b></p><p>3er año (activo)</p></div>
                        </section>
                    </section>
                </article>
            </section>
        `);
    }

    createSkillsContent() {
        const skillsData = [
            // Lenguajes
            { name: 'PHP', category: 'Lenguajes', level: 'expert',  icon: 'fa-code' },
            { name: 'JavaScript (ES6+)', category: 'Lenguajes', level: 'expert',  icon: 'fa-code' },
            { name: 'SQL', category: 'Lenguajes', level: 'advanced',  icon: 'fa-code' },
            { name: 'Java', category: 'Lenguajes', level: 'advanced',  icon: 'fa-code' },
            { name: 'Bash/Shell scripting', category: 'Lenguajes', level: 'intermediate',  icon: 'fa-code' },
            { name: 'TypeScript', category: 'Lenguajes', level: 'beginner',  icon: 'fa-code' },
            { name: 'Python', category: 'Lenguajes', level: 'beginner',  icon: 'fa-code' },
            
            // Frontend
            { name: 'React', category: 'Frontend', level: 'advanced',  icon: 'fa-palette' },
            { name: 'Next.js', category: 'Frontend', level: 'intermediate',  icon: 'fa-palette' },
            { name: 'Vue.js', category: 'Frontend', level: 'intermediate',  icon: 'fa-palette' },
            { name: 'jQuery', category: 'Frontend', level: 'advanced',  icon: 'fa-palette' },
            { name: 'Tailwind CSS', category: 'Frontend', level: 'expert',  icon: 'fa-palette' },
            { name: 'Bootstrap', category: 'Frontend', level: 'expert',  icon: 'fa-palette' },
            { name: 'Material UI', category: 'Frontend', level: 'expert',  icon: 'fa-palette' },
            { name: 'shadcn/ui', category: 'Frontend', level: 'expert',  icon: 'fa-palette' },
            { name: 'Vite', category: 'Frontend', level: 'expert',  icon: 'fa-palette' },
            
            // Backend
            { name: 'Node.js', category: 'Backend', level: 'advanced',  icon: 'fa-server' },
            { name: 'Express.js', category: 'Backend', level: 'advanced',  icon: 'fa-server' },
            { name: 'Laravel', category: 'Backend', level: 'expert',  icon: 'fa-server' },
            { name: 'Slim', category: 'Backend', level: 'expert',  icon: 'fa-server' },
            { name: 'Symfony', category: 'Backend', level: 'intermediate',  icon: 'fa-server' },
            { name: 'Flask', category: 'Backend', level: 'intermediate',  icon: 'fa-server' },
            { name: 'Django', category: 'Backend', level: 'beginner',  icon: 'fa-server' },
            { name: 'Spring Boot', category: 'Backend', level: 'beginner',  icon: 'fa-server' },
            
            // Arquitecturas
            { name: 'APIs RESTful', category: 'Arquitecturas', level: 'expert',  icon: 'fa-sitemap' },
            { name: 'JWT', category: 'Arquitecturas', level: 'advanced',  icon: 'fa-sitemap' },
            { name: 'OAuth2', category: 'Arquitecturas', level: 'intermediate',  icon: 'fa-sitemap' },
            { name: 'Monolítico', category: 'Arquitecturas', level: 'advanced',  icon: 'fa-sitemap' },
            { name: 'MVC', category: 'Arquitecturas', level: 'expert',  icon: 'fa-sitemap' },
            { name: 'Arquitectura Limpia', category: 'Arquitecturas', level: 'advanced',  icon: 'fa-sitemap' },
            
            // Bases de datos
            { name: 'MySQL', category: 'Database', level: 'expert',  icon: 'fa-database' },
            { name: 'PostgreSQL', category: 'Database', level: 'intermediate',  icon: 'fa-database' },
            { name: 'SQLite', category: 'Database', level: 'advanced',  icon: 'fa-database' },
            { name: 'Sequelize', category: 'Database', level: 'advanced',  icon: 'fa-database' },
            { name: 'Eloquent ORM', category: 'Database', level: 'expert',  icon: 'fa-database' },
            
            // Testing
            { name: 'PHPUnit', category: 'Testing', level: 'intermediate',  icon: 'fa-vial' },
            { name: 'Pytest', category: 'Testing', level: 'beginner',  icon: 'fa-vial' },
            
            // Herramientas
            { name: 'Git', category: 'Tools', level: 'expert',  icon: 'fa-wrench' },
            { name: 'GitHub', category: 'Tools', level: 'expert',  icon: 'fa-wrench' },
            { name: 'GitLab', category: 'Tools', level: 'intermediate',  icon: 'fa-wrench' },
            { name: 'Agile', category: 'Tools', level: 'expert',  icon: 'fa-wrench' },
            { name: 'Scrum', category: 'Tools', level: 'expert',  icon: 'fa-wrench' },
            { name: 'Jira', category: 'Tools', level: 'intermediate',  icon: 'fa-wrench' },
            { name: 'Trello', category: 'Tools', level: 'advanced',  icon: 'fa-wrench' },
            { name: 'Notion', category: 'Tools', level: 'advanced',  icon: 'fa-wrench' },
            
            // Otros
            { name: 'JSON', category: 'Otros', level: 'expert',  icon: 'fa-cogs' },
            { name: 'Diseño Responsive', category: 'Otros', level: 'expert',  icon: 'fa-cogs' },
            { name: 'Integración de IA', category: 'Otros', level: 'intermediate',  icon: 'fa-cogs' },
            { name: 'Web Scraping', category: 'Otros', level: 'intermediate',  icon: 'fa-cogs' },
            { name: 'Integración de APIs', category: 'Otros', level: 'expert',  icon: 'fa-cogs' }
        ];

        const softSkills = [
            'Resolución de problemas',
            'Trabajo en equipo',
            'Adaptabilidad',
            'Pensamiento crítico',
            'Atención al detalle',
            'Comunicación efectiva',
            'Liderazgo',
            'Manejo de equipos',
            'Organización'
        ];

        const skillsElement = createElement('div', 'notion-style');
        skillsElement.innerHTML = `
            <div class="notion-header">
                <h1 class="notion-title">Tech Stack & Skills</h1>
                <p class="notion-subtitle">Una vista general de mis habilidades técnicas y experiencia en desarrollo</p>
            </div>
            <div class="notion-content">
                <div class="notion-callout">
                    <div class="notion-callout-icon">💡</div>
                    <div class="notion-callout-content">
                        <p><strong>5 años de experiencia</strong> combinando aprendizaje autodidacta con formación académica. Enfoque en desarrollo full-stack con tecnologías modernas.</p>
                    </div>
                </div>
                
                <div class="notion-section">
                    <h2><span class="notion-emoji"></span>Habilidades Técnicas</h2>
                    <div class="notion-database">
                        <div class="notion-table-header">
                            <div>Tecnología</div>
                            <div>Categoría</div>
                            <div>Nivel</div>
                        </div>
                        ${skillsData.map(skill => `
                            <div class="notion-table-row">
                                <div class="notion-skill-name">
                                    <i style="color: #555;" class="fa-solid ${skill.icon} notion-skill-icon"></i>
                                    ${skill.name}
                                </div>
                                <div class="notion-category ${skill.category}">${skill.category}</div>
                                <div class="notion-level">
                                    <div class="notion-level-bar">
                                        <div class="notion-level-fill ${skill.level}"></div>
                                    </div>
                                    
                                </div>

                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="notion-section">
                    <h2><span class="notion-emoji"></span>Soft Skills</h2>
                    <div class="notion-callout">
                        <div class="notion-callout-content">
                            <p><strong>Habilidades interpersonales y de gestión:</strong></p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin-top: 12px;">
                                ${softSkills.map(skill => `
                                    <span style="background-color: #e1ecf4; color: #39739d; padding: 6px 12px; border-radius: 6px; font-size: 13px; text-align: center;">
                                        ${skill}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="notion-section">
                    <h2><span class="notion-emoji"></span>Aprendizaje Continuo</h2>
                    <div class="notion-callout">
                        <div class="notion-callout-icon"></div>
                        <div class="notion-callout-content">
                            <p>Actualmente profundizando en: <strong>DevOps</strong>, <strong>Cloud Architecture</strong> y <strong>Microservicios</strong>. Siempre explorando nuevas tecnologías para crear mejores soluciones.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => {
            const levelBars = skillsElement.querySelectorAll('.notion-level-fill');
            levelBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.transition = 'width 0.8s ease';
                }, index * 50);
            });
        }, 500);

        return skillsElement;
    }

    createContactContent() {
        const contactElement = createElement('div', 'linkedin-style');
        contactElement.innerHTML = `
            <div class="linkedin-header">
                <h1>Manuel Coria</h1>
                <p class="linkedin-subtitle">Full-stack Developer | Estudiante de Sistemas</p>
            </div>
            <div class="linkedin-content">
                <div class="profile-summary">
                    <h2>Acerca de</h2>
                    <p>Desarrollador full-stack apasionado por crear soluciones tecnológicas innovadoras. Con 7 años de experiencia en desarrollo web, combinando aprendizaje autodidacta con formación académica. Actualmente cursando Licenciatura en Sistemas en la Universidad Nacional de La Plata.</p>
                </div>
                
                <div class="contact-card">
                    <div class="contact-card-header">
                        <i class="fa-solid fa-address-book"></i> Información de contacto
                    </div>
                    <div class="contact-card-body">
                        <div class="contact-methods-linkedin">
                            <a href="mailto:manuelcoriawork@gmail.com" class="contact-item email-contact">
                                <div class="contact-item-icon email">
                                    <i class="fa-solid fa-envelope"></i>
                                </div>
                                <div class="contact-item-info">
                                    <h3>Email</h3>
                                    <p>manuelcoriawork@gmail.com</p>
                                </div>
                            </a>
                            
                            <a href="https://github.com/coriawork" target="_blank" class="contact-item github-contact">
                                <div class="contact-item-icon github">
                                    <i class="fa-brands fa-github"></i>
                                </div>
                                <div class="contact-item-info">
                                    <h3>GitHub</h3>
                                    <p>Revisa mis repositorios y proyectos</p>
                                </div>
                            </a>
                            
                            <a href="https://www.linkedin.com/in/manuel-coria-401022260/" target="_blank" class="contact-item linkedin-contact">
                                <div class="contact-item-icon linkedin">
                                    <i class="fa-brands fa-linkedin"></i>
                                </div>
                                <div class="contact-item-info">
                                    <h3>LinkedIn</h3>
                                    <p>Conectemos profesionalmente</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="contact-card">
                    <div class="contact-card-header">
                        <i class="fa-solid fa-graduation-cap"></i> Educación
                    </div>
                    <div class="contact-card-body">
                        <h3 style="margin: 0 0 8px 0;">Universidad Nacional de La Plata</h3>
                        <p style="margin: 0; color: #666;">Licenciatura en Sistemas • 3er año (activo)</p>
                    </div>
                </div>
            </div>
        `;

        return contactElement;
    }
}

// Initialize the application
new PortfolioApp();
