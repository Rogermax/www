function cBichoCuerpoACuerpo(x,y,vel,radio,vida,dano)
{
	this.x = x;
	this.y = y;
	this.vel = vel;
	this.velx = -0.1;
	this.vely = -0.1;
	this.radio = radio;
	this.radio_attack = radio+10;
	this.burbujitax;
	this.burbujitay;
	this.vida_max = vida;
	this.vida = this.vida_max;
	this.dano = dano;
	//this.alcance = alcance;
	//this.atacando = false;
	//this.atacando_time = 20;
	this.recibe_dano = false;
	this.dano_recibido = 0;
	this.angulo = 0;
	this.Logic = function(burx, bury)
	{
		var modulo = Math.sqrt((burx-this.x)*(burx-this.x)+(bury-this.y)*(bury-this.y));
		var objx = (burx-this.x)/modulo;
		var objy = (bury-this.y)/modulo;
		//this.velx /= 1.1;
		//this.vely /= 1.1;
		this.velx += objx*0.5;
		this.vely += objy*0.5;
		var modulo_vel = Math.sqrt(this.velx*this.velx+this.vely*this.vely);
		if (modulo_vel > this.vel)
		{
			this.velx /= 1.2;
			this.vely /= 1.2;
		}
		this.angulo += 0.15;
		this.x += this.velx;
		this.y += this.vely;  	
	};
	this.Render = function(cheatMode)
	{
		if (cheatMode)
		{
			this.pintaRedondaBase();
		}
		else 
		{
			console.log("BICHO: no tengo imagen chula!");
		}
	};
	this.pintaRedondaBase = function()
	{
		//Hace falta cuando pintamos a mano, usando lineas y figuras predetermiandas en CANVAS.
		//Digamos que te mantiene el puntero dnd estaba la ultima vez, empieza de (0,0), con el moveTo(x,y) se puede canviar, tmb afecta a las transparencias.
		var canvas = document.getElementById("canvas");
		var ctx=canvas.getContext("2d");

		var grd=ctx.createRadialGradient(0,0,this.radio*0.6,0,0,this.radio);
		grd.addColorStop(0, "rgba(255, 155, 180, 0.8)");
		grd.addColorStop(1, "rgba(255, 0, 0, 1)");

		var grd2=ctx.createRadialGradient(this.radio,-this.radio,this.radio*0.7,this.radio,-this.radio,this.radio);
		grd2.addColorStop(0, "rgba(255, 155, 180, 0.8)");
		grd2.addColorStop(1, "rgba(255, 0, 0, 0.9)");

		ctx.save();

		ctx.transform(1,0,0,1,this.x,this.y);

		ctx.transform(Math.cos(this.angulo), -Math.sin(this.angulo), Math.sin(this.angulo), Math.cos(this.angulo), 0, 0);

		ctx.beginPath();
		   ctx.arc(this.radio,-this.radio,this.radio,2*Math.PI/2,3*Math.PI/2);
		   ctx.quadraticCurveTo(this.radio/5,-this.radio,this.radio/2, -this.radio*0.86602);
		   ctx.fillStyle=grd2
		   ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		   ctx.transform(0,-1,1,0,0,0);
		   ctx.arc(this.radio,-this.radio,this.radio,2*Math.PI/2,3*Math.PI/2);
		   ctx.quadraticCurveTo(this.radio/5,-this.radio,this.radio/2, -this.radio*0.86602);
		   ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		   ctx.transform(0,-1,1,0,0,0);
		   ctx.arc(this.radio,-this.radio,this.radio,2*Math.PI/2,3*Math.PI/2);
		   ctx.quadraticCurveTo(this.radio/5,-this.radio,this.radio/2, -this.radio*0.86602);
		   ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		   ctx.transform(0,-1,1,0,0,0);
		   ctx.arc(this.radio,-this.radio,this.radio,2*Math.PI/2,3*Math.PI/2);
		   ctx.quadraticCurveTo(this.radio/5,-this.radio,this.radio/2, -this.radio*0.86602);
		   ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		   ctx.arc(0,0,this.radio,0,4*Math.PI/2);
		   ctx.fillStyle=grd;
		   ctx.fill();
		ctx.closePath();

		ctx.restore();
	};
	this.pintaVida = function()
	{
		var canvas = document.getElementById("canvas");
		var context=canvas.getContext("2d");

		//Rectangulo exterior
		context.beginPath();
	      	context.rect(this.x-this.radio, this.y-this.radio-10, 2*this.radio, 2*this.radio/15);//x,y,ancho y largo
	      	context.fillStyle = "rgba(255, 105, 180, 0.0)";
	      	context.fill();
	      	context.lineWidth = 2;
	      	context.strokeStyle = "rgba(10, 25, 18, 0.6)";
	      	context.stroke();
      	context.closePath();

      	//Rectangulo interior
		context.beginPath();
			context.rect(this.x-this.radio, this.y-this.radio-10, 2*this.radio*this.vida/this.vida_max, 2*this.radio/15);
	      	context.fillStyle = "rgba(105, 255, 180, 0.5)";
	      	context.fill();
      	context.closePath();
	};
	this.setVelocityDirection = function(dirx, diry)
	{
		var modulo = Math.sqrt(dirx*dirx+diry*diry);
		this.velx += dirx/modulo*30;
		this.vely += diry/modulo*30;
	};
}