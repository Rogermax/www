function cGamePersonalization(name,w,h,color_base, color_energia, color_manos, poder)
{
	//creadora ()
	this.nombre = name;
	this.fps = 60;
	this.canvas = document.getElementById("canvas_personalizado");
	this.width = w;
	this.height = h;
	this.radio = 100;
	this.energia = 0.5;
	this.x = 200;
	this.y = 200;
	this.miroy = 0;
	this.mirox = 1;
	this.tamanoBola = 0.2;
	this.poder = poder;
	this.color_base = "#"+color_base;
	this.color_energia = "#"+color_energia;
	this.color_manos = "#"+color_manos;
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
	};
	this.Logic = function()
	{

	};
	this.Render = function()
	{
			var canvas_ctx = this.canvas.getContext("2d");
			//canvas_ctx.save(); //Salva la matriz de transformacion (como OpenGL)
			//canvas_ctx.setTransform(1, 0, 0, 1, 0, 0); //Ponemos la matriz identidad, para que limpie bien.
			canvas_ctx.clearRect(0, 0, this.width, this.height); //limpiamos
			//canvas_ctx.restore(); //Recuperamos la matriz de transformacion.
			this.pintaRedondaBase(this.color_base);
			this.pintaRedondaEnergia(this.color_energia);
			this.pintaManos(this.color_manos);
			this.pintaDisparo(this.color_energia);
	};
	this.pintaDisparo = function(color) 
	{
		var canvas_ctx=this.canvas.getContext("2d");
		var modulo = Math.sqrt((this.x-this.mirox)*(this.x-this.mirox)+(this.y-this.miroy)*(this.y-this.miroy));
		var despx = (this.mirox-this.x)*(this.radio+25)/modulo;
		var despy = (this.miroy-this.y)*(this.radio+25)/modulo;
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x+despx,this.y+despy,this.radio*Math.sqrt(this.tamanoBola),0,2*Math.PI);
			canvas_ctx.globalAlpha = 1;
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath();

		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x+despx,this.y+despy,this.radio*Math.sqrt(this.tamanoBola)*this.poder/100,0,2*Math.PI);
			canvas_ctx.globalAlpha = 0.2;
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath();
		canvas_ctx.globalAlpha = 1;
	}
	this.pintaRedondaBase = function(color)
	{
		//Hace falta cuando pintamos a mano, usando lineas y figuras predetermiandas en CANVAS.
		//Digamos que te mantiene el puntero dnd estaba la ultima vez, empieza de (0,0), con el moveTo(x,y) se puede canviar, tmb afecta a las transparencias.
		var canvas_ctx=this.canvas.getContext("2d");
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);//el -8 es por el margin del body
			canvas_ctx.globalAlpha = 0.6;
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath();
	};
	this.pintaRedondaEnergia = function(color)
	{
		//Hace falta cuando pintamos a mano, usando lineas y figuras predetermiandas en CANVAS.
		//Digamos que te mantiene el puntero dnd estaba la ultima vez, empieza de (0,0), con el moveTo(x,y) se puede canviar, tmb afecta a las transparencias.
		var canvas_ctx=this.canvas.getContext("2d");
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x,this.y,Math.sqrt(this.energia)*this.radio,0,2*Math.PI);//el -8 es por el margin del body
			canvas_ctx.globalAlpha = 1;
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath();
	};
	this.pintaManos = function(color)
	{
		var canvas_ctx=this.canvas.getContext("2d");
		var modulo = Math.sqrt((this.x-this.mirox)*(this.x-this.mirox)+(this.y-this.miroy)*(this.y-this.miroy));
		var despx = (this.mirox-this.x)*(this.radio+10)/modulo;
		var despy = (this.miroy-this.y)*(this.radio+10)/modulo;
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x+despx+despy*(Math.sqrt(this.tamanoBola)+0.1),this.y+despy-despx*(Math.sqrt(this.tamanoBola)+0.1),15,0,2*Math.PI);
			canvas_ctx.arc(this.x+despx-despy*(Math.sqrt(this.tamanoBola)+0.1),this.y+despy+despx*(Math.sqrt(this.tamanoBola)+0.1),15,0,2*Math.PI);
			canvas_ctx.globalAlpha = 0.6;
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath(); 

		/*
		canvas_ctx.beginPath();
		canvas_ctx.arc(this.x-this.velx*0.1+despx,this.y-this.vely*0.1+despy,10,0,2*Math.PI);
		canvas_ctx.fillStyle=color+"0.5)";
		canvas_ctx.fill();
		canvas_ctx.closePath();

		canvas_ctx.beginPath(); 
		canvas_ctx.arc(this.x-this.velx*0.2+despx,this.y-this.vely*0.2+despy,10,0,2*Math.PI);
		canvas_ctx.fillStyle=color+"0.25)";
		canvas_ctx.fill();
		canvas_ctx.closePath();
		*/
	};
}