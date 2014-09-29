function cEntidad(tipo, is_cuadrado, x, y, radio)
{
	this.tipo = tipo;
	this.is_cuadrado = is_cuadrado;
	this.x = x;
	this.y = y;
	this.radio = radio;
	this.renderBase = function()
	{
		var ctx = document.getElementById("canvas").getContext("2d");
		switch(tipo) {
			case "arbol":
				ctx.beginPath();
					ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);//el -8 es por el margin del body
					ctx.fillStyle="brown";
					ctx.fill();
				ctx.closePath();
				break;
			case "roca":
				ctx.beginPath();
					ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);//el -8 es por el margin del body
					ctx.fillStyle="gray";
					ctx.fill();
				ctx.closePath();

				break;
			default:
				ctx.beginPath();
					ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);//el -8 es por el margin del body
					ctx.fillStyle="violet";
					ctx.fill();
				ctx.closePath();
		}
	};
	this.renderTecho = function()
	{
		console.log("pintariamos techo");
	};
	this.chocaCon = function(entidad_movil)
	{
		if (this.is_cuadrado)
		{
			return false; //TODO
		}
		else
		{
			return ((entidad_movil.radio+this.radio) < Math.sqrt((entidad_movil.x-this.x)*(entidad_movil.x-this.x)+(entidad_movil.y-this.y)*(entidad_movil.y-this.y)));
		}
	};
}