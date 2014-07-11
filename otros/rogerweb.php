<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php /*Esto es para que google me de estadísticas de la gente que visita mi página*/
	include_once("analyticstracking.php") ?>

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Roger's Web</title>
	
	<link rel='stylesheet' type='text/css' href='css/style.css' />
	<link id="size-stylesheet" rel='stylesheet' type='text/css' href='css/narrow.css' />
	
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>
    <script type='text/javascript' src='js/resolution-test.js'></script>
</head>

<body>

	<div id="page-wrap">

		<div id="header">
			<p id="headerTitle"> Roger's Web </p>
			<p id="subtitle"> Learning how to make my own page </p> 
		 </div>
		
		<div id="main-content">
			<p id="headerTitle"> Database test </p>
			<p id="subtitle"> I'm trying to make an android application able to connect with my web site database.
				You would be able to register and connect. After that we'll see the next step. </p>
		</div>
			
        <div id="secondary-one">
        	<p><a href='http://google.com/' class='button'>Google</a></p>
			<p><a href='http://bing.com/' class='button'>Bing</a></p>
			<p><a href='minecraft.php' class='button'>Minecraft Server</a></p>
  		</div>
        
        <div id="secondary-two">
        	<p id="subtitle"> Database table: "Persons" </p>
        	<p style="color:white;">
	        	<?php 
		        	$con = mysqli_connect('localhost','localhost','','test');

					$result = mysqli_query($con,"SELECT * FROM Persons");

					echo "<table style='color:white' border='1'>
					<tr>
					<th>Nombre</th>
					<th>Ap.</th>
					<th>Age</th>
					</tr>";

					while($row = mysqli_fetch_array($result))
					{
						echo "<tr>";
						echo "<td>" . $row['FirstName'] . "</td>";
						echo "<td>" . $row['LastName'] . "</td>";
						echo "<td>" . $row['Age'] . "</td>";
						echo "</tr>";
					}
					echo "</table>";

					mysqli_close($con);  

				?>
			</p>

        </div>

        <div id="footer">
        	<p id = "headerTitle"> Contact me: </p>
        	<a id = "subtitle" href="mailto:rogermoreta@gmail.com">rogermoreta@gmail.com</a><br />
        </div>
			
	</div>
	
</body>

</html>