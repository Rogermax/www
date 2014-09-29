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
	<title>Burbujita game</title>
    <script type="text/javascript" src="js/cGamePersonalization.js"></script>
    <script type="text/javascript" src="js/jscolor/jscolor.js"></script>
		<head>
			<title>Burbujita</title>
    		<link rel="stylesheet" type="text/css" href="css/wide.css">
		</head>

		<body>
			<div id="container">
				<div id="welcome">
					Edita tu burbujita!
				</div>
				<div id="jugar">
					<form action="mapa_game.php" method="post">
					<input type="submit" class="myButton" value="Jugar">
					</form> 
				</div>
				<div id="editable">
					<div id="izq">
						<form action="change_db.php" method="post">
						Nombre burbujita<br> <input type="text" name="nombre" value="'.$_SESSION["nombre"].'">
						<br>Color cuerpo<br> <input class="color" onchange="this.form.submit()" type="text" name="color_cuerpo" value="'.$_SESSION["cc"].'">
						<br>Color energia<br> <input class="color" onchange="this.form.submit()" type="text" name="color_energia" value="'.$_SESSION["ce"].'">
						<br>Color manitas<br> <input class="color" onchange="this.form.submit()" type="text" name="color_manitas" value="'.$_SESSION["cm"].'">
						<br><br><input type="submit" value="  Aplicar  ">
						</form>
					</div>
					<div id="play">
						<canvas id="canvas_personalizado" width = "400px" height = "400px"></canvas>
					</div>
				</div>
				<div id="ranking">
					Ranking';
        			echo $DB->ranking_burbujas2();
					echo '
				</div>
				<div id="ranking">
					Own Ranking';
					echo $DB->own_ranking();
					echo '
				</div>
				<div class="signout">
					<form action="unlogin.php" method="post">
					<input type="submit" value="Sign Out">
					</form>
				</div>
			</div>
			<script>

		      GP = new cGamePersonalization("'.$_SESSION["nombre"].'",400,400,"'.$_SESSION["cc"].'","'.$_SESSION["ce"].'","'.$_SESSION["cm"].'",'.$_SESSION["dano"].');

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

		      window.onEachFrame(GP.run);
		    </script>
		</body>
	</html>
  ';
  //include("change_db.php");
}
else {
	echo "Esta página requiere estar logueado.<br>";
	echo "<a href = 'index.php' > Volver a la página de inicio </a>";
}
?>