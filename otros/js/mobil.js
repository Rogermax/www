var stage = new Kinetic.Stage({
        container: 'container',
        width: 600,
        height: 200
      });
      var layer = new Kinetic.Layer();

      var imageObj = new Image();
      imageObj.onload = function() {
        var yoda = new Kinetic.Image({
          x: 200,
          y: 50,
          image: imageObj,
          width: 106,
          height: 118
        });

        // add the shape to the layer
        layer.add(yoda);

        // add the layer to the stage
        stage.add(layer);
      };
      imageObj.src = assets[frame];