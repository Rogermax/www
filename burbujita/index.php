<?php
header ('Content-type: text/html; charset=utf-8');
echo '
<html>

  <head>
    <title>Burbujita game</title>
    <link rel="stylesheet" type="text/css" href="css/wide.css">
  </head>

  <body>
    <div id="container">
      <div id="login-container">
        <div id="login">
          <form action="login.php" method="post">
          User<br> <input title="Enter your username" type="text" required pattern="\w{1,20}" type="text" name="username"><br>
          Password<br> <input title="Enter your password" type="password" required pattern="\w{1,20}" name="password"><br>
          <input type="submit" value="Sign In">
          </form>
        </div>

        <div id="register">

          <form action="register.php" method="post">
          New user<br> <input title="Username must be between 4 and 20 characters" type="text" required pattern="\w{4,20}" name="usernamereg" onchange="
              this.setCustomValidity(this.validity.patternMismatch ? this.title : \'\');
            "><br>
          New Password<br> <input title="Password must be between 4 and 20 characters" type="password" required pattern="\w{4,20}" name="passwordreg" onchange="
              this.setCustomValidity(this.validity.patternMismatch ? this.title : \'\');
              if(this.checkValidity()) form.repasswordreg.pattern = this.value;
            "><br>
          Confirm password<br> <input  title="Please enter the same Password as above" type="password" required pattern="\w{4,20}" name="repasswordreg" onchange="
            this.setCustomValidity(this.validity.patternMismatch ? this.title : \'\');
          "><br>
          Email<br> <input  title="Please enter a valid email" type="text" required pattern="([\w\-]+\@[\w\-]+\.[\w\-]+)" name="email" onchange="
            this.setCustomValidity(this.validity.patternMismatch ? this.title : \'\');
          "><br>
          <input type="submit" value="Register">
          </form>
        </div>

      </div>
    </div>
  </body>
</html>';
?>
