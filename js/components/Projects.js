import { createElement } from '../utils.js';

export class Projects {
    constructor() {
        this.projectsData = [
            {
                title: 'Proyecto 1',
                imgUrl: 'https://kzmgnyep8j3bkwx6vbs8.lite.vusercontent.net/placeholder.svg?height=100&width=200',
                desc: 'Descripción del proyecto 1',
                techs: ['html5', 'css3', 'js', 'react']
            },
            {
                title: 'Proyecto 2',
                imgUrl: 'https://kzmgnyep8j3bkwx6vbs8.lite.vusercontent.net/placeholder.svg?height=100&width=200',
                desc: 'Descripción del proyecto 2',
                techs: ['html5', 'css3', 'js', 'nodejs']
            }
        ];
        
        this.init();
        this.createProjectCards();
    }

    init() {
        this.element = createElement('div', 'container-home');
        this.element.innerHTML = `
            <header class="header-home">
                <div class="prev-post">
                    <i class="fa-solid fa-arrow-left"></i>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <i class="fa-regular fa-bookmark"></i>
                <div id="ip" contenteditable="true">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    PROYECTOS
                </div>
            </header>
            <div class="container-container-card-proyecto"></div>
        `;
        
        this.cardsContainer = this.element.querySelector('.container-container-card-proyecto');
    }

    createProjectCards() {
        const cardsHTML = this.projectsData.map(project => `
            <div class="container-card">
                <img class="img-card" src="${project.imgUrl}" alt="${project.title}">
                <div class="card">
                    <div class="card-header">
                        <h3>${project.title}</h3>
                    </div>
                    <div>
                        <p>${project.desc}</p>
                    </div>
                    <div class="card-footer">
                        <button class="view-project-btn">
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </button>
                        <div id="techs">
                            ${project.techs.map(tech => 
                                `<i class='fa-brands fa-${tech}'></i>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        this.cardsContainer.innerHTML = cardsHTML;
        this.setupProjectInteractions();
    }

    setupProjectInteractions() {
        const buttons = this.cardsContainer.querySelectorAll('.view-project-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseover', (e) => {
                this.showTooltip(e, "VER WEB!", button);
            });
        });
    }

    showTooltip(e, text, element) {
        const tooltip = createElement('div', 'popup', text);
        document.body.appendChild(tooltip);

        const updatePosition = (e) => {
            tooltip.style.left = e.clientX + 'px';
            tooltip.style.top = (e.clientY - 50) + 'px';
        };

        updatePosition(e);
        document.addEventListener('mousemove', updatePosition);

        element.addEventListener('mouseout', () => {
            document.body.removeChild(tooltip);
            document.removeEventListener('mousemove', updatePosition);
        }, { once: true });
    }
}
