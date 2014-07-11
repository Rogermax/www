<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<?php /*Esto es para que google me de estadísticas de la gente que visita mi página*/
	include_once("analyticstracking.php") ?>

<head>
	<meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
	
	<title>Roger's Minecraft Server</title>
	
	<link rel='stylesheet' type='text/css' href='css/style.css' />
	<link id="size-stylesheet" rel='stylesheet' type='text/css' href='css/narrow.css' />
	
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>
    <script type='text/javascript' src='js/resolution-test.js'></script>
</head>

<body>

	<div id="page-wrap">

		<div id="minecraftHeader">
			<img src="images/minecraftHeader.jpg"/>
		 </div>
		
		<div id="main-content">
			<p id="headerTitle"> Server </p>
			<p id="subtitle"> IP: 80.35.137.109:25565 </p>
			<p id="subtitle"> There is a large amount of mods to make the game more technical. </p>
			<p id="subtitle"> We are using a downgraded minecraft because not all mods can handle the last version. </p>
		</div>
			
        <div id="secondary-one">
        	<p id="subtitle"> Mods </p>
        	<p>
        		<table style='color:white' border='1'>
					<tr>
						<th>Nombre</th>
						<th>Versión</th>
					</tr>
					<tr>
						<td>BuildCraft</td>
						<td>1.112.170</td>
					</tr>
					<tr>
						<td>IndustrialCraft2</td>
						<td>1.112.170</td>
					</tr>
					<tr>
						<td>IC2 advanced machines</td>
						<td>4.7b</td>
					</tr>
					<tr>
						<td>Advanced solar panels</td>
						<td>3.3.2</td>
					</tr>
					<tr>
						<td>Compact solar arrays</td>
						<td>4.0.3 build 29</td>
					</tr>
					<tr>
						<td>EE3</td>
						<td>pre1e</td>
					</tr>
					<tr>
						<td>Gravitation Suite</td>
						<td>1.6</td>
					</tr>
					<tr>
						<td>Iron Chest</td>
						<td>4.5.2 build 207</td>
					</tr>
					<tr>
						<td>Red Power</td>
						<td>2.0 </td>
					</tr>
					<tr>
						<td>Nether Ores</td>
						<td>1.4.6R2.0.6</td>
					</tr>
					<tr>
						<td>More</td>
						<td>...</td>
					</tr>
					}
				</table>
			</p>
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