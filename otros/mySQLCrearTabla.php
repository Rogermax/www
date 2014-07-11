<?php
$con = mysqli_connect('localhost','localhost','','test');

// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="CREATE TABLE Persons(FirstName CHAR(30),LastName CHAR(30),Age INT)";

// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully";
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }



mysqli_close($con); 

?>

<html>
<body>

<form action="insert.php" method="post">
	Firstname: <input type="text" name="firstname">
	Lastname: <input type="text" name="lastname">
	Age: <input type="text" name="age">
	<input type="submit">
</form>

</body>
</html>