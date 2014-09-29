<?php
header ('Content-type: text/html; charset=utf-8');
require_once('DBmanager.php');
session_start();
if (array_key_exists('ip',$_SESSION) && !empty($_SESSION['ip']) && 
  array_key_exists('id',$_SESSION) && !empty($_SESSION['id']) &&
  $_SESSION['ip'] == getenv ( "REMOTE_ADDR" )) {
  $id = $_SESSION["id"];
  session_unset();
  session_destroy();
  $DB = new DBmanager($id);
  $_SESSION["DB"] = $DB;

  echo '

<html>

  <head>
    <title>Roger Games</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/cGame.js"></script>
    <script type="text/javascript" src="js/cMapa.js"></script>
    <script type="text/javascript" src="js/cBurbujita.js"></script>
    <script type="text/javascript" src="js/cDisparo.js"></script>
    <script type="text/javascript" src="js/cBicho.js"></script>
    <script type="text/javascript" src="js/cInterficie.js"></script>
    <script type="text/javascript" src="js/cParticulas.js"></script>
    <script type="text/javascript" src="js/cPintor.js"></script>
    <script type="text/javascript" src="images/level'.$_SESSION["nivel_mapa"].'/level.js"></script>
    <script> //Calcula tamaño de la ventana.
      sizeWH = function(){
        var w = 0;var h = 0;
        //IE
        if(!window.innerWidth)
        {
          if(!(document.documentElement.clientWidth == 0)){
            //strict mode
            w = document.documentElement.clientWidth;
            h = document.documentElement.clientHeight;
          } 
          else
          {
            //quirks mode
            w = document.body.clientWidth;
            h = document.body.clientHeight;
          }
        }
        else
        {
          //w3c
          w = window.innerWidth;
          h = window.innerHeight;
        }
        return {width:w,height:h};
      }
    </script>
    <!-- STYLE: pone los canvas sin margen -->
    <style> 
      body
      {
      background:white;
      padding:0;
      margin:0;
      }
      canvas
      {
      position:absolute;
      padding:0;
      margin:0;
      display:block;
      }
    </style>
  </head>

  <body id="body">

    <canvas id="Titulo" tabindex = "5"></canvas>
    <canvas id="canvas_puntos" tabindex="2"></canvas>
    <canvas id="canvas" tabindex="1"></canvas>
    <canvas id="canvas_menu" tabindex = "3"></canvas>
    <canvas id="canvas_info" tabindex = "4"></canvas>

    <script>

      Game = new cGame("'.$_SESSION["nivel_mapa"].'",3/5*sizeWH().width,sizeWH().height-200,"'.$_SESSION["cc"].'","'.$_SESSION["ce"].'","'.$_SESSION["cm"].'",'.
        $_SESSION["dano"].','.$_SESSION["aguante"].','.$_SESSION["vel_mov"].','.$_SESSION["vel_rec_ener"].','.$_SESSION["vel_rec_vida"].','.$_SESSION["vel_trans_ener"].');
      Game.AsignaTecladoMouse();
      Game.CargaImagenes();

      (function() //asigna onEachFrame per a diferents exploradors.
      {
        var onEachFrame;
        if (window.webkitRequestAnimationFrame)
        {
          onEachFrame = function(cb)
          {
            var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
            _cb();
          };
        }
        else if (window.mozRequestAnimationFrame)
        {
          onEachFrame = function(cb)
          {
            var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
            _cb();
          };
        }
        else
        {
          onEachFrame = function(cb)
          {
            setInterval(cb, 1000 / 60);
          }
        }

        window.onEachFrame = onEachFrame;
      })();

      window.onEachFrame(Game.run);
    </script>
  </body>
</html>';
}
else {
  echo "Esta página requiere estar logueado.<br>";
  echo "<a href = 'index.php' > Volver a la página de inicio </a>";
}
?>