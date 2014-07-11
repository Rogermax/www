Array.prototype.erase = function (item) {
	for (var i = this.length; i--; i) {
		if (this[i] === item) this.splice(i, 1);
	}

	return this;
};

Function.prototype.bind = function (bind) {
	var self = this;
	return function () {
		var args = Array.prototype.slice.call(arguments);
		return self.apply(bind || null, args);
	};
};

merge = function (original, extended) {
	for (var key in extended) {
		var ext = extended[key];
		if (typeof (ext) != 'object' || ext instanceof Class) {
			original[key] = ext;
		} else {
			if (!original[key] || typeof (original[key]) != 'object') {
				original[key] = {};
			}
			merge(original[key], ext);
		}
	}
	return original;
};

function copy(object) {
	if (!object || typeof (object) != 'object' || object instanceof Class) {
		return object;
	} else if (object instanceof Array) {
		var c = [];
		for (var i = 0, l = object.length; i < l; i++) {
			c[i] = copy(object[i]);
		}
		return c;
	} else {
		var c = {};
		for (var i in object) {
			c[i] = copy(object[i]);
		}
		return c;
	}
}

function ksort(obj) {
	if (!obj || typeof (obj) != 'object') {
		return [];
	}

	var keys = [],
		values = [];
	for (var i in obj) {
		keys.push(i);
	}

	keys.sort();
	for (var i = 0; i < keys.length; i++) {
		values.push(obj[keys[i]]);
	}

	return values;
}


(function () {
	var initializing = false,
		fnTest = /xyz/.test(function () {
			xyz;
		}) ? /\bparent\b/ : /.*/;

	this.Class = function () {};
	var inject = function (prop) {
		var proto = this.prototype;
		var parent = {};
		for (var name in prop) {
			if (typeof (prop[name]) == "function" && typeof (proto[name]) == "function" && fnTest.test(prop[name])) {
				parent[name] = proto[name]; // save original function
				proto[name] = (function (name, fn) {
					return function () {
						var tmp = this.parent;
						this.parent = parent[name];
						var ret = fn.apply(this, arguments);
						this.parent = tmp;
						return ret;
					};
				})(name, prop[name]);
			} else {
				proto[name] = prop[name];
			}
		}
	};

	this.Class.extend = function (prop) {
		var parent = this.prototype;

		initializing = true;
		var prototype = new this();
		initializing = false;

		for (var name in prop) {
			if (typeof (prop[name]) == "function" && typeof (parent[name]) == "function" && fnTest.test(prop[name])) {
				prototype[name] = (function (name, fn) {
					return function () {
						var tmp = this.parent;
						this.parent = parent[name];
						var ret = fn.apply(this, arguments);
						this.parent = tmp;
						return ret;
					};
				})(name, prop[name]);
			} else {
				prototype[name] = prop[name];
			}
		}

		function Class() {
			if (!initializing) {

				// If this class has a staticInstantiate method, invoke it
				// and check if we got something back. If not, the normal
				// constructor (init) is called.
				if (this.staticInstantiate) {
					var obj = this.staticInstantiate.apply(this, arguments);
					if (obj) {
						return obj;
					}
				}

				for (var p in this) {
					if (typeof (this[p]) == 'object') {
						this[p] = copy(this[p]); // deep copy!
					}
				}

				if (this.init) {
					this.init.apply(this, arguments);
				}
			}

			return this;
		}

		Class.prototype = prototype;
		Class.constructor = Class;
		Class.extend = arguments.callee;
		Class.inject = inject;

		return Class;
	};

})();

newGuid_short = function () {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (S4()).toString();
};














// The above is an example of how the JSON would be structured.
// Note that chaingun_impact.png is not here, we'll call your
// parseJSON function with the full JSON input.
//
// Note also that the above is an actual Javascript object, whereas
// JSON is a string that represents that object.
var canvas = null;
var ctx = null;
var numFrames = 15;
var frames = [];
var frame = 0;
var frameRate = 1000/10;
var drawx = 0;
var drawy = 0;
var ima = null;
// We'll call your setup function in our test code, so
// don't call it in your code.
// setup();

var gSpriteSheets = {};

SpriteSheetClass = Class.extend({
	img: null,
	url: "",
	sprites: new Array(),
	init: function () {},
	load: function (imgName) {
		// Store the URL of the spritesheet we want.
        this.url = imgName;
        
        // Create a new image whose source is at 'imgName'.
		var img = new Image();
		img.src = imgName;

        // Store the Image object in the img parameter.
		this.img = img;

        // Store this SpriteSheetClass in our global
        // dictionary gSpriteSheets defined above.
		gSpriteSheets[imgName] = this;
		/*var caca = 0;
		for (var key in gSpriteSheets)
		{
			caca++;
		}
		console.log("su longitud es: "+caca);
		*/
	},
	defSprite: function (name, x, y, w, h, cx, cy) {
     
		var spt = {
			"id": name,
			"x": x,
			"y": y,
			"w": w,
			"h": h,
			"cx": cx == null ? 0 : cx,
			"cy": cy == null ? 0 : cy
		};

     
		this.sprites.push(spt);
	},
	parseAtlasDefinition: function (atlasJSON) {
        var parsed = JSON.parse(atlasJSON);
        for (var key in parsed.frames) {
        	if (key != "erase") {
	        	var sprite = parsed.frames[key];
	        	var centerx = -sprite.frame.w * 0.5;
	        	var centery = -sprite.frame.h * 0.5;
	       		this.defSprite(key, sprite.frame.x,sprite.frame.y,sprite.frame.w,sprite.frame.h,centerx,centery);
       		}
        }
	},
	getStats: function (name) {
        // For each sprite in the 'sprites' Array...
		for(var i = 0; i < this.sprites.length; i++) {
            
            // Check if the sprite's 'id' parameter
            // equals the passed in name...
            if(this.sprites[i].id === name) {
                // and return that sprite if it does.
                return this.sprites[i];
            }

		}

        // If we don't find the sprite, return null.
		return null;
	}
});

var setup = function() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET","/otros/images/Burbujita/burbujita.json",true);
    xhr.onload = function() {
    	var ssc = new SpriteSheetClass();
    	ssc.parseAtlasDefinition(this.responseText);
    	ssc.load("/otros/images/Burbujita/burbujita.png");
    };
    xhr.send();


	var body = document.getElementById("body");
    var note = document.createElement("p");
    note.id = "note";
    note.textContent = "PROBANDO! HAY UN CANVAS ARRIBA!";
    body.appendChild(note);
};

var manipulateDOM = function() {
    var body = document.getElementById("body");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
	canvas.setAttribute('width', window.innerWidth-5);
	canvas.setAttribute('height', window.innerHeight-5);
    /*for (var i = 0; i < numFrames; i++) {
        frames.push(new Image());
        frames[i].onload = onImageLoad;
        frames[i].src = assets[i];
    }
    setInterval(animate,frameRate);
    */
      

};    

function drawSprite(spritename, posX, posY) {
    for (var sheetname in gSpriteSheets) {
        var sheet = gSpriteSheets[sheetname];
        console.log("sheetname: "+sheetname);
        var sprite = sheet.getStats(spritename);
        console.log("sprite = "+sprite);
        if (sprite == null) continue;
            
        __drawSpriteInternal(sprite,sheet,posX,posY);
        
        return;
    }
}

function __drawSpriteInternal(spt, sheet, posX, posY) {
    if (spt !== null && sheet !== null) ctx.drawImage(sheet.img, spt.x, spt.y, spt.w, spt.h, posX + spt.cx, posY + spt.cy, spt.w, spt.h);  
}



InputEngineClass = Class.extend({

	// A dictionary mapping ASCII key codes to string values
	// describing the action we want to take when that key is
	// pressed.
	bindings: {},

	// A dictionary mapping actions that might be taken in our
	// game to a boolean value indicating whether that action
	// is currently being performed.
	actions: {},

	mouse: {
		x: 0,
		y: 0
	},

	//-----------------------------
	setup: function () {
		// Example usage of bind, where we're setting up
		// the W, A, S, and D keys in that order.
		gInputEngine.bind(87, 'move-up');
		gInputEngine.bind(65, 'move-left');
		gInputEngine.bind(83, 'move-down');
		gInputEngine.bind(68, 'move-right');

		// Adding the event listeners for the appropriate DOM events.
		document.getElementById('canvas').addEventListener('mousemove', gInputEngine.onMouseMove);
		window.addEventListener('keydown', gInputEngine.onKeyDown);
		window.addEventListener('keyup', gInputEngine.onKeyUp);
	},

	//-----------------------------
	onMouseMove: function (event) {
		gInputEngine.mouse.x = event.clientX;
		gInputEngine.mouse.y = event.clientY;
		drawx = Math.max(0,Math.min(window.innerWidth-92,event.clientX-40));
		drawy = Math.max(0,Math.min(window.innerHeight-92,event.clientY-40));
		console.log("("+event.clientX+","+event.clientY+")");
		console.log(""+gSpriteSheets.length);
		drawSprite("0", 128, 128);
	},

	//-----------------------------
	onKeyDown: function (event) {
		// TASK #2
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to true.
		// 
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		//
		// YOUR CODE HERE
        gInputEngine.actions[gInputEngine.bindings[event.keyCode]] = true;

        if (event.keyCode === 87) drawy = Math.max(0,drawy-16);
        else if (event.keyCode === 83) drawy = Math.min(window.innerHeight-64,drawy+16);
        else if (event.keyCode === 65) drawx = Math.max(0,drawx-16);
        else if (event.keyCode === 68) drawx = Math.min(window.innerWidth-64,drawx+16);
        console.log("drawx = "+drawx);
        console.log("drawy = "+drawy);
		console.log("Apretamos: ("+event.keyCode+")");
	},

	//-----------------------------
	onKeyUp: function (event) {
		// TASK #3
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the 'actions' object
		// to false.
		// 
		// You'll need to use the bindings object you set in 'bind'
		// in order to do this.
		//
		// YOUR CODE HERE
        gInputEngine.actions[gInputEngine.bindings[event.keyCode]] = false;
		console.log("Soltamos: ("+event.keyCode+")");
	},

	// TASK #1
	// The bind function takes an ASCII keycode
	// and a string representing the action to
	// take when that key is pressed.
	// 
	// Fill in the bind function so that it
	// sets the element at the 'key'th value
	// of the 'bindings' object to be the
	// provided 'action'.
	bind: function (key, action) {
		// YOUR CODE HERE
        gInputEngine.bindings[key] = action;
        console.log("action: "+action);
	}

});

















































































































