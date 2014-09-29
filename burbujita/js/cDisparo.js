function cDisparo(indice, posx, posy, velx, vely, color_energia, poder) 
{
	this.x = posx;
	this.y = posy;
	this.velx = velx;
	this.vely = vely;
	this.radio = 10;
	this.explota = false;
	this.tiempoExplosion = 20;
	this.indice = indice;
	this.poder = poder;
	this.color_energia = color_energia;
	this.Logic = function(w,h)
	{
		if (this.explota)
		{
			this.velx = 0;
			this.vely = 0;
			if (this.tiempoExplosion <= 0)
			{
				this.tiempoExplosion = 20;
				this.explota = false;
				return false;
			}
			else 
			{
				this.tiempoExplosion--;
			}
		}
		else
		{
			if (this.x <= this.radio) //este tio no deberia mirar colisiones, lo hace el mapa.
			{
				this.x = this.radio;
				this.explota = true;
				if (this.y <= this.radio)
				{
					this.y = this.radio;
				}
				else if (this.y >= h-this.radio)
				{
					this.y = h-this.radio;
				}
			}
			else if (this.x >= w-this.radio)
			{
				this.x = w-this.radio;
				this.explota = true;
				if (this.y <= this.radio)
				{
					this.y = this.radio;
				}
				else if (this.y >= h-this.radio)
				{
					this.y = h-this.radio;
				}
			}
			else
			{
				if (this.y <= this.radio)
				{
					this.y = this.radio;
					this.explota = true;
				}
				else if (this.y >= h-this.radio)
				{
					this.y = h-this.radio;
					this.explota = true;
				}
				else
				{
					this.x += this.velx;
					this.y += this.vely;
				}
			}
		}
		return true;
	};
	this.Render = function(cheatMode)
	{
		if (cheatMode)
		{
			var color = null;
			if (this.explota) color = "rgba(255,"+(255-25/2*this.tiempoExplosion).toString()+",0,1)"; //color = "rgba(255,255,0,";
			else color = this.color_energia;
			var canvas = document.getElementById("canvas");
			var canvas_ctx=canvas.getContext("2d");
			canvas_ctx.beginPath();
				canvas_ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
				canvas_ctx.fillStyle=color;
				canvas_ctx.fill();
			canvas_ctx.closePath();

			canvas_ctx.beginPath();
				canvas_ctx.arc(this.x,this.y,this.radio*this.poder/100,0,2*Math.PI);
				canvas_ctx.globalAlpha = 0.2;
				canvas_ctx.fillStyle=color;
				canvas_ctx.fill();
			canvas_ctx.closePath();
			canvas_ctx.globalAlpha = 1;
		}
		else
		{
			console.log('DISPARO_'+this.indice.toString()+': no tengo imagen chula!');
		}
	};
}