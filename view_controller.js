//!todelete
const c = (...e)=>console.log(...e);

//? position window popup controller

document.addEventListener('DOMContentLoaded', ()=>{
    const body = document.querySelector('body')
    
    class window {
        constructor(){
            this.html;
            this.x;
            this.y;
            this.width;
            this.height;
            this.cursor = {x:0, y:0};
            this.interacting = false;
            this.closeButton
            this.header;
            this.init();
            this.init_events();
            
        }


        init(){
            this.html = document.createElement("div");
            this.html.classList.add("window");
            this.html.innerHTML =
            '<header class="header_windows"><div class="close">x</div></header>';
            body.appendChild(this.html);
            this.html.style.right = "20%";
            this.html.style.top = "10%";

            this.header = this.html.querySelector(".header_windows");
            //close button
            this.closeButton = this.html.querySelector(".close");
            this.closeButton.addEventListener("click", () => this.html.remove());
/* 
            //borders
            let border = document.createElement("div");
            border.classList.add("borders");
            border.innerHTML = ` <div class="b-top"></div>
                <div class="b-right-top"></div>
                <div class="b-left-top"></div>
                <div class="b-right"></div>
                <div class="b-left"></div>
                <div class="b-right-bottom"></div>
                <div class="b-left-bottom"></div>
                <div class="b-bottom"></div>
            `;
            this.html.appendChild(border); */
          
        }

        // defino todos los eventos que se pueden hacer en la ventana
        init_events(){
            /* this.html.querySelector('.borders').addEventListener('mousedown',(e)=>this.resize(e));
            this.html.querySelector('.borders').addEventListener('mousemove',(e)=>this.moveResize(e)); */
            this.header.addEventListener('mousedown',(e)=>{this.click(e)});
            document.addEventListener('mousemove',(e)=>this.move(e));
            document.addEventListener('mouseup',()=>this.interacting = false);
            
        }

        click(e){
            this.cursor.x = e.clientX;
            this.cursor.y = e.clientY;
            this.interacting = true;
            this.x = this.html.getBoundingClientRect().left;
            this.y = this.html.getBoundingClientRect().top;
            
        }
        move(e){
            if (this.interacting){
                this.html.style.left = `${this.x + e.clientX - this.cursor.x}px`;
                this.html.style.top = `${this.y + e.clientY - this.cursor.y}px`;
            }
        }
        insert_content(content){
            this.html.appendChild(content);
        }    

    }

    class console {
      constructor() {
        this.command_list = {
          ls: this.ls,
          clear: () => {
            this.clear();
          },
          cls: () => {
            this.clear();
          },
          help: () => {
            this.help();
          },
        };
        this.html = document.createElement("div");
        this.html.classList.add("console");
        this.i_cache = 0;
        this.command_cache = [];
        this.results = [];
        this.html.innerHTML = `
                    <div id="comand-container">
                        <div class='result'></div>
                        <span id="user">manuel@portfolio</span>
                        <span style="color:rgb(255, 208, 0); margin-left: 10px;">
                            ~
                        </span>
                        <br>
                        <div class='tiping-container' >
                            <span style='margin-right:5px'>$</span>
                            <div  id="line-command" contenteditable="true"></div>
                        </div>
                    </div>`;
        this.line = this.html.querySelector("#line-command");
        this.line.focus();
        this.resutlHtml = this.html.querySelector(".result");

        this.html.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            var command = this.line.innerText;
            this.execute(this.line.innerText);
            this.line.innerText = "";
            this.command_cache.push(command);
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            this.line.textContent = this.command_cache[this.i_cache];
            this.i_cache =
              this.i_cache < this.command_cache.length
                ? this.i_cache + 1
                : (this.i_cache = 0);
          }
          //!TODO ARREGLAR
          /*  if (e.key === "ArrowDown"){
                    e.preventDefault();
                    if(this.i_cache == 0){
                        this.i_cache = this.command_cache.length - 1;   
                    }
                    else if{
                        this.i_cache--;
                    }
                    this.line.textContent = this.command_cache[this.i_cache];
                    c(this.i_cache,this.cache_command)
                } */
        });
      }

      render(result, command) {
        if (result != undefined) {
          c(command);
          this.resutlHtml.innerHTML =
            this.resutlHtml.innerHTML +
            `<span id="user">manuel@portfolio</span>
                <span style="color:rgb(255, 208, 0); margin-left: 10px;">
                    ~
                </span>
                <br><p style="margin:5px 0px 5px 0px"><span style='margin-right:5px'>$` +
            command +
            `</span>` +
            result +
            `</p>`;
        }
      }
      execute(command) {
        if (this.command_list[command]) {
          let result = this.command_list[command]();
          this.render(result, command);
        } else {
          this.render(
            '<div style="color:rgb(183, 42, 42)">command not found<div>',
            command
          );
        }
      }
      ls() {
        this.render('<div id="ls"></div>');
        let contain = document.querySelector("#ls");
        let text = ["hola", "mundo", "como", "estas", "hoy", "?"];
        text.forEach((t) => {
          let s = document.createElement("div");
          s.textContent = t;
          contain.appendChild(s);
        });
      }
      help() {
        this.render('<div id="help"></div>');
        let contain = document.querySelector("#help");
        let text = ["lista de comandos:", "ls", "skills"];
        text.forEach((t) => {
          let s = document.createElement("div");
          s.textContent = t;
          contain.appendChild(s);
        });
      }

      clear() {
        this.resutlHtml.innerHTML = "";
      }
    }
    

    const init_iconos= ()=>{
        let iconos = document.querySelectorAll('.icono');
        iconos.forEach(icono=>{
            icono.addEventListener('click',()=>{
                let a = new window();
                a.insert_content(new console().html);
            })
        })
    }
    init_iconos();    

/*     const createButton =document.querySelector('button');
    createButton.addEventListener('click',(e)=>{
        new window();
        e.preventDefault()
    }) */
    
});