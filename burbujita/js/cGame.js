function cGame(level, w,h,color_base, color_energia, color_manos, poder, aguante, vel, vel_ener, vel_vida, vel_trans_ener)
{
	//creadora ()
	//this.username = username;

	this.mapa = new cMapa(0,0,1);
	this.burbujita = new cBurbujita(this.mapa.burbujita_inicio()[0],this.mapa.burbujita_inicio()[1],0,0,"#"+color_base, "#"+color_energia, "#"+color_manos, poder);
	this.interficie = new cInterficie();
	this.imagenes = {};
	this.pintor = new cPintor(this.imagenes);
	this.fps = 60;
	this.totalImages = 35;
	this.imagesLoaded = 0;
	this.poder = poder;
	this.aguante = aguante;
	this.color_base = "#"+color_base;
	this.color_energia = "#"+color_energia;
	this.color_manos = "#"+color_manos;
	this.vel = vel;
	this.vel_ener = vel_ener;
	this.vel_vida = vel_vida;
	this.vel_trans_ener = vel_trans_ener;
	this.canvas = document.getElementById("canvas");

	//modos
	this.cheatMode = true;
	this.pause = false;


	//datos importantes en cada frame
	this.mousex = 240;
	this.mousey = 240;
	this.keys = {};
	this.level = parseInt(level);
	this.width = w;
	this.height = h;
	this.offsetx = 0;
	this.offsety = 0;

	//variables auxiliares
	this.puntosCanvian = true;
	this.timeInit = 0;
	this.count = 0;
	this.timeTransition = 0;
	this.repintarTitulo = false;
	this.repintarInfo = false;
	this.repintarMenu = false;
	this.intro = true;

	//Variables necesarias para el input.
	this.usuarioSuelta = false;
	this.usuarioCarga = false;
	this.seHaDeDisparar = false;
	this.seHaDeAbsorber = false;

	console.log("cGame", "json_map: "+json_level["tilesets"][0]["image"]);


	this.run = (function(game) 
          {
            var loops = 0, skipTicks = 1000 / game.fps,
                maxFrameSkip = 1,
                nextGameTick = (new Date).getTime(),
                pinta = false;
            
            return function() {
              loops = 0;
              
              while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
                pinta = game.Loop();
                nextGameTick += skipTicks;
                loops++;
              }
              
              if (loops && pinta) game.Render();
            };
          })(this);

	this.AsignaTecladoMouse = function()  //aki van todos los eventListener
	{
		var self = this;

		var cnv = document.getElementById('canvas'); //Esto quita que se encienda el menu, cuando das boton derecho.
		cnv.oncontextmenu = function() {
   			return false; 
		}	
		pause_game = function()
			{
				self.pause = true;
			};
		depause_game = function()
			{
				self.pause = false;
			};
		read_keyboarddown = function(event) 
			{
				if (event.keyCode != null)
	  			{
	  				key = event.keyCode;
	  				if(key == 37 || key == 38 || key == 39 || key == 40 || key == 8 || key == 46)  // Left / Up / Right / Down Arrow, Backspace, Delete keys
				   		self.keys[key] = true;
					else 
	     				self.keys[String.fromCharCode(event.keyCode)] = true;	  // All others
	    		}
	  			else //para teclas especiales
	  			{
	  				console.log("keyCode es null");
	  			}
	     	};
     	read_keyboardup = function(event) 
			{
				if (event.keyCode != null)
	  			{	  				
	  				key = event.keyCode;
	  				if(key == 37 || key == 38 || key == 39 || key == 40 || key == 8 || key == 46)  // Left / Up / Right / Down Arrow, Backspace, Delete keys
				   		self.keys[key] = false;
					else 
	     				self.keys[String.fromCharCode(event.keyCode)] = false;	  // All others
	    		}
	  			else //para teclas especiales
	  			{
	  				console.log("keyCode es null");
	  			}
	     	};
	    read_mouseMove = function(event)
	    	{
	    		self.mousex = (event.clientX-self.offsetx)*1280/self.width;
	    		self.mousey = (event.clientY-self.offsety)*768/self.height;
	    	};
	    read_mouseDown = function(event)
			{
				self.usuarioCarga = true;
			};
	    read_mouseUp = function(event)
			{
				self.usuarioSuelta = true;
			};
		load_image = function()
			{
				self.imagesLoaded++;
			};
		load_image_png = function()
			{
				self.imagesLoaded++;
			};
		onResize = function()
			{
				self.width = sizeWH().width;
				self.height = sizeWH().height;
				self.offsetx = 0;
				self.offsety = 0;
				if (16*self.height < 9*self.width)
				{
					self.width = self.height*16/9;
					self.offsetx = (sizeWH().width-self.width)/2;
				}
				else 
				{
					self.height = self.width*9/16;
					self.offsety = (sizeWH().height-self.height)/2;
				}

			    document.getElementById("canvas").style.top = self.offsety+'px'; document.getElementById("canvas").style.left = self.offsetx+'px';
			    document.getElementById("canvas").style.width = self.width; document.getElementById("canvas").style.height = self.height;
			    document.getElementById("canvas").width = 1280; document.getElementById("canvas").height = 768;

				self.canvas = document.getElementById("canvas");
 

				//self.RenderTitulo();
				//self.RenderInfo();
				//self.RenderMenu();
			};
		this.canvas.addEventListener('keydown', read_keyboarddown, false);
		this.canvas.addEventListener('keyup', read_keyboardup, false);
		window.addEventListener('mousemove', read_mouseMove, false); //Se activa solo si detecta movimiento del mouse.
		window.addEventListener('mousedown', read_mouseDown, false);
		window.addEventListener('mouseup', read_mouseUp, false);
		window.addEventListener('resize', onResize,false);
		//window.addEventListener('blur', pause_game);
		//window.addEventListener('focus', depause_game);
		onResize();
	};
	this.CargaImagenes = function(level)
	{
		//cristal y cesped
		this.CargaImagen('cristal','images/glass5');
		this.CargaImagen('cesped','images/cesped');

		//Burbuja Stand by rosa
		this.CargaImagen('b_stb_rosa_cuerpo','images/STB_01__rosa_cuerpo');
		this.CargaImagen('b_stb_rosa_ojos','images/STB_01__rosa_ojos');
		this.CargaImagen('b_stb_rosa_cejas','images/STB_01__rosa_cejas');

		//Burbuja Stand by azul
		this.CargaImagen('b_stb_azul_cuerpo','images/STB_01__azul_cuerpo');
		this.CargaImagen('b_stb_azul_ojos','images/STB_01__azul_ojos');
		this.CargaImagen('b_stb_azul_cejas','images/STB_01__azul_cejas');

		//Burbuja mov_horizontal
		for (var i = 1; i < 9; ++i)
		{
			this.CargaImagen('b_mov_01_'+(i-1).toString()+'_rosa_cuerpo','images/move_01_'+(i-1).toString()+'__rosa_cuerpo');
			this.CargaImagen('b_mov_01_'+(i-1).toString()+'_rosa_ojos','images/move_01_'+(i-1).toString()+'__rosa_ojos');
			this.CargaImagen('b_mov_01_'+(i-1).toString()+'_rosa_cejas','images/move_01_'+(i-1).toString()+'__rosa_cejas');
		}

		//Arbol
		this.CargaImagen('arbol','images/arbol');

		//Tilesets
		this.CargaImagenPng('tileset_suelo', json_level["tilesets"][0]["image"]);
		this.CargaImagenPng('tileset_casas', json_level["tilesets"][1]["image"]);

	}
	this.CargaImagen = function(tipo, str)
	{
		var self = this;
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = load_image;
		this.imagenes[tipo].src = str+'.webp';
		this.imagenes[tipo].onerror = (function() {self.CargaImagenPng(tipo,str+'.png');});
	}
	this.CargaImagenPng = function(tipo, str)
	{
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = load_image;
		this.imagenes[tipo].onerror = (function() {console.log("no se ha cargado: "+str);});
		this.imagenes[tipo].src = str;
	}
	this.Loop = function() //Llama a Process, Logic y Render.
	{
		this.count = (this.count+1)%100;
		if (this.imagesLoaded < this.totalImages || this.timeInit < 100)
		{
			if(this.imagesLoaded == this.totalImages) 
			{
				this.timeInit += 1;
			}
			if (this.timeInit == 100) this.interficie.cristal = this.imagenes.cristal;
			this.showLoading();
		}
		else 
		{
			if (this.intro)
			{
				if (this.timeTransition < 200)
				{
					this.showStoryIntro();
					this.timeTransition++;
				}
				else this.intro = false;
			}
			else
			{
				switch (this.level) //aki dependiendo del level haremos una cosa u otra.
				{
					case 0:
						this.Process();
						this.Logic();
						return true;
						break;
					case 1:
						this.Process();
						this.Logic();
						return true;
						break;
					default:
						this.Process();
						this.Logic();
						return true;
				}
			}
		}
		return false;
	};

	this.showLoading = function()
	{
		var context = this.canvas.getContext("2d");
		context.clearRect(0, 0, 1280, 768); //limpiamos

		//Rectangulo exterior
		context.beginPath();
	      	context.rect(1280/10, 8/10*768, 8/10*1280, 1280/15);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180, 0.0)";
	      	context.fill();
	      	context.lineWidth = 2;
	      	context.strokeStyle = "rgba(255, 105, 180, "+(1-this.timeInit/100)+")";
	      	context.stroke();
      	context.closePath();

      	//Rectangulo interior
		context.beginPath();
	      	context.rect(1280/10, 8/10*768, this.imagesLoaded*(8/10*1280)/this.totalImages, 1280/15);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180,"+(1-this.timeInit/100)+")";
	      	context.fill();
      	context.closePath();

      	//Cargando
      	context.beginPath();
			context.font = (1280/15).toString()+'px Calibri';
			context.lineWidth = 1;
			context.strokeStyle = "rgba(20, 60, 255, 0.8)";
			var puntos;
			if (this.count % 100 < 25) puntos = '';
			else if (this.count % 100 < 50) puntos = '.';
			else if (this.count % 100 < 75) puntos = '..';
			else puntos = '...';
	      	context.strokeText('Cargando imagenes '+this.imagesLoaded+'/'+this.totalImages+puntos, 1280/10, 8/10*768-1280/30);
			context.fillStyle = "rgba(60, 180, 255, 0.4)"; 
	      	context.fillText('Cargando imagenes '+this.imagesLoaded+'/'+this.totalImages+puntos, 1280/10, 8/10*768-1280/30);
      	context.closePath();
	};
	this.showStoryIntro = function()
	{
		var context = this.canvas.getContext("2d");
		context.clearRect(0, 0, 1280, 768); //limpiamos

		
      	//Cargando
      	context.beginPath();
			context.font = (1280/15).toString()+'px Calibri';
			context.lineWidth = 1;
			context.strokeStyle = "rgba(20, 60, 255, 0.8)";
			var position = Math.ceil(this.timeTransition/2);
	      	context.strokeText('Erase una burbujita que se', 1280/10, 2*Math.max(768,1280)/10-position*Math.max(768,1280)/1000);
	      	context.strokeText('ganaba la vida talando... ', 1280/10, 3*Math.max(768,1280)/10-position*Math.max(768,1280)/1000);
			context.fillStyle = "rgba(60, 180, 255, 0.4)"; 
	      	context.fillText('Erase una burbujita que se', 1280/10, 2*Math.max(768,1280)/10-position*Math.max(768,1280)/1000);
	      	context.fillText('ganaba la vida talando... ', 1280/10, 3*Math.max(768,1280)/10-position*Math.max(768,1280)/1000);
      	context.closePath();
	};
	this.Process = function() //Trata los inputs
	{
		//console.log("Procesamos");
		//console.log("hey mira la a: "+this.keys['a']);

		if (this.keys["P"] != undefined && this.keys["P"] == true) 
		{
			this.keys["P"] = false;
			this.pause = !this.pause;
		}
		if (!this.pause) {
			if (this.keys["A"] != undefined && this.keys["A"] == true) 
			{
				this.burbujita.moveLeft(1);
			}
			else if (this.keys[37] != undefined && this.keys[37] == true) 
			{
				this.burbujita.moveLeft(1);
			}
			if (this.keys["D"] != undefined && this.keys["D"] == true) 
			{
				this.burbujita.moveRight(1);
			}
			else if (this.keys[39] != undefined && this.keys[39] == true) 
			{
				this.burbujita.moveRight(1);
			}
			if (this.keys["W"] != undefined && this.keys["W"] == true) 
			{
				this.burbujita.moveUp(1);
			}
			else if (this.keys[38] != undefined && this.keys[38] == true) 
			{
				this.burbujita.moveUp(1);
			}
			if (this.keys["S"] != undefined && this.keys["S"] == true) 
			{
				this.burbujita.moveDown(1);
			}
			else if (this.keys[40] != undefined && this.keys[40] == true) 
			{
				this.burbujita.moveDown(1);
			}
			if (this.keys["C"] != undefined && this.keys["C"] == true) 
			{
				this.keys["C"] = false;
				this.cheatMode = !this.cheatMode;
			}
			if (this.usuarioSuelta)
			{
				this.usuarioCarga = false;
				this.usuarioSuelta = false;
				if(this.burbujita.PuedeDisparar()) 
				{
					this.seHaDeDisparar = true; //si es false, es porque o bien el disparo de burbuja es nulo o bien es porque el tamaño no es suficiente
				}
				else
				{
					if (this.burbujita.disparo != null)
						this.seHaDeAbsorber = true;
				}
			}
			if (this.usuarioCarga)
			{
				if (!this.burbujita.CargandoDisparo()) //si ha llegado al maximo o se ha quedao sin energia y ha salido.
					this.seHaDeDisparar = true;
			}
		}
	};
	this.Logic = function()
	{
		if (!this.pause)
		{
			if (this.burbujita.Logic(this.mousex, this.mousey, 1280, 768))
			{
				if (this.seHaDeDisparar)
				{
					this.seHaDeDisparar = false;
					this.seHaDeAbsorber = false;
					this.burbujita.Dispara(this.mapa);
				}
				if (this.seHaDeAbsorber)
				{
					if(!this.burbujita.DescargandoDisparo())
						this.seHaDeAbsorber = false;
				}
				this.mapa.Logic(this.burbujita, 1280, 768);	
			}
			else 
			{
				//BURBUJITA A MUERTO!
				this.burbujita = new cBurbujita(0,0,0.1,0.1, this.color_base, this.color_energia, this.color_manos, this.poder);
				this.interficie = new cInterficie();
				this.mapa = new cMapa(this.interficie);
				this.interficie.cristal = this.imagenes.cristal;
			}
		}
	};
	this.Render = function()
	{
		//if (this.repintarTitulo) this.RenderTitulo();
		//if (this.repintarInfo) this.RenderInfo();
		//if (this.repintarMenu) this.RenderMenu();
		if (!this.pause)
		{
			var canvas = document.getElementById("canvas");
			var canvas_ctx=canvas.getContext("2d");
			//canvas_ctx.save(); //Salva la matriz de transformacion (como OpenGL)
			//canvas_ctx.setTransform(1, 0, 0, 1, 0, 0); //Ponemos la matriz identidad, para que limpie bien.
			canvas_ctx.clearRect(0, 0, 1280, 768); //limpiamos
			//canvas_ctx.restore(); //Recuperamos la matriz de transformacion.

			this.mapa.Render(this.cheatMode,this.imagenes.cesped, this.imagenes["tileset_suelo"], 1280, 768,this.pintor);
			this.burbujita.Render(this.cheatMode,this.pintor);
			this.mapa.RenderEffects();
			this.mapa.Render_lifes();
			//this.interficie.Render(this.burbujita.energia, this.burbujita.vida);
		}
	};
	/*this.RenderTitulo = function()
	{
		this.repintarTitulo = false;
		var context = (document.getElementById('Titulo')).getContext('2d');
		context.font = (Math.min(this.width/5,60)).toString()+'pt Calibri';
		context.lineWidth = 3;
		context.strokeStyle = 'blue';
		context.strokeText('Burbujita!', 5/3*this.width/2-(Math.min(this.width/5,60))/2*5, 100/2+30);
	};
	this.RenderInfo = function()
	{
		this.repintarInfo = false;
		var context = (document.getElementById('canvas_info')).getContext('2d');
		context.font = (document.getElementById('canvas_info').width/5).toString()+'pt Calibri';
		context.lineWidth = 3;
		context.strokeStyle = 'orange';
		context.strokeText('Info', document.getElementById('canvas_info').width/5, document.getElementById('canvas_info').height/2);
		context.font = (document.getElementById('canvas_info').width/10).toString()+'pt Calibri';
		context.strokeText('apreta la c', document.getElementById('canvas_info').width/10, 14*document.getElementById('canvas_info').height/20);
		context.strokeText('para cambiar', document.getElementById('canvas_info').width/10, 16*document.getElementById('canvas_info').height/20);
		context.strokeText('los graficos', document.getElementById('canvas_info').width/10, 18*document.getElementById('canvas_info').height/20);
	};
	this.RenderMenu = function()
	{
		this.repintarMenu = false;
		var context = (document.getElementById('canvas_menu')).getContext('2d');
		context.font = (document.getElementById('canvas_menu').width/5).toString()+'pt Calibri';
		context.lineWidth = 3;
		context.strokeStyle = 'red';
		context.strokeText('Menu', document.getElementById('canvas_menu').width/5, document.getElementById('canvas_menu').height/2);
	};*/
}