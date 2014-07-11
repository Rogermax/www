function cEffectChoqueBola(x,y)
{
	this.x = x;
	this.y = y;
	this.velx = (0.5-Math.random())*10;
	this.vely = (0.5-Math.random())*10;
	this.indice = -1;
	this.tiempovida = 20;
	this.radio = Math.random()*10;
	this.Render = function ()
	{
		var canvas = document.getElementById("canvas");
		var canvas_ctx=canvas.getContext("2d");
		canvas_ctx.beginPath();
			canvas_ctx.arc(this.x,this.y,this.radio,0,2*Math.PI);
			canvas_ctx.fillStyle='rgba(255, 255, 0, '+Math.max(0,Math.min(1,(this.tiempovida/20))).toString()+')';
			canvas_ctx.fill();
		canvas_ctx.closePath();
		this.tiempovida = Math.max(0,this.tiempovida-1);
		this.x += this.velx;
		this.y += this.vely;
	}
}