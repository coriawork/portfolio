// Cursor personalizado
/* document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
}); */

// Efecto hover
/* document.addEventListener('mousedown', (e) => {
	const cursor = document.querySelector('.cursor');
	cursor.classList.add('selecting');
});

document.addEventListener('mouseup', (e) => {
	const cursor = document.querySelector('.cursor');
	cursor.classList.remove('selecting');
});
document.addEventListener('mouseover', (e) => {
    const cursor = document.querySelector('.cursor');
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName == "I" ||
      e.target.classList.contains("close") ||
      e.target.tagName == "A" ||
      e.target.classList.contains("header_windows")
    ) {
      cursor.style.width = "30px";
      cursor.style.height = "30px";
    }

}); */
/* 
document.addEventListener('mouseout', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.width = '20px';
    cursor.style.height = '20px';
}); */

//!todelete
const c = (...e)=>console.log(...e);

const $ = (e)=>document.querySelector(e);
const $$ = (e) => document.querySelectorAll(e);


//? position window popup controller
/* function lluvia(canvas) {
	const context = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const fontSize = 16;
	const columns = canvas.width / fontSize;

	// Array para mantener la posición Y de las columnas
	const drops = Array.from({ length: columns }).fill(1);

	function draw() {
		// Ligeramente transparente para crear el efecto de "desvanecimiento"
		context.fillStyle = "rgba(0, 0, 0, 0.05)";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "#0F0"; // Letras en verde
		context.font = `${fontSize}px monospace`;

		for (let i = 0; i < drops.length; i++) {
			const text = characters.charAt(
				Math.floor(Math.random() * characters.length)
			);
			context.fillText(text, i * fontSize, drops[i] * fontSize);

			// Si la gota llega al final de la pantalla, reiníciala en la parte superior
			if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
				drops[i] = 0;
			}
			drops[i]++;
		}
	}

	setInterval(draw, 50);
}
 */

/* class Game{
	constructor(){
		this.html = document.createElement('div');
		this.html.classList = 'container-game';
		this.canvas = document.createElement('canvas')
		this.canvas.id = "gameCanvas";
		this.html.appendChild(this.canvas);
	}

	initGame(){
		const ctx = this.canvas.getContext('2d');
		this.canvas.width = 800;
		this.canvas.height = 400;

		const paddleWidth = 10;
		const paddleHeight = 60;
		let leftPaddleY = this.canvas.height/2 - paddleHeight/2;
		let rightPaddleY = this.canvas.height/2 - paddleHeight/2;
		const paddleSpeed = 5;

		let ballX = this.canvas.width/2;
		let ballY = this.canvas.height/2;
		let ballSpeedX = 4;
		let ballSpeedY = 4;
		const ballSize = 8;

		let leftScore = 0;
		let rightScore = 0;

		const keys = {
			w: false,
			s: false,
			ArrowUp: false, 
			ArrowDown: false
		};

		document.addEventListener('keydown', e => keys[e.key] = true);
		document.addEventListener('keyup', e => keys[e.key] = false);

		const countdown = () => {
      let count = 3;
      const countInterval = setInterval(() => {
        if (count > 0) {
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          ctx.fillStyle = "white";
          ctx.font = "48px Arial";
          ctx.fillText(
            count,
            this.canvas.width / 2 - 10,
            this.canvas.height / 2
          );
          count--;
        } else {
					gameLoop();
          clearInterval(countInterval);
        }
      }, 1000);
      
    };

    countdown();

		const gameLoop = () => {
			// Move paddles
			if(keys.w && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
			if(keys.s && leftPaddleY < this.canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
			if(keys.ArrowUp && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
			if(keys.ArrowDown && rightPaddleY < this.canvas.height - paddleHeight) rightPaddleY += paddleSpeed;

			// Move ball
			ballX += ballSpeedX;
			ballY += ballSpeedY;

			// Ball collision with paddles
			if(ballX < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
				ballSpeedX = -ballSpeedX;
			}
			if(ballX > this.canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
				ballSpeedX = -ballSpeedX;
			}

			// Ball collision with walls
			if(ballY < 0 || ballY > this.canvas.height) ballSpeedY = -ballSpeedY;

			// Score points
			if(ballX < 0) {
				rightScore++;
				ballX = this.canvas.width/2;
				ballY = this.canvas.height/2;
			}
			if(ballX > this.canvas.width) {
				leftScore++;
				ballX = this.canvas.width/2;
				ballY = this.canvas.height/2;
			}

			// Draw everything
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			ctx.fillStyle = 'red';
			ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
			ctx.fillStyle = 'blue';
			ctx.fillRect(this.canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
			ctx.fillStyle = 'white';
			ctx.fillRect(ballX - ballSize/2, ballY - ballSize/2, ballSize, ballSize);

			// Draw score
			ctx.font = '24px Arial';
			ctx.fillText(leftScore, 100, 50);
			ctx.fillText(rightScore, this.canvas.width - 100, 50);
		
			requestAnimationFrame(gameLoop);
			
		}
		let boton = document.createElement("button");
		boton.textContent = "reset";
		boton.classList = "reset";
		boton.addEventListener("click", () => {
			leftScore = 0;
			rightScore = 0;
		});
		this.html.appendChild(boton);

	}

}
 */

const windows = {}
var focused = undefined;
document.addEventListener('DOMContentLoaded', ()=>{
		const body = $('body')

		const closeToast = () => {
			$('.toast').remove()
		}

		$('#close-toast').addEventListener('click', () => closeToast());

		const remover = (obj)=>{
			delete windows[obj.id]
			obj.remove()
			obj = null

			c(windows)
		}
		const proyects = [
			{
				title:'	Proyecto 1',
				imgUrl:'https://kzmgnyep8j3bkwx6vbs8.lite.vusercontent.net/placeholder.svg?height=100&width=200',
				desc:'descripcion',
				techs:['html5','css3','js','react']
			},
			{
				title:'	Proyecto 1',
				imgUrl:'https://kzmgnyep8j3bkwx6vbs8.lite.vusercontent.net/placeholder.svg?height=100&width=200',
				desc:'descripcion',
				techs:['html5','css3','js','react']
			}
		]
		class proyect{
			constructor(){
				this.html = document.createElement('div');
				this.html.classList = 'container-home';
				this.init()
				this.container_card = this.html.querySelector(".container-container-card-proyecto");
				c(this.container_card)
				this.createCards();

			}	
			init(){
				this.html.innerHTML = `
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
					<div class="container-container-card-proyecto">
					</div>
				`;
      		  	
				
			}
			createPopup = (e, text,bot) => {
				const popup = document.createElement('div');
				popup.classList.add('popup');
				popup.innerText = text;
				document.body.insertBefore(popup, document.body.firstChild);

				const movePopup = (e) => {
					popup.style.left = e.clientX  + 'px';
					popup.style.top = e.clientY - 50 + 'px';
				};

				document.addEventListener('mousemove', movePopup);

				bot.addEventListener('mouseout', () => {
					document.body.removeChild(popup);
					document.removeEventListener('mousemove', movePopup);
				});
			};
			createCards(){
				let aux = ''
				proyects.forEach(data => {
					aux += `<div class="container-card">
							<img class="img-card" src="${data.imgUrl}" alt="">
							<div class="card">
								<div class="card-header">
									<h3>${data.title}</h3>
								</div>
								<div>
									<p>${data.desc}</p>
								</div>
								<div class="card-footer">
									<button id="popout"><i class="fa-solid fa-up-right-from-square"></i></button>
									<div id="techs">
										${data.techs
											.map((tech) => `<i class='fa-brands fa-${tech}'></i>`)
											.join("")
										}
									</div>
								</div>
							</div>
						</div>
					`
				});
				this.container_card.innerHTML = aux;
				this.container_card.querySelectorAll('#popout').forEach(popup => {
					popup.addEventListener('mouseover', (e) => {
						this.createPopup(e, "VER WEB!", popup);
					});
				});
			}
		}	
		
		class windows {
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
					this.z_index = 0;
					this.init();
					this.init_events();
					this.html.tabIndex = 0;
					this.html.click()

					//manejo de keys
					let keys = Object.keys(windows);
					keys[0] === undefined ? this.id = 0 : this.id = Number(keys[keys.length - 1]) + 1;
					windows[this.id] = this
					
					if(focused != undefined){
						this.setZindex(focused.z_index + 1)
					}
					else{	
						this.setZindex(1)
					}
					focused = this;
				}
				
				get_html(){
					return this.html
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
						this.closeButton.addEventListener("click", () => remover(this));
						/* 
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
				setZindex(num){
					this.z_index = num;
					this.html.style.zIndex = this.z_index;
				}
				// defino todos los eventos que se pueden hacer en la ventana
				init_events(){
						/* this.html.querySelector('.borders').addEventListener('mousedown',(e)=>this.resize(e));
						this.html.querySelector('.borders').addEventListener('mousemove',(e)=>this.moveResize(e)); */
						this.header.addEventListener('mousedown',(e)=>{this.click(e)});
						document.addEventListener('mousemove',(e)=>this.move(e));
						document.addEventListener('mouseup',()=>this.interacting = false);
						this.html.addEventListener("keydown", (e) => e.key === "Escape" && remover(this));         
						this.html.addEventListener('mousedown',()=>{
							if(focused != undefined && focused != this){
								c(focused)
								let aux = focused.z_index;
								focused.setZindex(this.z_index);
								this.setZindex(aux);
								focused = this
							}
						}) 
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
				remove(){
					this.html.remove()
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
				let contain = $("#ls");
				let text = ["hola", "mundo", "como", "estas", "hoy", "?"];
				text.forEach((t) => {
					let s = document.createElement("div");
					s.textContent = t;
					contain.appendChild(s);
				});
			}
			help() {
				this.render('<div id="help"></div>');
				let contain = $("#help");
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
		class contact{
			constructor(){
				this.html = document.createElement('div');
				this.html.classList = 'container-home';
				this.init()
			}
			init(){
				this.html.innerHTML = `
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
					<div class="container-contact container-container-card-proyecto" >
						<div class="card-title">
							<h2>CONTACTO</h2>
							<i class="fa-solid fa-paper-plane"></i>
						</div>
						<div class="divider"><div></div></div>
						<div class="card-contact">
							<div class="container-icono">
								<div class="icono-card">
									<i class="fa-solid fa-envelope"></i>
								</div>
								<div class="text-icono">Email</div>
							</div>
							<div class="container-icono">
								<div class="icono-card">
									<i class="fa-brands fa-github contacti"></i>
								</div>
								<div class="text-icono">Github</div>
							</div>
							<div class="container-icono">
								<div class="icono-card">
									<i class="fa-brands fa-linkedin contacti"></i>
								</div>
								<div class="text-icono">Linkedin</div>
							</div>
						</div>  
						<div class="footer-contact">
							<p>manuelcoriawork@gmail.com</p>
						</div>
					</div>
				`;
				let cards = this.html.querySelectorAll('.icono-card');
				c(cards)
				cards[0].addEventListener('click', () => {
					c('mail')
					window.open('mailto:manuelcoriawork@gmail.com', '_blank');
				});
				cards[1].addEventListener('click', () => {
					window.open('https://github.com/coriawork', '_blank');
				});
				cards[2].addEventListener('click', () => {
					window.open('https://www.linkedin.com/in/manuel-coria-401022260/', '_blank');
				});
			}
			
		}

		const new_contact = ()=>{
			new windows().insert_content(new contact().html);
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
											Sobre Mi
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
																	<p><b>cursando </b></p><p>3er año (activo) </p>
															</div> 
													</section>
											</section>
									</article>
							</section>
			`;
			wiki_div.innerHTML = wiki_component    
			new windows().insert_content(wiki_div)
		}
		const new_skils = ()=>{
			const skills = document.createElement('div');
			skills.innerHTML = `
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
                            <h3>SOFT SKILLS</h3>
                        </div>
                        <div>
                            <p>La descripcion de este proyecto Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illo facilis aliquam voluptatibus deserunt soluta explicabo cupiditate fugit aut, quos repellendus consequatur doloremque. Commodi ipsum nisi iusto excepturi doloribus eligendi! </p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h3>HARD SKILLS</h3>
                        </div>
                        <div>
                            <p>La descripcion de este proyecto Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illo facilis aliquam voluptatibus deserunt soluta explicabo cupiditate fugit aut, quos repellendus consequatur doloremque. Commodi ipsum nisi iusto excepturi doloribus eligendi! </p>
                        </div>
                    </div>
                </div>
            </div>
			`;  
			skills.classList = "container-home";
			new windows().insert_content(skills)
		}
		const new_warning = ()=>{
			const warning_div = document.createElement('div');
			warning_div.innerHTML = `<i class="fa-solid fa-warning"></i>
							<p>Lo sentimos estamos trabajando en esta pagina</p>
							<p>regresa mas tarde quizas ya este lista...</p>
			`;  
			warning_div.classList = 'container-warning'
			new windows().insert_content(warning_div)
		}
		const new_proyectos = ()=>{
			new windows().insert_content(new proyect().html)
		}

		const iconos_dic = {
			console: () => new windows().insert_content(new console().html),
			home: () => new_wiki(),
			warning: () => new_warning(),
			game: () => new_game(),
			proyectos: () => new_proyectos(),
			skill: () => new_skils(),
			contact: () => new_contact()
		};    

		const init_iconos= ()=>{
				let iconos = $$('.icono');
				iconos.forEach(icono=>{
						icono.addEventListener('click',(e)=>{
							iconos_dic[e.target.id]();
						})
				})
		}

		init_iconos();    
});
