function cGameMundo(nivel_mapa,w,h,color_base,color_energia,color_manos)
{
	//creadora ()
	this.imagenes = {};
	this.fps = 60;
	this.totalImages = 64;
	this.imagesLoaded = 0;
	this.nivel_mapa = nivel_mapa;
	this.color_base = "#"+color_base;
	this.color_energia = "#"+color_energia;
	this.color_manos = "#"+color_manos;
	this.canvas = document.getElementById("canvas");

	//datos importantes en cada frame
	this.mousex = 240;
	this.mousey = 240;
	this.selectedx = 0;
	this.selectedy = 0;
	this.keys = {};
	this.width = w;
	this.height = h;

	this.world = 0;
	this.apreta = false;
	this.suelta = false;
	this.matrix = new Array(17);

	for(var i=0; i<17; i++) {
	    this.matrix[i] = new cCasilla(i, (i < this.nivel_mapa), this.canvas,this.width,this.height);
	}

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
	    		self.mousex = event.clientX;
	    		self.mousey = event.clientY;
	    	};
	    read_mouseDown = function(event)
			{
				self.apreta = true;
			};
	    read_mouseUp = function(event)
			{
				self.suelta = true;
			};
		load_image = function(bw,img,id)
			{
				self.imagesLoaded++;
				if (bw)
				{	
					if (img !== undefined)
						self.matrix[id].PutImageB(img);
				}
				else 
				{
					if (img !== undefined)
						self.matrix[id].PutImage(img);
				}
			};
		load_image_png = function()
			{
				self.imagesLoaded++;
			};
		onResize = function()
			{
				var sizeW = sizeWH().width;
				var sizeH = sizeWH().height;

			    document.getElementById("canvas").style.top = '0px'; document.getElementById("canvas").style.left = '0px';
			    document.getElementById("canvas").width = sizeW; document.getElementById("canvas").height = sizeH;

				self.canvas = document.getElementById("canvas");
				self.width = self.canvas.width;
				self.height = self.canvas.height;
				for(var i=0; i<17; i++) {
				    self.matrix[i].changeSize(sizeW,sizeH);
				}
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

		//Caratulas levels
		for (var i = 0; i < 17; ++i)
		{
			this.CargaImagenPng(false,'level'+(i).toString(),'images/level'+(i+1).toString()+'/caratula.png',i);
			this.CargaImagenPng(true,'blevel'+(i).toString(),'images/level'+(i+1).toString()+'/caratula0.png',i);
		}

	}
	this.CargaImagen = function(bw,tipo, str,i)
	{
		var self = this;
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = load_image(bw,this.imagenes[tipo],i);
		this.imagenes[tipo].src = str+'.webp';
		this.imagenes[tipo].onerror = (function() {self.CargaImagenPng(tipo,str+'.png');});
	}
	this.CargaImagenPng = function(bw, tipo, str,i)
	{
		this.imagenes[tipo] = new Image();
		this.imagenes[tipo].onload = load_image(bw, this.imagenes[tipo],i);
		this.imagenes[tipo].onerror = (function() {console.log("no se ha cargado: "+str);});
		this.imagenes[tipo].src = str;
	}
	this.Loop = function() //Llama a Process, Logic y Render.
	{

		this.Process();
		this.Logic();
		return true;
	};

	this.Process = function() //Trata los inputs
	{
		//console.log("Procesamos");
		//console.log("hey mira la a: "+this.keys['a']);
		if (this.suelta)
		{
			this.selectedx = this.mousex;
			this.selectedy = this.mousey;
		}
	};
	this.Logic = function()
	{
		if (this.suelta)
		{
			this.suelta = false;
			var entrar = this.puede_entrar(this.selectedx, this.selectedy);
			if (entrar[0]) {
				this.entra(entrar[1]);
			}
		}
		else {
			var entrar = this.puede_entrar(this.mousex, this.mousey);
			if (entrar[0]) {
				this.matrix[entrar[1]].Resalta();
			}
		}

		for(var i=0; i<17; i++) {
			this.matrix[i].Logic(); 
		}

	};
	this.puede_entrar = function(x,y)
	{
		if ((3*this.width/8 < x) && (x < 5*this.width/8) && (3*this.height/8 < y) && (y < 5*this.height/8))
		{
			return [(this.nivel_mapa > 16),16];
		}
		if (x < this.width/2){
			if (y < this.height/2) {//cuadrante arriba-izquierda
				if (x < this.width/4){
					if (y < this.height/4) {//subcuadrante arriba-izquierda
						return [(this.nivel_mapa > 6),6];
					}
					else {//subcuadrante abajo-izquierda
						return [(this.nivel_mapa > 5),5];
					}
				}
				else {
					if (y < this.height/4) {//subcuadrante arriba-derecha
						return [(this.nivel_mapa > 7),7];
					}
					else {//subcuadrante abajo-derecha
						return [(this.nivel_mapa > 4),4];
					}
				}
			}
			else {//cuadrante abajo-izquierda
				if (x < this.width/4){
					if (y < 3*this.height/4) {//subcuadrante arriba-izquierda
						return [(this.nivel_mapa > 2),2];
					}
					else {//subcuadrante abajo-izquierda
						return [(this.nivel_mapa > 1),1];
					}
				}
				else {
					if (y < 3*this.height/4) {//subcuadrante arriba-derecha
						return [(this.nivel_mapa > 3),3];
					}
					else {//subcuadrante abajo-derecha
						return [(this.nivel_mapa > 0),0];
					}
				}
			}
		}
		else {
			if (y < this.height/2) {//cuadrante arriba-izquierda
				if (x < 3*this.width/4){
					if (y < this.height/4) {//subcuadrante arriba-izquierda
						return [(this.nivel_mapa > 8 ), 8];
					}
					else {//subcuadrante abajo-izquierda
						return [(this.nivel_mapa > 11 ),11];
					}
				}
				else {
					if (y < this.height/4) {//subcuadrante arriba-derecha
						return [(this.nivel_mapa > 9 ), 9];
					}
					else {//subcuadrante abajo-derecha
						return [(this.nivel_mapa > 10 ),10];
					}
				}
			}
			else {//cuadrante abajo-izquierda
				if (x < 3*this.width/4){
					if (y < 3*this.height/4) {//subcuadrante arriba-izquierda
						return [(this.nivel_mapa > 12 ),12];
					}
					else {//subcuadrante abajo-izquierda
						return [(this.nivel_mapa > 15 ),15];
					}
				}
				else {
					if (y < 3*this.height/4) {//subcuadrante arriba-derecha
						return [(this.nivel_mapa > 13 ),13];
					}
					else {//subcuadrante abajo-derecha
						return [(this.nivel_mapa > 14 ),14];
					}
				}
			}
		}	
	};
	this.entra = function(id) 
	{
		var cas = this.matrix[id];
		if (cas.activa) cas.Entra();
	};
	/*this.casilla = function()
		if ((3*this.w/8 < this.selectedx) && (this.selectedx < 5*this.w/8))
		{
			return 16;
		}
		if (this.selectedx < this.w/2){
			if (this.selectedy < this.h/2) {//cuadrante arriba-izquierda
				if (this.selectedx < this.w/4){
					if (this.selectedy < this.h/4) {//subcuadrante arriba-izquierda
						return 6;
					}
					else {//subcuadrante abajo-izquierda
						return 5;
					}
				}
				else {
					if (this.selectedy < this.h/4) {//subcuadrante arriba-derecha
						return 7;
					}
					else {//subcuadrante abajo-derecha
						return 4;
					}
				}
			}
			else {//cuadrante abajo-izquierda
				if (this.selectedx < this.w/4){
					if (this.selectedy < 3*this.h/4) {//subcuadrante arriba-izquierda
						return 2;
					}
					else {//subcuadrante abajo-izquierda
						return 1;
					}
				}
				else {
					if (this.selectedy < 3*this.h/4) {//subcuadrante arriba-derecha
						return 3;
					}
					else {//subcuadrante abajo-derecha
						return 0;
					}
				}
			}
		}
		else {
			if (this.selectedy < this.h/2) {//cuadrante arriba-izquierda
				if (this.selectedx < 3*this.w/4){
					if (this.selectedy < this.h/4) {//subcuadrante arriba-izquierda
						return 8;
					}
					else {//subcuadrante abajo-izquierda
						return 11;
					}
				}
				else {
					if (this.selectedy < this.h/4) {//subcuadrante arriba-derecha
						return 9;
					}
					else {//subcuadrante abajo-derecha
						return 10;
					}
				}
			}
			else {//cuadrante abajo-izquierda
				if (this.selectedx < 3*this.w/4){
					if (this.selectedy < 3*this.h/4) {//subcuadrante arriba-izquierda
						return 12;
					}
					else {//subcuadrante abajo-izquierda
						return 15;
					}
				}
				else {
					if (this.selectedy < 3*this.h/4) {//subcuadrante arriba-derecha
						return 13;
					}
					else {//subcuadrante abajo-derecha
						return 14;
					}
				}
			}
		}
	};*/
	this.Render = function()
	{
		for(var i=0; i<17; i++) {
			this.matrix[i].Render(); 
		}
	};
}