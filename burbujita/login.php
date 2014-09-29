<?php
	header ('Content-type: text/html; charset=utf-8');

	// define variables and set to empty values
	$nameErr = $passwordErr = "";
	$name = $password = "";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
	   if (empty($_POST["username"])) {
	     $nameErr = "Name is required";
	   } else {
	     $name = test_input($_POST["username"]);
	   }

	   if (empty($_POST["password"])) 
	   {
	     $passwordErr = "Password is required";
	   } 
	   else 
	   {
   		 $password = test_input($_POST["password"]);
	   }
	}

	function test_input($data) {
	   $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}


	if ($nameErr == "" and $passwordErr == "" and $_SERVER["REQUEST_METHOD"] == "POST") {
		$con = mysqli_connect('localhost','user_burbujita','amcbm3wFe7e7GTHr','burbujita');

		/* check connection */
		if (mysqli_connect_errno()) {
		    printf("Connect failed: %s<br>", mysqli_connect_error());
		    exit();
		}

		$sql = "SELECT id,username,password FROM users where username='$name'";

		/* Select queries return a resultset */
		$result = mysqli_query($con,$sql);
		if ($result) {
		    //printf("Select returned %d rows. <br>", mysqli_num_rows($result));
		    if(mysqli_num_rows($result) == 0)
		    {
		    	echo "Usuario o password incorrecto!<br>";
		    }
		    else {
		    	while ($row = mysqli_fetch_assoc($result))
		    	{
		    		$dbusername = $row['username'];
		    		$dbpassword = $row['password'];
		    		$id = $row['id'];
		    	}
		    	if($name==$dbusername && $password==$dbpassword)
		    	{
					session_start();
					$_SESSION['ip'] = getenv ( "REMOTE_ADDR" );
					$_SESSION['id'] = $id;
					header("Location: indexLog.php"); /* Redirect browser */
					exit();
		    	}
		    	else {
		    		echo "Usuario o password incorrecto!<br>";
		    	}
		    }
		    /* free result set */
		    mysqli_free_result($result);
		}
		else {
			echo "error en la consulta!<br>";
		}
	}
	else
		echo "Usuario o password en blanco!<br>";

	echo "<a href = 'index.php' > Volver a la página de inicio. </a>";



?>