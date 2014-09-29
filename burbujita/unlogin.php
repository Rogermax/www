<?php
	header ('Content-type: text/html; charset=utf-8');
	session_start();
	session_unset();
	session_destroy();
	header("Location: index.php"); /* Redirect browser */
	exit();
?>