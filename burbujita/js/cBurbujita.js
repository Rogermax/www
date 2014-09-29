function cBurbujita(posx, posy, velx, vely,color_base, color_energia, color_manos, poder) 
{
	this.x = posx;
	this.y = posy;
	this.max_vel = 20; //Velocidad maxma, tope de seguridad, evitar chetos.
	this.inc_velx = 0;
	this.inc_vely = 0;
	this.velx = 0;
	this.vely = 0;
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
	this.aux = 1;
	this.cont = 0;
	this.vel = 100; //La velocidad base es 5 cuando esto es del 100%

	this.color_base = color_base;
	this.color_energia = color_energia;
	this.color_manos = color_manos;
	this.poder = poder;
	this.exp = 0;

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
			this.disparo = new cDisparo(-1,this.x+despx, this.y+despy, 5*(this.mirox-this.x)/modulo, 5*(this.miroy-this.y)/modulo, this.color_energia, this.poder);
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
		
		//var aux_anterior;
		if (this.vida > 0)
		{
			//console.log("posx burbuja",this.inc_velx+"");
			//console.log("posy burbuja",this.inc_vely+"");
			//console.log(Math.floor(Math.abs(this.velx)/2));
			//aux_anterior = this.aux;
			//this.aux = (this.aux+Math.floor(Math.abs(this.velx)/2))%5;
			//if (aux_anterior > this.aux) this.cont = (this.cont+1)%9;
			//if (Math.abs(this.velx) < 1) this.cont = 0;
			this.energia = Math.min(1,this.energia+0.001);
			this.mirox = mousex;
			this.miroy = mousey;
			var modulo = 1;
			if (this.inc_velx != 0 || this.inc_vely != 0)
				modulo = Math.sqrt(this.inc_velx*this.inc_velx + this.inc_vely*this.inc_vely);
			this.velx += this.vel/200*this.inc_velx/modulo; //dividimos entre 200, porque asi la velocidad en 100% es de 5
			this.vely += this.vel/200*this.inc_vely/modulo;
			modulo = Math.sqrt(this.velx*this.velx + this.vely*this.vely);
			if (modulo > this.max_vel)
			{
				this.velx = this.max_vel*this.velx/modulo;
				this.vely = this.max_vel*this.vely/modulo;
			}
			//modulo = Math.sqrt(this.velx*this.velx + this.vely*this.vely);
			//console.log("Modulo_vel_2:",modulo+"");
			this.x = this.x+this.velx;
			this.y = this.y+this.vely;
			this.x = Math.max(this.radio, Math.min(w-this.radio, this.x)); //evitar que salga del mapa eje horizontal
			this.y = Math.max(this.radio, Math.min(h-this.radio, this.y)); //evitar que salga del mapa eje vertical
			this.velx *= 0.9;
			this.vely *= 0.9;
			this.inc_velx = 0;
			this.inc_vely = 0;
			return true;
		}
		else return false;
	}
	this.Render = function(cheatMode,pintor)
	{
		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		if (cheatMode)
		{
			if (this.disparo != null) this.disparo.Render(true);
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
				this.pintaRedondaBase(this.color_base);
				this.pintaRedondaEnergia(this.color_energia);
				this.pintaManos(this.color_manos);
			}
		}
		else
		{
			if (this.disparo != null) this.disparo.Render(false);
			if (this.dispara)
			{
				if (this.momentoDisparo <= 0) 
				{
					this.momentoDisparo = 4;
					this.dispara = false;
				}
				else this.momentoDisparo--;
				pintor.pintaBurbujitaCargando(this);
			}
			else 
			{
				pintor.pintaBurbujita(this);
			}
		}
		canvas_ctx.globalAlpha = 1;
		
	}
	this.moveLeft = function(pixels)
	{
		this.inc_velx = -pixels;
	}
	this.moveRight = function(pixels)
	{
		this.inc_velx = pixels;
	}
	this.moveUp = function(pixels)
	{
		this.inc_vely = -pixels;
	}
	this.moveDown = function(pixels)
	{
		this.inc_vely = pixels;
	}
	this.setVelocityDirection = function(dirx,diry)
	{
		this.velx = 5*this.vel/100*dirx;
		this.vely = 5*this.vel/100*diry;
	}
	this.pintaRedondaBase = function(color)
	{
		//Hace falta cuando pintamos a mano, usando lineas y figuras predetermiandas en CANVAS.
		//Digamos que te mantiene el puntero dnd estaba la ultima vez, empieza de (0,0), con el moveTo(x,y) se puede canviar, tmb afecta a las transparencias.

		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);//el -8 es por el margin del body
			canvas_ctx.globalAlpha = 0.6;
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
			canvas_ctx.globalAlpha = 1;
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
	}
}
