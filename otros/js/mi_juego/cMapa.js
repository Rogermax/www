function cMapa()
{
	this.arrayDisparos = new Array();
	this.arrayEffects = new Array();
	//this.arrayBichos = new Array();
	this.bicho = new cBichoCuerpoACuerpo(480,480,1,20,100,10);

	this.addDisparo = function(disparo)
	{
		var cont = 0;
		var indice =  this.arrayDisparos.length;
		for (var i = 0; i < this.arrayDisparos.length; ++i)
		{
			if (this.arrayDisparos[i] == null) 
			{
				indice = i;
				i = this.arrayDisparos.length;
			}
		}
		disparo.indice = indice
		this.arrayDisparos[indice] = disparo;
	}

	this.addEffect = function(effect)
	{
		var cont = 0;
		var indice =  this.arrayEffects.length;
		for (var i = 0; i < this.arrayEffects.length; ++i)
		{
			if (this.arrayEffects[i] == null) 
			{
				indice = i;
				i = this.arrayEffects.length;
			}
		}
		effect.indice = indice
		this.arrayEffects[indice] = effect;
	}

	this.rmDisparo = function(disparoId)
	{
		this.arrayDisparos[disparoId] = null;
	}
	this.Logic = function(burbujita,w,h)
	{
		//Si el bicho la palma saca OTRO!
		if (this.bicho.vida > 0)
		{
			this.bicho.Logic(burbujita.x, burbujita.y);
		}
		else 
		{
			this.bicho = new cBichoCuerpoACuerpo(w/2,h/2,1,20,100,10);
		}

		
		//Trata disparos
		for (var i = 0; i < this.arrayDisparos.length; ++i)
		{
			if (this.arrayDisparos[i] != null)
			{
				if (this.arrayDisparos[i].Logic(w,h))
				{
					this.procesaChoqueDisparoEnemigo(this.arrayDisparos[i], this.bicho);
				}
				else
				{
					this.rmDisparo(i);
				}
				//TODO
				//for (var j = 0; j < this.arrayDisparos.length; ++j)
				//{
				//	if (this.hasCollide(i,j))
				//	{
				//		var xo = this.arrayDisparos[i].x;
				//	}
				//}
			}
		}

		//Trata colisiones con burbujita
		this.procesaChoqueBurbujitaEnemigo(burbujita, this.bicho);


		//console.log("length particulas: "+this.arrayEffects.length);
		//Trata efectos de particulas
		for (var i = 0; i < this.arrayEffects.length; ++i)
		{
			if (this.arrayEffects[i] != null)
			{
				if (this.arrayEffects[i].tiempovida <= 0)
				{
					this.arrayEffects[i] = null;
				}
			}
		}
	}
	this.Render = function(cesped,w,h)
	{
		var ctx = document.getElementById("canvas").getContext("2d");
		ctx.beginPath();
			var pattern = ctx.createPattern(cesped, 'repeat');
			ctx.rect(0, 0, w, h);
			ctx.fillStyle = pattern;
			ctx.fill();
      	ctx.closePath();
		this.bicho.Render();
		for (var i = 0; i < this.arrayDisparos.length; ++i)
		{
			if (this.arrayDisparos[i] != null)
			{
				this.arrayDisparos[i].Render();
			}
		}

	}

	this.RenderEffects = function()
	{
		for (var i = 0; i < this.arrayEffects.length; ++i)
		{
			if (this.arrayEffects[i] != null)
			{
				this.arrayEffects[i].Render();
			}
		}
	}

	this.Render_lifes = function()
	{
		this.bicho.pintaVida();
	}



	this.procesaChoqueDisparoEnemigo = function (disparo, enemigo)
	{
		if (Math.sqrt((disparo.x-enemigo.x)*(disparo.x-enemigo.x)+(disparo.y-enemigo.y)*(disparo.y-enemigo.y)) < (disparo.radio+enemigo.radio_attack))
		{
			disparo.explota = true;
			enemigo.vida -= 1;
			this.addEffect(new cEffectChoqueBola((disparo.x+enemigo.x)/2, (disparo.y+enemigo.y)/2));
		}
	}

	this.procesaChoqueBurbujitaEnemigo = function (burbujita, enemigo)
	{
		if (Math.sqrt((burbujita.x-enemigo.x)*(burbujita.x-enemigo.x)+(burbujita.y-enemigo.y)*(burbujita.y-enemigo.y)) < (burbujita.radio+enemigo.radio_attack))
		{
			var dirx = burbujita.x-enemigo.x;
			var diry = burbujita.y-enemigo.y;
			burbujita.setVelocityDirection(dirx,diry);
			enemigo.setVelocityDirection(-dirx, -diry);
			burbujita.vida -= 0.1;
		}
	}
}