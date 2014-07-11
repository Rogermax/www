function cInterficie()
{
	this.context = document.getElementById("canvas_puntos").getContext("2d");
	this.cristal = null;
	this.Render = function(energia_burbujita, vida_burbujita)
	{
		this.context.clearRect(0, 0, 3/5*sizeWH().width, 100);


		this.RectanguloLlenable("Energy:",energia_burbujita, 20, 20, 3/5*sizeWH().width-20, 20+20);
		this.RectanguloLlenable("Vida:",vida_burbujita, 20, 60, 3/5*sizeWH().width-20, 60+20);

  
      	//Cristal frontal
		//this.context.beginPath();
			//var pattern = this.context.createPattern(this.cristal, 'no-repeat');
			this.context.drawImage(this.cristal,0,0,3/5*sizeWH().width, 100);
			//this.context.rect(0, 0, 3/5*sizeWH().width, 100);
			//this.context.fillStyle = pattern;
			//this.context.fill();
      	//this.context.closePath();
	}

	this.RectanguloLlenable = function(texto, porcentaje_lleno, px, py, pxf, pyf)
	{

		var alto = pyf-py;
		var context = this.context;

		//Texto: 
      	context.beginPath();
			context.font = '24px Calibri';
			context.lineWidth = 1;
			context.strokeStyle = "rgba(20, 60, 255, 0.8)";
	      	context.strokeText(texto, px, py+alto/2+7);
			context.fillStyle = "rgba(60, 180, 255, 0.4)"; 
	      	context.fillText(texto, px, py+alto/2+7);
      	context.closePath();


		var largo = pxf-(px+texto.length*12);
		//Rectangulo exterior
		context.beginPath();
	      	context.rect(pxf-largo, py, largo, alto);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180, 0.0)";
	      	context.fill();
	      	context.lineWidth = 2;
	      	context.strokeStyle = "rgba(255, 105, 180, 0.6)";
	      	context.stroke();
      	context.closePath();

      	//Rectangulo interior
		context.beginPath();
	      	context.rect(pxf-largo, py, porcentaje_lleno*(largo), alto);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180, 0.5)";
	      	context.fill();
      	context.closePath();


      	//Porcentaje
      	context.beginPath();
      		context.font = '18px Calibri';
			context.lineWidth = 0.5;
			context.strokeStyle = "rgba(20, 60, 255, 0.8)"
	      	context.strokeText((Math.round(porcentaje_lleno*100)).toString()+" %", pxf-largo/2-20, py+alto/2+6);
      	context.closePath();
	}
}