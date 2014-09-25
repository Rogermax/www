function canvas_libro(){

    this.canvas=document.getElementById("canvas-libro");
    this.ctx=this.canvas.getContext("2d");

    this.imageIndex=0;
    this.animPctComplete=0;
    this.fps = 60;

    // image loader

    this.imageURLs=[];
    this.imagesOK=0;
    this.imgs=[];
    this.keys=[];
    this.imageURLs.push("img/1.jpg");
    this.imageURLs.push("img/2.jpg");
    this.imageURLs.push("img/3.jpg");
    this.imageURLs.push("img/4.jpg");
    this.imageURLs.push("img/5.jpg");
    this.imageURLs.push("img/6.jpg");
    this.listo = false;
    this.lastTime = (new Date).getTime();

    this.loadAllImages = function(){
        for (var i = 0; i < this.imageURLs.length; i++) {
            var img = new Image();
            this.imgs.push(img);
            var self = this;
            img.onload = function(){ 
                self.imagesOK++; 
                if (self.imagesOK==self.imageURLs.length ) {
                    self.listo = true;
                }
            }; 
            img.src = this.imageURLs[i];
        } 
    }

    this.AsignaTecladoMouse = function()  //aki van todos los eventListener
    {
        var self = this;
        this.ctx.oncontextmenu = function() {
            return false; 
        };
        read_keyboarddown = function(event) 
            {
                if (event.keyCode != null)
                {
                    key = event.keyCode;
                    if(key == 37 || key == 38 || key == 39 || key == 40 || key == 8 || key == 46)  // Left / Up / Right / Down Arrow, Backspace, Delete keys
                        self.keys[key] = true;
                    else 
                        self.keys[String.fromCharCode(event.keyCode)] = true;     // All others
                }
                else //para teclas especiales
                {
                    console.log("keyCode es null");
                }
                console.log("hemos apretado"+key);
            };
        read_keyboardup = function(event) 
            {
                if (event.keyCode != null)
                {                   
                    key = event.keyCode;
                    if(key == 37 || key == 38 || key == 39 || key == 40 || key == 8 || key == 46)  // Left / Up / Right / Down Arrow, Backspace, Delete keys
                        self.keys[key] = false;
                    else 
                        self.keys[String.fromCharCode(event.keyCode)] = false;    // All others
                }
                else //para teclas especiales
                {
                    console.log("keyCode es null");
                }
                console.log("hemos soltado"+key);
            };
        read_mouseDown = function(event)
            {
                console.log("mouse-down");
            };
        read_mouseUp = function(event)
            {
                console.log("mouse-up");            
            };
        /*onResize = function()
            {
                self.width = sizeWH().width;
                self.height = sizeWH().height;
                self.offsetx = 0;
                self.offsety = 0;
                if (16*self.height < 9*self.width)
                {
                    self.width = self.height*16/9;
                    self.offsetx = (sizeWH().width-self.width)/2;
                }
                else 
                {
                    self.height = self.width*9/16;
                    self.offsety = (sizeWH().height-self.height)/2;
                }

                document.getElementById("canvas").style.top = self.offsety+'px'; document.getElementById("canvas").style.left = self.offsetx+'px';
                document.getElementById("canvas").style.width = self.width; document.getElementById("canvas").style.height = self.height;
                document.getElementById("canvas").width = 1280; document.getElementById("canvas").height = 768;

                self.canvas = document.getElementById("canvas");
 

                //self.RenderTitulo();
                //self.RenderInfo();
                //self.RenderMenu();
            };*/
        window.addEventListener('keydown', read_keyboarddown, false);
        window.addEventListener('keyup', read_keyboardup, false);
        //window.addEventListener('mousemove', read_mouseMove, false); //Se activa solo si detecta movimiento del mouse.
        window.addEventListener('mousedown', read_mouseDown, false);
        window.addEventListener('mouseup', read_mouseUp, false);
        //window.addEventListener('resize', onResize,false);
        //window.addEventListener('blur', pause_game);
        //window.addEventListener('focus', depause_game);
        //onResize();
    };


    this.run = (function(game) 
          {
            var loops = 0, skipTicks = 1000 / game.fps,
                maxFrameSkip = 1,
                nextGameTick = (new Date).getTime(),
                pinta = false;
            
            return function() {
              loops = 0;
              
              while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
                pinta = game.Loop();
                nextGameTick += skipTicks;
                loops++;
              }
              
              if (loops && pinta) game.Render();
            };
          })(this);

    this.Loop = function() {
        return true;
    }

    this.Render = function() {
            // get the current image
            // get the xy where the image will be drawn
        if (this.listo) {
            var img=this.imgs[this.imageIndex];
            var tiempo = ((new Date).getTime() - this.lastTime);
            var imgX=0;
            if (tiempo > 500 && tiempo < 4500)
                imgX=Math.abs(this.canvas.width-img.width)*(tiempo-500)/4000;
            else if (tiempo >= 4500)
                imgX=Math.abs(this.canvas.width-img.width);

            // set the current opacity
            if (tiempo < 1500) this.ctx.globalAlpha=tiempo/1500;
            else if (tiempo < 3500) this.ctx.globalAlpha = 1;
            else this.ctx.globalAlpha=1-(tiempo-3500)/1500;

            // draw the image
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.drawImage(img,-imgX,0);

            // if the current animation is complete
            // reset the animation with the next image
            if(tiempo>=100){
                if (this.keys[37]) {
                    this.imageIndex--;
                    this.lastTime = (new Date).getTime();
                    if (this.imageIndex < 0) this.imageIndex = this.imgs.length-1;
                }
                if (this.keys[39] || ((new Date).getTime() - this.lastTime)>5000) {
                    this.imageIndex++;
                    this.lastTime = (new Date).getTime();
                    if(this.imageIndex>=this.imgs.length) this.imageIndex=0;
                }
            }
        }

    }


};
