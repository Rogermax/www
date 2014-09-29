function cMapa(x,y,zoom)
{
	this.mapaTiles = new Array();
	this.casa = {};	//vamos a casa, se puede personalizar a burbijta, dormir.
	this.aserradero = {}; //vendemos la madera que cogemos. 
	//this.arrayBaseEntidades = new Array(); //burbujita se choca con estas.
	//this.arrayTechoEntidades = new Array(); //burbujita pasa por debajo a estas.
	this.arrayDisparos = new Array();
	this.arrayEffects = new Array();
	//this.arrayBichos = new Array();
	this.bichos_activos = new Array();
	this.bichos_inactivos = new Array();
	this.camerax = x;
	this.cameray = y;
	this.zoom = zoom;
	this.size = [json_level["height"],json_level["width"]];
	this.tilewidth = json_level["tilewidth"];

	this.burbujita_inicio = function() {
		return {0:0, 1:0};
	}

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
		/*if (this.bicho.vida > 0)
		{
			this.bicho.Logic(burbujita.x, burbujita.y);
		}
		else 
		{
			this.bicho = new cBichoCuerpoACuerpo(w/2,h/2,1,20,100,10);
			burbujita.exp += 10;*/
			//var formData = {exp:"10"};
			
			/*$.ajax({
			    url : "inc_poder.php",
			    type: "POST",
			    data : formData,
			    success: function(data, textStatus, jqXHR)
			    {

			    },
			    error: function (jqXHR, textStatus, errorThrown)
			    {
			 
			    }
			});*/

			//SUBIMOS EXP.
			/*$.post("inc_exp.php", {
					exp:10
					},
					function (themessage) {
                    console.log("10 Exp ganada!");
                });*/
		/*}*/

		
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
	this.Render = function(cheatMode,cesped,suelo,w,h,pintor)
	{
		var ctx = document.getElementById("canvas").getContext("2d");
		if (cheatMode)
		{
			//cesped
			ctx.beginPath();
				ctx.fillStyle="green";
				ctx.fillRect(0,0,1280,768);
				for (var i = 0; i < 4; ++i) {
					ctx.drawImage(suelo,1+i*(16+1),1+i*(16+1),16,16,i*(1280/4*this.zoom),i*1280/4*this.zoom,1280/4*this.zoom, 1280/4*this.zoom);
				}
	      	ctx.closePath();

	      	//bicho
			this.bicho.Render(true);

			//disparos
			for (var i = 0; i < this.arrayDisparos.length; ++i)
			{
				if (this.arrayDisparos[i] != null)
				{
					this.arrayDisparos[i].Render(true);
				}
			}
		}
		else 
		{
			//cesped
			ctx.beginPath();
				var pattern = ctx.createPattern(cesped, 'repeat');
				ctx.rect(0, 0, w, h);
				ctx.fillStyle = pattern;
				ctx.fill();
	      	ctx.closePath();



	      	//bicho
			this.bicho.Render(false);

			//arbol
			pintor.pintaArbol();

			//disparos
			for (var i = 0; i < this.arrayDisparos.length; ++i)
			{
				if (this.arrayDisparos[i] != null)
				{
					this.arrayDisparos[i].Render(false);
				}
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
			enemigo.vida -= 1*disparo.poder/100;
			this.addEffect(new cEffectChoqueBola((disparo.x+enemigo.x)/2, (disparo.y+enemigo.y)/2));
		}
	}

	this.procesaChoqueBurbujitaEnemigo = function (burbujita, enemigo)
	{
		/*var modulo = Math.sqrt((burbujita.x-enemigo.x)*(burbujita.x-enemigo.x)+(burbujita.y-enemigo.y)*(burbujita.y-enemigo.y));
		if (modulo < (burbujita.radio+enemigo.radio_attack))
		{
			var dirx = (burbujita.x-enemigo.x)/modulo;
			var diry = (burbujita.y-enemigo.y)/modulo;
			burbujita.setVelocityDirection(dirx,diry);
			enemigo.setVelocityDirection(-dirx, -diry);
			burbujita.vida -= 0.1;
		}*/
	}
}