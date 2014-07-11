function cGame(username, w,h)
{
	//creadora ()
	this.username = username;
	this.burbujita = new cBurbujita(0,0,0.1,0.1);
	this.interficie = new cInterficie();
	this.mapa = new cMapa(this.interficie);
	this.fps = 60;
	this.totalImages = 2;
	this.imagesLoaded = 0;
	this.imageObj = null;
	this.imageCesped = null;
	this.canvas = document.getElementById("canvas");

	//sin uso de momento
	this.cheatMode = false;
	this.pause = false;


	//datos importantes en cada frame
	this.mousex = 240;
	this.mousey = 240;
	this.keys = {};
	this.level = 0;
	this.width = w;
	this.height = h;

	//variables auxiliares
	this.puntosCanvian = true;
	this.timeInit = 0;
	this.count = 0;
	this.timeTransition = 0;
	this.repintarTitulo = false;
	this.repintarInfo = false;
	this.repintarMenu = false;

	//Variables necesarias para el input.
	this.usuarioSuelta = false;
	this.usuarioCarga = false;
	this.seHaDeDisparar = false;
	this.seHaDeAbsorber = false;



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
	     			self.keys[String.fromCharCode(event.keyCode)] = false;	  // All others
	    		}
	  			else //para teclas especiales
	  			{
	  				console.log("keyCode es null");
	  			}
	     	};
	    read_mouseMove = function(event)
	    	{
	    		self.mousex = event.clientX-sizeWH().width/5; //el 8 es el margin del body
	    		self.mousey = event.clientY-200;
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
		onResize = function()
			{
				var sizeW = sizeWH().width;
				var sizeH = sizeWH().height;

			    document.getElementById("Titulo").style.top = '0px'; document.getElementById("Titulo").style.left = '0px';
			    document.getElementById("Titulo").width = sizeW; document.getElementById("Titulo").height = 100;

			    document.getElementById("canvas_menu").style.top = '100px'; document.getElementById("canvas_menu").style.left = '0px';
			    document.getElementById("canvas_menu").width = sizeW/5; document.getElementById("canvas_menu").height = sizeH-100;


			    document.getElementById("canvas_info").style.top = '100px'; document.getElementById("canvas_info").style.right = '0px';
			    document.getElementById("canvas_info").width = sizeW/5; document.getElementById("canvas_info").height = sizeH-100;

			    document.getElementById("canvas_puntos").style.top = '100px'; document.getElementById("canvas_puntos").style.left = (sizeW/5).toString()+'px';
			    document.getElementById("canvas_puntos").width = 3/5*sizeW; document.getElementById("canvas_puntos").height = 100;

			    document.getElementById("canvas").style.top = '200px'; document.getElementById("canvas").style.left = (sizeW/5).toString()+'px';
			    document.getElementById("canvas").width = 3/5*sizeW; document.getElementById("canvas").height = sizeH-200;

				self.canvas = document.getElementById("canvas");
				self.width = self.canvas.width;
				self.height = self.canvas.height;

				self.RenderTitulo();
				self.RenderInfo();
				self.RenderMenu();
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
	this.CargaImagenes = function()
	{
		//Imagenes
		this.imageObj = new Image();
		this.imageObj.onload = load_image;
		this.imageObj.src = 'images/burbujita/glass5.png';

		this.imageCesped = new Image();
		this.imageCesped.onload = load_image;
		this.imageCesped.src = 'images/burbujita/cesped.png';

		this.interficie.cristal = this.imageObj;

	}
	this.Loop = function() //Llama a Process, Logic y Render.
	{
		if (this.pause) 
		{
          	console.log("juego pausado");
        }
        else 
        {
			this.count = (this.count+1)%100;
			if (this.imagesLoaded < this.totalImages || this.timeInit < 100)
			{
				if(this.imagesLoaded == this.totalImages) 
				{
					this.timeInit += 1;
				}
				this.showLoading();
			}
			else 
			{
				switch (this.level) //aki dependiendo del level haremos una cosa u otra.
				{
					case 0:
						if (this.timeTransition < 200)
						{
							this.showStoryIntro();
							this.timeTransition++;
						}
						else this.level++;
						break;
					case 1:
						this.level++;
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
		context.clearRect(0, 0, this.width, this.height); //limpiamos

		//Rectangulo exterior
		context.beginPath();
	      	context.rect(this.width/10, 8/10*this.height, 8/10*this.width, this.width/15);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180, 0.0)";
	      	context.fill();
	      	context.lineWidth = 2;
	      	context.strokeStyle = "rgba(255, 105, 180, "+(1-this.timeInit/100)+")";
	      	context.stroke();
      	context.closePath();

      	//Rectangulo interior
		context.beginPath();
	      	context.rect(this.width/10, 8/10*this.height, this.imagesLoaded*(8/10*this.width)/this.totalImages, this.width/15);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180,"+(1-this.timeInit/100)+")";
	      	context.fill();
      	context.closePath();

      	//Cargando
      	context.beginPath();
			context.font = (this.width/15).toString()+'px Calibri';
			context.lineWidth = 1;
			context.strokeStyle = "rgba(20, 60, 255, 0.8)";
			var puntos;
			if (this.count % 100 < 25) puntos = '';
			else if (this.count % 100 < 50) puntos = '.';
			else if (this.count % 100 < 75) puntos = '..';
			else puntos = '...';
	      	context.strokeText('Cargando imagenes '+this.imagesLoaded+'/'+this.totalImages+puntos, this.width/10, 8/10*this.height-this.width/30);
			context.fillStyle = "rgba(60, 180, 255, 0.4)"; 
	      	context.fillText('Cargando imagenes '+this.imagesLoaded+'/'+this.totalImages+puntos, this.width/10, 8/10*this.height-this.width/30);
      	context.closePath();
	};
	this.showStoryIntro = function()
	{
		var context = this.canvas.getContext("2d");
		context.clearRect(0, 0, this.width, this.height); //limpiamos

		
      	//Cargando
      	context.beginPath();
			context.font = (this.width/15).toString()+'px Calibri';
			context.lineWidth = 1;
			context.strokeStyle = "rgba(20, 60, 255, 0.8)";
			var position = Math.ceil(this.timeTransition/2);
	      	context.strokeText('Erase una burbujita que se', this.width/10, 2*Math.max(this.height,this.width)/10-position*Math.max(this.height,this.width)/1000);
	      	context.strokeText('ganaba la vida talando... ', this.width/10, 3*Math.max(this.height,this.width)/10-position*Math.max(this.height,this.width)/1000);
			context.fillStyle = "rgba(60, 180, 255, 0.4)"; 
	      	context.fillText('Erase una burbujita que se', this.width/10, 2*Math.max(this.height,this.width)/10-position*Math.max(this.height,this.width)/1000);
	      	context.fillText('ganaba la vida talando... ', this.width/10, 3*Math.max(this.height,this.width)/10-position*Math.max(this.height,this.width)/1000);
      	context.closePath();
	};
	this.Process = function() //Trata los inputs
	{
		//console.log("Procesamos");
		//console.log("hey mira la a: "+this.keys['a']);
		if (this.keys["A"] != undefined && this.keys["A"] == true) 
		{
			this.burbujita.moveLeft(0.75);
		}
		if (this.keys["D"] != undefined && this.keys["D"] == true) 
		{
			this.burbujita.moveRight(0.75);
		}
		if (this.keys["W"] != undefined && this.keys["W"] == true) 
		{
			this.burbujita.moveUp(0.75);
		}
		if (this.keys["S"] != undefined && this.keys["S"] == true) 
		{
			this.burbujita.moveDown(0.75);
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
	};
	this.Logic = function()
	{
		if (this.burbujita.Logic(this.mousex, this.mousey, this.width, this.height))
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
			this.mapa.Logic(this.burbujita, this.width, this.height);	
		}
		else 
		{
			this.burbujita = new cBurbujita(0,0,0.1,0.1);
			this.interficie = new cInterficie();
			this.mapa = new cMapa(this.interficie);
			this.interficie.cristal = this.imageObj;
		}
	};
	this.Render = function()
	{
		if (this.repintarTitulo) this.RenderTitulo();
		if (this.repintarInfo) this.RenderInfo();
		if (this.repintarMenu) this.RenderMenu();
		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		//canvas_ctx.save(); //Salva la matriz de transformacion (como OpenGL)
		//canvas_ctx.setTransform(1, 0, 0, 1, 0, 0); //Ponemos la matriz identidad, para que limpie bien.
		canvas_ctx.clearRect(0, 0, this.width, this.height); //limpiamos
		//canvas_ctx.restore(); //Recuperamos la matriz de transformacion.

		this.mapa.Render(this.imageCesped, this.width, this.height);
		this.burbujita.Render();
		this.mapa.RenderEffects();
		this.mapa.Render_lifes();
		this.interficie.Render(this.burbujita.energia, this.burbujita.vida);
	};
	this.RenderTitulo = function()
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
	};
	this.RenderMenu = function()
	{
		this.repintarMenu = false;
		var context = (document.getElementById('canvas_menu')).getContext('2d');
		context.font = (document.getElementById('canvas_menu').width/5).toString()+'pt Calibri';
		context.lineWidth = 3;
		context.strokeStyle = 'red';
		context.strokeText('Menu', document.getElementById('canvas_menu').width/5, document.getElementById('canvas_menu').height/2);
	};
}