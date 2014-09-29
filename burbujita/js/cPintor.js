function cPintor(array) 
{
	this.imagenes = array;
	this.context = document.getElementById("canvas").getContext("2d");
	this.pintaBurbujitaCargando = function(burbujita)
	{
		this.context.save();
		var w = document.getElementById("canvas").width;
		if (burbujita.velx < 0)
		{
			this.context.translate(w, 0);
            this.context.scale(-1, 1);
			this.context.drawImage(this.imagenes['b_stb_azul_cuerpo'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*3, burbujita.radio*3);
			this.context.drawImage(this.imagenes['b_stb_azul_ojos'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*3, burbujita.radio*3);
			this.context.drawImage(this.imagenes['b_stb_azul_cejas'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*3, burbujita.radio*3);
		}
		else
		{
			this.context.drawImage(this.imagenes['b_stb_azul_cuerpo'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*3, burbujita.radio*3);
			this.context.drawImage(this.imagenes['b_stb_azul_ojos'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*3, burbujita.radio*3);
			this.context.drawImage(this.imagenes['b_stb_azul_cejas'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*3, burbujita.radio*3);
		}
		this.context.restore();
	};
	this.pintaBurbujita = function(burbujita)
	{
		this.context.save();
		var w = document.getElementById("canvas").width;
		if (burbujita < 0|| burbujita.cont > 8) console.log (burbujita.cont);
		if (burbujita.cont == 0) 
		{
			if (burbujita.velx < 0)
			{
				this.context.translate(w, 0);
	            this.context.scale(-1, 1);
				this.context.drawImage(this.imagenes['b_stb_rosa_cuerpo'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_stb_rosa_ojos'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_stb_rosa_cejas'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
			}
			else
			{
				this.context.drawImage(this.imagenes['b_stb_rosa_cuerpo'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_stb_rosa_ojos'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_stb_rosa_cejas'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
			}
		}
		else
		{
			if (burbujita.velx < 0)
			{
				this.context.translate(w, 0);
	            this.context.scale(-1, 1);
				this.context.drawImage(this.imagenes['b_mov_01_'+(burbujita.cont-1).toString()+'_rosa_cuerpo'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_mov_01_'+(burbujita.cont-1).toString()+'_rosa_ojos'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_mov_01_'+(burbujita.cont-1).toString()+'_rosa_cejas'],w-burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
			}
			else
			{
				this.context.drawImage(this.imagenes['b_mov_01_'+(burbujita.cont-1).toString()+'_rosa_cuerpo'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_mov_01_'+(burbujita.cont-1).toString()+'_rosa_ojos'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
				this.context.drawImage(this.imagenes['b_mov_01_'+(burbujita.cont-1).toString()+'_rosa_cejas'],burbujita.x-burbujita.radio,burbujita.y-burbujita.radio,burbujita.radio*2, burbujita.radio*2);
			}
		}
		this.context.restore();
	};
	this.pintaArbol = function()
	{
		this.context.save();
		this.context.drawImage(this.imagenes['arbol'],256,256,100,100);
		this.context.drawImage(this.imagenes['arbol'],356,256,100,100);
		this.context.drawImage(this.imagenes['arbol'],306,306,100,100);
		this.context.restore();
	};
}