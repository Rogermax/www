function cGame(w,h)
{
	this.canvas = document.getElementById("canvas");
	this.imagenes = {};
	this.totalImages = 1;
	this.imagesLoaded = 0;
	this.keys = {};
	this.offsetx = 0;
	this.offsety = 0;
	this.width = w;
	this.height = h;
	this.fps = 60;

	this.run = (function(game) 
          {
            var loops = 0, skipTicks = 1000 / game.fps,
                maxFrameSkip = 1,
                nextGameTick = (new Date).getTime(),
                pinta = false;
            
            return function() {
              loops = 0;
              var aux = (new Date).getMilliseconds();

              while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
                pinta = game.Loop();
                nextGameTick += skipTicks;
                loops++;
              }
              
              if (loops && pinta) 
              {
              	game.Render();
				//console.log(""+((new Date).getMilliseconds()-aux));
              }
            };
          })(this);

    var self = this;

	this.load_image = function()
	{
		console.log("load_image!");
		self.imagesLoaded++;
	};

	this.AsignaTecladoMouse = function()  //aki van todos los eventListener
	{
		var cnv = document.getElementById('canvas'); //Esto quita que se encienda el menu, cuando das boton derecho.
		cnv.oncontextmenu = function() 
			{
   				return false; 
			}
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
			    self.canvas.style.top = self.offsety+'px'; self.canvas.style.left = self.offsetx+'px';
			    self.canvas.style.width = self.width; self.canvas.style.height = self.height;
			    self.canvas.width = 1280; self.canvas.height = 720;
			};
		window.addEventListener('resize', onResize,false);
		onResize();
	};

	this.CargaImagenes = function(level)
	{
		this.CargaImagen('1','images/2');
	};

	this.CargaImagen = function(tipo, str)
	{
		var self = this;
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = this.load_image;
		this.imagenes[tipo].src = str+'.webp';
		this.imagenes[tipo].onerror = (function() 
			{
				console.log("no se ha cargado: "+str+'.webp');
				self.CargaImagenPng(tipo,str);
				console.log("voy a cargar el png: "+str+'.png');
			});
	};

	this.CargaImagenPng = function(tipo, str)
	{
		var self = this;
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = this.load_image;
		this.imagenes[tipo].src = str+'.png';
		this.imagenes[tipo].onerror = (function()
			{
				console.log("no se ha cargado: "+str+'.png');
				self.CargaImagenJpg(tipo,str);
				console.log("voy a cargar el jpg: "+str+'.jpg');
			});
	};

	this.CargaImagenJpg = function(tipo, str)
	{
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = this.load_image;
		this.imagenes[tipo].src = str+'.jpg';
		this.imagenes[tipo].onerror = (function()
			{
				console.log("no se ha cargado: "+str+'.jpg');
			});
	};

	this.Loop = function() //Llama a Process, Logic y Render.
	{
		this.Process();
		this.Logic();
		return true;
	};

	this.Process = function() //Trata los inputs
	{
		
	};

	this.Logic = function()
	{

	};

	this.Render = function()
	{

		var canvas_ctx=this.canvas.getContext("2d");
		canvas_ctx.imageSmoothingEnabled = false;
		canvas_ctx.mozImageSmoothingEnabled = false;
		canvas_ctx.oImageSmoothingEnabled = false;
		canvas_ctx.webkitImageSmoothingEnabled = false;

		if (this.imagesLoaded == this.totalImages)
		{
			canvas_ctx.drawImage(this.imagenes['1'],1,1,16,16,0,0,720,720);
		}
	};
};