function cCasilla(i,activa,canvas,w,h)
{
	this.level = i;
	this.activa = activa;
	this.canvas = canvas;
	this.wcanvas = w;
	this.hcanvas = h;
	this.w = this.wcanvas/4;
	this.h = this.hcanvas/4;
	this.img = undefined;
	this.imgB = undefined;
	this.coords = function() {
		switch(this.level) 
		{
			case 0:
				return [1,3];
			case 1:
				return [0,3];
			case 2:
				return [0,2];
			case 3:
				return [1,2];
			case 4:
				return [1,1];
			case 5:
				return [0,1];
			case 6:
				return [0,0];
			case 7:
				return [1,0];
			case 8:
				return [2,0];
			case 9:
				return [3,0];
			case 10:
				return [3,1];
			case 11:
				return [2,1];
			case 12:
				return [2,2];
			case 13:
				return [3,2];
			case 14:
				return [3,3];
			case 15:
				return [2,3];
			case 16:
				return [1.5,1.5];

		}
	};
	var pos = this.coords();
	this.x = this.w*pos[0];
	this.y = this.h*pos[1];
	this.resalto = 0;
	this.Entra = function() {
		console.log("cCasilla","Entra en: "+(this.level+1));
		this.post("game.php",{level: 1}); //deberia ser this.level+1
	}
	this.Logic = function() {
		this.resalto = Math.max(0,this.resalto-2);
	};
	this.Resalta = function() {
		this.resalto = 100;
	};
	this.PutImage = function(image)
	{
		this.img = image;
	};
	this.PutImageB = function(image)
	{
		this.imgB = image;
	};
	this.changeSize = function(w,h)
	{
		this.w = w/4;
		this.h = h/4;
		var pos = this.coords();
		this.x = this.w*pos[0];
		this.y = this.h*pos[1];
	}
	this.Render = function() {
		var ctx=this.canvas.getContext("2d");
		ctx.beginPath();
			if (this.activa) {
				if(this.img == undefined)
				{
					ctx.fillStyle = "rgba("+(this.resalto*2)+",255,0,"+(20+this.resalto)/120+")";
					ctx.fillRect(this.x,this.y,this.w,this.h);
				}
				else 
				{
					ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
					ctx.fillStyle = "rgba("+(this.resalto*2)+","+(this.resalto*2)+",0,"+(this.resalto)/200+")";
					ctx.fillRect(this.x,this.y,this.w,this.h);
				}
				//console.log("cCasilla","color: "+"rgba(0,255,0,"+(55+this.resalto)+")");
			}
			else {
				if(this.imgB == undefined)
				{
					ctx.fillStyle = "rgba(255,0,0,"+(20+this.resalto)/120+")";
					ctx.fillRect(this.x,this.y,this.w,this.h);
				}
				else 
				{
					ctx.drawImage(this.imgB, this.x, this.y, this.w, this.h);
				}
			}
		ctx.closePath();
	};

	this.post = function(path, params) {

	    // The rest of this code assumes you are not using a library.
	    // It can be made less wordy if you use one.
	    var form = document.createElement("form");
	    form.setAttribute("method", "post");
	    form.setAttribute("action", path);

	    for(var key in params) {
	        if(params.hasOwnProperty(key)) {
	            var hiddenField = document.createElement("input");
	            hiddenField.setAttribute("type", "hidden");
	            hiddenField.setAttribute("name", key);
	            hiddenField.setAttribute("value", params[key]);

	            form.appendChild(hiddenField);
	         }
	    }

	    document.body.appendChild(form);
	    form.submit();
	}





} 