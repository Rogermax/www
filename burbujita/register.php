<?php
	header ('Content-type: text/html; charset=utf-8');
	function comprueba_si_existe_ya_el_nombre($con,$username) {
		$sql = "SELECT id,username FROM users where username='$username'";

		/* Select queries return a resultset */
		$result = mysqli_query($con,$sql);
		if(mysqli_num_rows($result) == 0)
	    {
	    	return true;
	    }
	    else 
	    {
	    	return false;
	    }
	}

	function introduce_al_usuario($con, $username,$password,$email) {
		$uniqkey = array($username,$password,$email,1);
		// Escape each value in the uniqkey array
		$values = array_map('mysql_real_escape_string', $uniqkey);

		// implode values with quotes and commas
		$values = "'" . implode("', '", $values) . "'";

		$sql = "INSERT INTO users(username,password,email,nivel_mapa) VALUES ($values)";

		/* Select queries return a resultset */
		if ($result = mysqli_query($con,$sql)) {
			$sql = "SELECT id,username,password FROM users where username='$username'";

			/* Select queries return a resultset */
			if ($result = mysqli_query($con,$sql)) {
			    	while ($row = mysqli_fetch_assoc($result))
			    	{
			    		$dbusername = $row['username'];
			    		$dbpassword = $row['password'];
			    		$id = $row['id'];
			    	}
			    	if($username==$dbusername && $password==$dbpassword)
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
		}
	}

	// define variables and set to empty values
	$nameErr = $passwordErr = $emailErr = "";
	$name = $password = $email = "";

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
	   if (empty($_POST["usernamereg"])) {
	     $nameErr = "Name is required";
	   } else {
	     $name = test_input($_POST["usernamereg"]);
	     // check if name only contains letters and whitespace
	     if (!preg_match("/^\w{4,20}$/",$name)) {
	       $nameErr = "At least 4 characters"; 
	     }
	   }

	   if (empty($_POST["passwordreg"])) 
	   {
	     $passwordErr = "Password is required";
	   } 
	   else 
	   {
	   		if ($_POST["passwordreg"] == $_POST["repasswordreg"])
	   		{
	   			$password = test_input($_POST["passwordreg"]);
				if(!preg_match("/^\w{4,20}$/",$_POST["passwordreg"]))
				{
					$passwordErr = "At least 4 characters";
				}
			}
			else {
				$passwordErr = "Passwords do not match";
			}
	   }
	   if (empty($_POST["email"])) {
	     $emailErr = "Email is required";
	   } else {
	     $email = test_input($_POST["email"]);
	     echo $email;
	     // check if e-mail address syntax is valid
	     if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
	       $emailErr = "Invalid email format";
	     }
	   }
	}

	function test_input($data) {
	   $data = trim($data);
	   $data = stripslashes($data);
	   $data = htmlspecialchars($data);
	   return $data;
	}


	if ($nameErr == "" and $passwordErr == "" and $emailErr == "" and $_SERVER["REQUEST_METHOD"] == "POST") {
		$con = mysqli_connect('localhost','user_burbujita','amcbm3wFe7e7GTHr','burbujita');

		/* check connection */
		if (mysqli_connect_errno()) {
		    printf("Connect failed: %s<br>", mysqli_connect_error());
		    exit();
		}


		if (comprueba_si_existe_ya_el_nombre($con,$name)) {
			introduce_al_usuario($con,$name,$password,$email);
			header("Location: indexLog.php");
		}
		else {
			echo "Este nombre de usuario ya está en uso!<br>";
		}
	}
	else
	{
		echo "Algun campo estaba en blanco! - ".($nameErr == "" and $passwordErr == "" and $emailErr == "" and $_SERVER["REQUEST_METHOD"] == "POST")."<br>";
		echo "name: $nameErr - ".($nameErr == "")."<br>";
		echo "pass: $passwordErr - ".($passwordErr == "")."<br>";
		echo "email: $emailErr - ".($emailErr == "")."<br>";
		echo "server_request_method: ".$_SERVER["REQUEST_METHOD"]." - ".($_SERVER["REQUEST_METHOD"] == "POST")."<br>";
	}
	echo "<a href = 'index.php' > Volver a la página de inicio. </a>";


?>