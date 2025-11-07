import { createElement, $ } from '../utils.js';

export class Console {
    constructor() {
        this.commandHistory = [];
        this.historyIndex = 0;
        this.isMobile = window.innerWidth <= 768;
        this.commands = {
            ls: () => this.listFiles(),
            clear: () => this.clear(),
            cls: () => this.clear(),
            help: () => this.showHelp(),
            // Agregar comando para móvil
            touch: () => this.isMobile ? 'Dispositivo táctil detectado' : 'Usa mouse y teclado'
        };
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        this.element = createElement('div', 'console');
        this.element.innerHTML = `
            <div id="command-container">
                <div class='result'></div>
                <span id="user">manuel@portfolio</span>
                <span style="color:rgb(255, 208, 0); margin-left: 10px;">~</span>
                <br>
                <div class='typing-container'>
                    <span style='margin-right:5px'>$</span>
                    <div id="line-command" contenteditable="true" 
                         ${this.isMobile ? 'inputmode="text" autocomplete="off" autocorrect="off" spellcheck="false"' : ''}></div>
                </div>
            </div>
        `;
        
        this.commandLine = this.element.querySelector('#line-command');
        this.resultContainer = this.element.querySelector('.result');
        
        // Focus automático solo en desktop
        if (!this.isMobile) {
            this.commandLine.focus();
        }
    }

    setupEventListeners() {
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = this.commandLine.textContent.trim();
                this.executeCommand(command);
                this.commandLine.textContent = '';
                this.commandHistory.push(command);
                this.historyIndex = 0;
                
                // Scroll al final en móvil
                if (this.isMobile) {
                    setTimeout(() => {
                        this.element.scrollTop = this.element.scrollHeight;
                    }, 100);
                }
            }
            
            // Solo permitir navegación con flechas en desktop
            if (!this.isMobile) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateHistory(-1);
                }
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateHistory(1);
                }
            }
        });

        // Mejorar experiencia táctil
        if (this.isMobile) {
            this.commandLine.addEventListener('click', () => {
                this.commandLine.focus();
            });
            
            // Agregar mensaje de bienvenida para móvil
            setTimeout(() => {
                this.addOutput('', 'Toca para escribir comandos. Escribe "help" para ver opciones.');
            }, 500);
        }
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        this.historyIndex = Math.max(0, Math.min(
            this.commandHistory.length - 1,
            this.historyIndex + direction
        ));
        
        this.commandLine.textContent = this.commandHistory[this.historyIndex] || '';
    }

    executeCommand(command) {
        const result = this.commands[command] ? this.commands[command]() : 
            '<div style="color:rgb(183, 42, 42)">command not found</div>';
        
        this.addOutput(command, result);
    }

    addOutput(command, result) {
        if (!result) return;
        
        const output = `
            <span id="user">manuel@portfolio</span>
            <span style="color:rgb(255, 208, 0); margin-left: 10px;">~</span>
            <br>
            <p style="margin:5px 0px 5px 0px">
                <span style='margin-right:5px'>$ ${command}</span>
                ${result}
            </p>
        `;
        
        this.resultContainer.innerHTML += output;
    }

    listFiles() {
        const files = ['projects', 'skills', 'contact', 'about'];
        return '<div>' + files.map(file => `<div>${file}</div>`).join('') + '</div>';
    }

    showHelp() {
        const commands = Object.keys(this.commands);
        const helpText = this.isMobile ? 
            'Comandos disponibles (toca para escribir):<br>' + commands.join('<br>') :
            'Comandos disponibles:<br>' + commands.join('<br>');
        return '<div>' + helpText + '</div>';
    }

    clear() {
        this.resultContainer.innerHTML = '';
        return '';
    }
}
