<!DOCTYPE html>


<html>
	<?php /*Esto es para que google me de estadísticas de la gente que visita mi página*/
	include_once("analyticstracking.php") ?>

	<head>
		<link rel="stylesheet" type="text/css" href="css/mio.css">
		<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'></script>
	</head>	
	<body>
		<?php
			if (isset($_COOKIE["username"]))
				echo "Welcome " . $_COOKIE["username"] . " " .  $_COOKIE["userlast"] . "(" .  $_COOKIE["userage"] . ")!<br>";
			else 
			{
				echo "Si pones tus datos los guardare en la base de datos y te pondre una cookie con los datos.";
				echo "<form action='insert.php' method='post'>
					Firstname: <input type='text' name='firstname'>
					Lastname: <input type='text' name='lastname'>
					Age: <input type='number' name='age'>
					<input type='submit'>
				</form>";
				echo "Welcome guest!<br>";
			}

			$con = mysqli_connect('localhost','localhost','','test');

			$result = mysqli_query($con,"SELECT * FROM Persons");

			echo "<table border='1'>
			<tr>
			<th>Firstname</th>
			<th>Lastname</th>
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
		<p>This paragraph is affected by the style.</p>
		<p id="demo"></p>

		<script>
			var w=window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;

			var h=window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;

			x=document.getElementById("demo");
			x.innerHTML="Browser inner window width: " + w + ", height: " + h + "."
		</script>

		<div id="example"></div>

		<script>

			txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
			txt+= "<p>Browser Name: " + navigator.appName + "</p>";
			txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
			txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
			txt+= "<p>Platform: " + navigator.platform + "</p>";
			txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
			txt+= "<p>User-agent language: " + navigator.systemLanguage + "</p>";

			document.getElementById("example").innerHTML=txt;

		</script>

		<p>Click the button to display a confirm box.</p>

		<button onclick="myFunction()">Try it</button>

		<p id="demo"></p>

		<script>
			function myFunction()
			{
				var x;
				var r=confirm("Press a button!");
				if (r==true)
				{
					x="You pressed OK!";
				}
				else
				{
					x="You pressed Cancel!";
			  	}
			document.getElementById("demo").innerHTML=x;
			}
		</script>

		<p id="demo2"></p>

	<script>
		var myVar=setInterval(function(){myTimer()},1000);

		function myTimer()
		{
			var d=new Date();
			var t=d.toLocaleTimeString();
			document.getElementById("demo2").innerHTML=t;
		}
	</script>

	</body>
</html>