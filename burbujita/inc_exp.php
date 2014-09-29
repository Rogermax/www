<?php
	require_once('DBmanager.php');
	session_start();
	$_SESSION["DB"]->inc_exp();
?>