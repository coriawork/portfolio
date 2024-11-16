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

    const new_wiki = ()=>{
      let wiki_div = document.createElement('div'); wiki_div.classList = 'container-home'
      const wiki_component = `
              <header class="header-home">
                  <div class="prev-post">
                      <i class="fa-solid fa-arrow-left"></i>
                      <i class="fa-solid fa-arrow-right"></i>
                  </div>
                  <i class="fa-regular fa-bookmark"></i>
                  <div id="ip" contenteditable="true">
                      <i class="fa-solid fa-circle-exclamation"></i>
                      127.0.0.1:8000
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
                              Soy desarrollador full-stack con más de 7 años de experiencia, combinando aprendizaje autodidacta con formación académica. Mi pasión por la tecnología comenzó en la escuela secundaria y desde entonces he trabajado en diversos proyectos, aplicando lenguajes de programación, frameworks modernos y metodologías ágiles. Actualmente, estudio la Licenciatura en Sistemas en la Universidad Nacional de La Plata, donde perfecciono mis habilidades técnicas y de resolución de problemas.
                              <br>
                              Además de desarrollar software, disfruto explorar nuevas tecnologías y compartir conocimientos. Mi meta es seguir creciendo como profesional, participando en proyectos innovadores y desafiantes.
                              <br>
                              <b>Si quieres saber más sobre mi trabajo, te invito a explorar los proyectos destacados y habilidades en este portafolio.
                              </b><br>

                          </p>
                      </section>
                      <section class="information">
                          <h2>Manuel Coria</h2>
                          <img id="profile" src="profile.jpg" alt="">
                          <h3>Informacion personal</h3>
                          <section>
                              <div>
                                  <p><b>Edad </b></p><p>22 años</p>
                              </div> 
                              <div>
                                  <p><b>Nacionalidad </b></p><p>Argentina</p>
                              </div> 
                              <div>
                                  <p><b>Idiomas </b></p><p>Español, Ingles</p>
                              </div> 
                          </section>
                          <h3>Estudios</h3>
                          <section>
                              <div>
                                  <p><b>Universidad </b></p><p><a href="">Universidad Nacional de La Plata</a></p>
                              </div> 
                              <div>
                                  <p><b>Carreras </b></p><p> Liceniatura en sistemas</p>
                              </div> 
                              <div>
                                  <p><b>Actualmente </b></p><p>3er año (activo) </p>
                              </div> 
                          </section>
                      </section>
                  </article>
              </section>
      `;
      wiki_div.innerHTML = wiki_component    
      new window().insert_content(wiki_div)
    }

    const new_warning = ()=>{
      const warning_div = document.createElement('div');
      warning_div.innerHTML = `<i class="fa-solid fa-warning"></i>
              <p>Lo sentimos estamos trabajando en esta pagina</p>
              <p>regresa mas tarde quizas ya este lista...</p>
      `;  
      warning_div.classList = 'container-warning'
      new window().insert_content(warning_div)
    }



    const iconos_dic = {
      console: () => new window().insert_content(new console().html),
      home: () => new_wiki(),
      warning: () => new_warning(),
      proyectos: () => proyectos(),
    };    

    const init_iconos= ()=>{
        let iconos = document.querySelectorAll('.icono');
        iconos.forEach(icono=>{
            icono.addEventListener('click',(e)=>{
              iconos_dic[e.target.id]();
            })
        })
    }
    init_iconos();    
    
});