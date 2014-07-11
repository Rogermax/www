function cBurbujita(posx, posy, velx, vely) 
{
	this.x = posx;
	this.y = posy;
	this.velx = velx;
	this.vely = vely;
	this.mirox = 0;
	this.miroy = 0;
	this.disparo = null;
	this.dispara = false;
	this.momentoDisparo = 4;
	this.energia = 1.0;
	this.radio = 40;
	this.vida = 1;
	this.cargandoDisparo = false;
	this.tamanoBola = 0;
	this.vel_trans_ataque1 = 0.005;
	this.min_tamanoBola = 0.04;
	this.max_tamanoBola = 0.20;
	this.CargandoDisparo = function()
	{
		var modulo = Math.sqrt((this.x-this.mirox)*(this.x-this.mirox)+(this.y-this.miroy)*(this.y-this.miroy));
		var despx = (this.mirox-this.x)*(this.radio+10)/modulo;
		var despy = (this.miroy-this.y)*(this.radio+10)/modulo;
		this.cargandoDisparo = true;
		this.tamanoBola = this.tamanoBola+(this.energia-Math.max(0,this.energia-this.vel_trans_ataque1));
		this.energia = Math.max(0,this.energia-this.vel_trans_ataque1);
		if (this.disparo == null) 
		{
			this.disparo = new cDisparo(-1,this.x+despx, this.y+despy, 5*(this.mirox-this.x)/modulo, 5*(this.miroy-this.y)/modulo);
		}
		else
		{
			this.disparo.x = this.x+despx;
			this.disparo.y = this.y+despy;
			this.disparo.velx = 5*(this.mirox-this.x)/modulo;
			this.disparo.vely = 5*(this.miroy-this.y)/modulo;
		}
		this.disparo.radio = this.radio*Math.sqrt(this.tamanoBola);
		if (this.tamanoBola >= this.max_tamanoBola || (this.energia <= 0 && this.tamanoBola >= this.min_tamanoBola))
		{
			return false;
		} 
		return true;
	}
	this.DescargandoDisparo = function()
	{
		if (this.disparo != null)
		{
			var modulo = Math.sqrt((this.x-this.mirox)*(this.x-this.mirox)+(this.y-this.miroy)*(this.y-this.miroy));
			var despx = (this.mirox-this.x)*(this.radio+10)/modulo;
			var despy = (this.miroy-this.y)*(this.radio+10)/modulo;
			//this.cargandoDisparo = true;
			this.tamanoBola = this.tamanoBola-this.vel_trans_ataque1/10;
			this.energia += this.vel_trans_ataque1/10;
			this.disparo.x = this.x+despx;
			this.disparo.y = this.y+despy;
			this.disparo.velx = 5*(this.mirox-this.x)/modulo;
			this.disparo.vely = 5*(this.miroy-this.y)/modulo;
			this.disparo.radio = this.radio*Math.sqrt(this.tamanoBola);
			if(this.tamanoBola <= 0)
			{
				this.tamanoBola = 0;
				this.disparo = null;
				return false
			}
		}
		else
		{
			console.log("Es null");
		}
		return true;
	}
	this.PuedeDisparar = function()
	{
		return (this.disparo != null && this.tamanoBola >= this.min_tamanoBola);
	}
	this.Dispara = function(mapa)
	{
		mapa.addDisparo(this.disparo);
		this.disparo = null;
		this.tamanoBola = 0;
		this.dispara = true;
	}
	this.Logic = function(mousex, mousey,w,h)
	{
		if (this.vida > 0)
		{
			this.energia = Math.min(1,this.energia+0.001);
			this.mirox = mousex;
			this.miroy = mousey;
			this.x = this.x+this.velx;
			this.y = this.y+this.vely;
			this.x = Math.max(this.radio, Math.min(w-this.radio, this.x));
			this.y = Math.max(this.radio, Math.min(h-this.radio, this.y));
			this.velx /= 1.2;
			this.vely /= 1.2;
			return true;
		}
		else return false;
	}
	this.Render = function()
	{
		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		if (this.disparo != null) this.disparo.Render();
		if (this.dispara)
		{
			if (this.momentoDisparo <= 0) 
			{
				this.momentoDisparo = 4;
				this.dispara = false;
			}
			else this.momentoDisparo--;
			this.pintaRedondaBase("rgba(155, 105, 180, 0.6)");
			this.pintaRedondaEnergia("rgba(155, 105, 180, 1)");
			this.pintaManos("rgba(155, 105, 180, 0.6)");
		}
		else 
		{

			this.pintaRedondaBase("rgba(255, 105, 180, 0.6)");
			this.pintaRedondaEnergia("rgba(255, 105, 180, 1)");
			this.pintaManos("rgba(255, 105, 180, 0.6)");
		}
	}
	this.moveLeft = function(pixels)
	{
		this.velx -= Math.min(50, Math.max(-50,pixels));
		var modulo = Math.sqrt(this.velx*this.velx+this.vely*this.vely);
		if (modulo >= 50)
		{
			this.velx = 50*this.velx/modulo;
			this.vely = 50*this.vely/modulo;
		}
	}
	this.moveRight = function(pixels)
	{
		this.velx += Math.min(50, Math.max(-50,pixels));
		var modulo = Math.sqrt(this.velx*this.velx+this.vely*this.vely);
		if (modulo >= 50)
		{
			this.velx = 50*this.velx/modulo;
			this.vely = 50*this.vely/modulo;
		}
	}
	this.moveUp = function(pixels)
	{
		this.vely -= Math.min(50, Math.max(-50,pixels));
		var modulo = Math.sqrt(this.velx*this.velx+this.vely*this.vely);
		if (modulo >= 50)
		{
			this.velx = 50*this.velx/modulo;
			this.vely = 50*this.vely/modulo;
		}
	}
	this.moveDown = function(pixels)
	{
		this.vely += Math.min(50, Math.max(-50,pixels));
		var modulo = Math.sqrt(this.velx*this.velx+this.vely*this.vely);
		if (modulo >= 50)
		{
			this.velx = 50*this.velx/modulo;
			this.vely = 50*this.vely/modulo;
		}
	}
	this.setVelocityDirection = function(dirx,diry)
	{
		var modulo = Math.sqrt(dirx*dirx+diry*diry);
		this.velx = dirx/modulo*5;
		this.vely = diry/modulo*5;
	}
	this.pintaRedondaBase = function(color)
	{
		//Hace falta cuando pintamos a mano, usando lineas y figuras predetermiandas en CANVAS.
		//Digamos que te mantiene el puntero dnd estaba la ultima vez, empieza de (0,0), con el moveTo(x,y) se puede canviar, tmb afecta a las transparencias.

		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);//el -8 es por el margin del body
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath();
	}
	this.pintaRedondaEnergia = function(color)
	{
		//Hace falta cuando pintamos a mano, usando lineas y figuras predetermiandas en CANVAS.
		//Digamos que te mantiene el puntero dnd estaba la ultima vez, empieza de (0,0), con el moveTo(x,y) se puede canviar, tmb afecta a las transparencias.

		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x,this.y,Math.sqrt(this.energia)*this.radio,0,2*Math.PI);//el -8 es por el margin del body
			canvas_ctx.fillStyle=color;
			canvas_ctx.fill();
		canvas_ctx.closePath();
	}
	this.pintaManos = function(color)
	{

		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		var modulo = Math.sqrt((this.x-this.mirox)*(this.x-this.mirox)+(this.y-this.miroy)*(this.y-this.miroy));
		var despx = (this.mirox-this.x)*(this.radio+10)/modulo;
		var despy = (this.miroy-this.y)*(this.radio+10)/modulo;
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x+despx+despy*(Math.sqrt(this.tamanoBola)+0.2),this.y+despy-despx*(Math.sqrt(this.tamanoBola)+0.2),10,0,2*Math.PI);
			canvas_ctx.arc(this.x+despx-despy*(Math.sqrt(this.tamanoBola)+0.2),this.y+despy+despx*(Math.sqrt(this.tamanoBola)+0.2),10,0,2*Math.PI);
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
	}
}
