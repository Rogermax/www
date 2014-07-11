InputEngineClass = Class.extend({
    
// TASK #1
// Create a 256 element array to hold the keystates and name it 'keyState'.
//
// YOUR CODE HERE
    keyState : new Array(256),
// TASK #2
// Specify the event handler for the 'keyup' event in the 'setup' method.
// Remember that you can grab a DOM element using the document.getElementByID
// method, and that the syntax for the addEventHandler method is:
//
// DOMElement.addEventHandler('event name', eventHandlerFunction);

	//-----------------------------
	setup: function () {
		document.getElementById('my_canvas').addEventListener('mousemove', this.onMouseMove);
		document.getElementById('my_canvas').addEventListener('keydown', this.onKeyDown);
		// YOUR CODE HERE
		document.getElementById('my_canvas').addEventListener('keyup', this.onKeyUp);
	},

	//-----------------------------
	onMouseMove: function (event) {
		var posx = event.clientX;
		var posy = event.clientY;
        return posx;
	},

	//-----------------------------
	onKeyDown: function (event) {
		// TASK #3
		// Grab the keyID property of the event object parameter,
		// then set the equivalent element in the keyState array
		// to true.
        //
        // YOUR CODE HERE
        this.keyState[event.keyID] = true;
	},

	//-----------------------------
	onKeyUp: function (event) {
		// TASK #4
		// Grab the keyID property of the event object parameter, 
		// then set the equivalent element in the keyState array
		// to false.
		//
		// YOUR CODE HERE
        this.keyState[event.keyID] = false;
	},

	// This is just an example update function.
	// You don't have to do anything with this.
	//-----------------------------
	update: function() {
		// 87 is the corresponding ASCII keycode for the key 'w'.
		KeyW = 87;

		if(this.keyState[KeyW])
			// Drop the beat.
			console.log("FORWARD!!!");
		// etc.
	}


});

gInputEngine = new InputEngineClass();