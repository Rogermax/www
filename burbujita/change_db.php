<?php
	require_once('DBmanager.php');
	session_start();
	$nombre = $_POST['nombre'];
	$color_cuerpo = $_POST['color_cuerpo'];
	$color_energia = $_POST['color_energia'];
	$color_manitas = $_POST['color_manitas'];
	//echo $_POST['nombre']."<br>";
	//echo $_POST['color_cuerpo']."<br>";
	//echo $_POST['color_energia']."<br>";
	//echo $_POST['color_manitas']."<br>";
	$_SESSION["DB"]->change_values($nombre,$color_cuerpo,$color_energia,$color_manitas);
	header("Location: indexLog.php"); /* Redirect browser */
?>