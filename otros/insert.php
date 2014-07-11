<!DOCTYPE html>

<html>
<head>
</head>	

<body>

<?php


$con = mysqli_connect('localhost','localhost','','test');

// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql='SELECT COUNT(*) FROM `persons` WHERE `FirstName`= "' . $_POST["firstname"] . '" AND `LastName`= "' . $_POST["lastname"] . '" AND `Age`= ' . $_POST["age"];
echo $sql . "<br>";
?>

<!-- Nombre: <?php echo $_POST["fisrtname"]; ?>
<br>
Apellido: <?php echo $_POST["lastname"]; ?>
<br>
Edad: <?php echo $_POST["age"]; ?>
<br>

Cantidad Nombre: <?php echo strlen($_POST["fisrtname"]); ?>
<br>
Cantidad Apellido: <?php echo strlen($_POST["lastname"]); ?>
<br>
Cantidad Edad: <?php echo count($_POST["age"]); ?>
<br> -->


<?php 

$result = mysqli_query($con,$sql);
if(!$result) echo "Error de la base de datos. Comprueba que hayas puesto bien todos los datos.<br>" ;
else 
{
	if (strlen($_POST["firstname"]) == 0 || strlen($_POST["firstname"]) > 30 || strlen($_POST["lastname"]) == 0 || strlen($_POST["lastname"]) > 30) echo "Error, algun campo vacio o con mas de 30 caracteres!<br>" ;
	else 
	{
		if (is_nan($_POST["age"]) || ($_POST["age"] <= 0) || ($_POST["age"] > 127) ) echo "La edad ha de ser un natural entre 1 y 127 <br>";
		else 
		{
			$row = mysqli_fetch_array($result);
			if ($row['COUNT(*)'] > 0)
			{
				echo "Ya existe el usuario.<br>";
				setcookie("username", "$_POST[firstname]", time()+20);/*20 sec*/
				setcookie("userlast", "$_POST[lastname]", time()+20);
				setcookie("userage", "$_POST[age]", time()+20);
			}
			else {
				echo "Como no existia el usuario lo metemos.<br>";
				$sql="INSERT INTO Persons (FirstName, LastName, Age)
				VALUES
				('$_POST[firstname]','$_POST[lastname]',$_POST[age])";

				if (!mysqli_query($con,$sql))
				{
					die('Error: ' . mysqli_error($con));
				}
				else {
					echo "Dentro!<br>";	
					setcookie("username", "$_POST[firstname]", time()+20);/*20 sec*/
					setcookie("userlast", "$_POST[lastname]", time()+20);
					setcookie("userage", "$_POST[age]", time()+20);
				}
			}
			mysqli_close($con);
			header("Location: mio.php");
		}
	}
}

mysqli_close($con);

?>

</body>
</html>