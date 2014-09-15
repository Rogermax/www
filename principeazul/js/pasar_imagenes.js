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
    this.imageURLs.push("img/bmw-z8.jpg");
    this.imageURLs.push("img/celica.jpg");
    this.imageURLs.push("img/koenigsegg.jpg");
    this.imageURLs.push("img/manila 2.jpg");
    this.imageURLs.push("img/manila.jpg");
    this.listo = false;

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
            var imgX=(this.canvas.width/2-img.width/2)*this.animPctComplete;
            var imgY=(this.canvas.height/2)-img.height/2;

            // set the current opacity
            this.ctx.globalAlpha=this.animPctComplete;

            // draw the image
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.drawImage(img,imgX,imgY);

            // increment the animationPctComplete for next frame
            this.animPctComplete+=.01;  //100/fps;

            // if the current animation is complete
            // reset the animation with the next image
            if(this.animPctComplete>=0.55){
                if (this.animPctComplete>=1.00) this.animPctComplete=1.00;
                if (this.keys[37]) {
                    this.imageIndex--;
                    if (this.imageIndex < 0) this.imageIndex = this.imgs.length-1;
                    this.animPctComplete = 0.50;
                }
                if (this.keys[39]) {
                    this.imageIndex++;
                    if(this.imageIndex>=this.imgs.length) this.imageIndex=0;
                    this.animPctComplete = 0.50;
                }
            }
        }

    }


};
