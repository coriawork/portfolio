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
        return createElement('div', 'container-home', `
            <header class="header-home">
                <div class="prev-post">
                    <i class="fa-solid fa-arrow-left"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <i class="fa-regular fa-bookmark"></i>
                <div id="ip" contenteditable="true">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    Skills
                </div>
            </header>
            <div class="container-container-card-proyecto">
                <div class="container-card" style="flex-direction: column;">
                    <div class="card" style="margin: 20px;">
                        <div class="card-header">
                            <h3>Técnicas</h3>
                        </div>
                        <div>
                            <p>
                                • Frontend: HTML, CSS, JavaScript, React, Tailwind, Next.js.<br>
                                • Backend: Java, PHP, Node.js, Python.<br>
                                • Bases de datos: MySQL.<br>
                                • Otros: Laravel, Slim, Git.<br>
                            </p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3>Soft Skills</h3>
                        </div>
                        <div>
                            <p>
                                • Resolución de problemas<br>
                                • Trabajo en equipo y colaboración<br>
                                • Adaptabilidad<br>
                                • Pensamiento crítico<br>
                                • Atención al detalle<br>
                                • Comunicación efectiva<br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    createContactContent() {
        const contactElement = createElement('div', 'container-home', `
            <header class="header-home">
                <div class="prev-post">
                    <i class="fa-solid fa-arrow-left"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <i class="fa-regular fa-bookmark"></i>
                <div id="ip" contenteditable="true">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    Contacto
                </div>
            </header>
            <div class="container-contact container-container-card-proyecto">
                <div class="card-title">
                    <h2>CONTACTO</h2>
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
                <div class="divider"><div></div></div>
                <div class="card-contact">
                    <div class="container-icono">
                        <div class="icono-card email-contact">
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                        <div class="text-icono">Email</div>
                    </div>
                    <div class="container-icono">
                        <div class="icono-card github-contact">
                            <i class="fa-brands fa-github contacti"></i>
                        </div>
                        <div class="text-icono">Github</div>
                    </div>
                    <div class="container-icono">
                        <div class="icono-card linkedin-contact">
                            <i class="fa-brands fa-linkedin contacti"></i>
                        </div>
                        <div class="text-icono">Linkedin</div>
                    </div>
                </div>
                <div class="footer-contact">
                    <p>manuelcoriawork@gmail.com</p>
                </div>
            </div>
        `);

        // Setup contact interactions
        setTimeout(() => {
            const emailBtn = contactElement.querySelector('.email-contact');
            const githubBtn = contactElement.querySelector('.github-contact');
            const linkedinBtn = contactElement.querySelector('.linkedin-contact');

            if (emailBtn) emailBtn.addEventListener('click', () => {
                window.open('mailto:manuelcoriawork@gmail.com', '_blank');
            });
            
            if (githubBtn) githubBtn.addEventListener('click', () => {
                window.open('https://github.com/coriawork', '_blank');
            });
            
            if (linkedinBtn) linkedinBtn.addEventListener('click', () => {
                window.open('https://www.linkedin.com/in/manuel-coria-401022260/', '_blank');
            });
        }, 0);

        return contactElement;
    }
}

// Initialize the application
new PortfolioApp();
