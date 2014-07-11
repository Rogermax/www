<!DOCTYPE html>

<?php
setcookie("user", "Alex Porter", time()+20);/*20 sec*/
setcookie("loquemedalagana","Chinchampu", time()+10);
?>

<?php
session_start();
?>

<html>
<body>
<?php include_once("analyticstracking.php") ?>

<?php
echo 'Hola Mundo<br>';
/*this command shows your info of php -> phpinfo();*/

/*
This is
a PHP comment
block
*/
?>

<?php

$x=5;
$y=6;
$z=$x+$y;

function escribe_z()
{
	global $z;
	echo $z."<br>";
}

function escribe_z2()
{
	echo $GLOBALS['z']."<br>";
}

function escribe($x)
{
	echo $x."<br>";
}

escribe_z();
escribe($x);
escribe_z2();

if ($x == '5') {
	echo "dice que 5 es igual que '5'<br>";
}
else {
	echo "dice que no son iguales<br>";
}
if ($x ==='5') {
	echo "dice que 5 es identico que '5'<br>";
}
else {
	echo "dice que 5 no es identico que '5'<br>";
}

if (isset($_COOKIE["loquemedalagana"])) {
	echo "Mira gin, funciona lo que me da la gana"."!<br>";
}
else echo "No funciona!<br>";

if (isset($_COOKIE["user"]))
  echo "Welcome " . $_COOKIE["user"] . "!<br>";
else
  echo "Welcome guest!<br>";
?>

<?php
if(isset($_SESSION['views']))
	$_SESSION['views']=$_SESSION['views']+1;
else
	$_SESSION['views']=1;
echo "Views=". $_SESSION['views'];
?>

<?php

	function myFunc($n) {
		$i = 1;
		$x = 0;
		if($n < 1) {return 0;}
		else {
			while ($i <= $n) {
				$i = $i *10;
			}

			
			$i = $i /10;
			$x = $n %10;
			echo $i;
			echo "<br>";
			echo $x;
			echo "<br>";
		}
		return ($x*$i+myFunc($n/10));
	}
	echo myFunc(86403);
			echo "<br>";
?>

<?php

	$a = 3;
	$b = 5;
	$total = $a * $b % 2 + $b;
	echo $total;
echo "<br>";

?>

<?php
	$i = 5;
	$x = 8;
	while ($i < $x && $x < 10)
	{
		$x = $x++ + $i++;
	}
	echo "i: ";
	print ($i);
	echo "<br>";
	echo "x: ";
	print ($x);
	echo "<br>";
?>

</body>
</html>