<?php
header('Content-Type: text/html; charset=UTF-8'); 
?>
<html>
<head>
<meta name="keywords" content="Roger, Portafolio, Portfolio, Estudiante, Student, Informática, Matemáticas">
<meta name="description" content="Personal Portafolio">
<meta name="author" content="Roger De Moreta Salusi">
<meta HTTP-EQUIV="Content-Type" content="text/html; charset=iso-8859-1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" media="screen and (max-width: 319px)" href="css/styleMiniMovil.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 320px) and (max-width: 359px)" href="css/styleNormalMovil.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 360px) and (max-width: 479px)" href="css/styleGranMovil.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 480px) and (max-width: 599px)" href="css/styleMiniTablet.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 600px) and (max-width: 767px)" href="css/styleNormalTablet.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 768px) and (max-width: 799px)" href="css/styleGranTablet.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 800px) and (max-width: 1023px)" href="css/styleMiniPC.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 1024px) and (max-width: 1599px)" href="css/styleNormalPC.css?v=1.0">
<link rel="stylesheet" media="screen and (min-width: 1600px)" href="css/styleGranPC.css?v=1.0">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script>
	function calculateCV() {
		if (window.innerWidth >= 600) {
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">Curriculum Vitae</span><span lang="es">Curriculum Vitae</span><span lang="en">Curriculum Vitae</span>';
			document.getElementById("contacto-nav").innerHTML = '<a href="index.php" title=""><span lang="cat">Contacte</span><span lang="es">Contacto</span><span lang="en">Contact</span></a>';
		}
		else if(window.innerWidth >= 480) {
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">CV</span><span lang="es">CV</span><span lang="en">CV</span>';
			document.getElementById("contacto-nav").innerHTML = '<a href="index.php" title=""><span lang="cat">Contacte</span><span lang="es">Contacto</span><span lang="en">Contact</span></a>';
		}
		else {
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">CV</span><span lang="es">CV</span><span lang="en">CV</span>';
			document.getElementById("contacto-nav").innerHTML = '<a style="padding:0; margin-right:0" href="index.php" title=""><img src="img/contacto.png"/></a>';
		}
	}
	$(document).ready(function() {
					calculateCV();
					window.onresize = calculateCV;
	});
</script>
<style>
	html, body {
		margin: 0;
		padding: 0;
		background-color: #f1f1f1
	}
	body.en :lang(cat), body.en :lang(es) {
		display: none
	}
	body.es :lang(en), body.es :lang(cat) {
		display: none
	}
	body.cat :lang(es), body.cat :lang(en) {
		display: none
	}

	#titulo {
		color: #f5efcb;
		margin: 0 auto
	}

	#titulo ul {
		height:88px;
    	list-style-type: none;
    	vertical-align: middle;
    	margin: 0;
    	padding-left: 20px;
   		overflow: hidden
	}

	#titulo ul li#ttitulo{
		margin-left: 10px;
		margin-top: 4px;
    	float: left
	}

	#titulo ul li#img-roger img{
		margin-top: 4px;
		width: 80px;
    	float: left
	}

	#idiomas {
		padding-top: 10px;
		padding-right: 10px;
		position:relative;
		float:right;
		text-align: right
	}

	nav {
		height:40px;
		text-align: center;
		background: url('img/nav-bg.png') repeat-x;
		margin: 0 auto
	}
	footer {
		text-align: center;
		margin: 0 auto
	}

	#main-container {    
		border-radius: 10px;
    	-moz-border-radius: 10px;
    	-khtml-border-radius: 10px;
    	-webkit-border-radius: 10px;
    	box-shadow: 0px 0px 6px 1px #000000;
		position: relative;
		text-align: center;
		margin: 0 auto;
		margin-top: 4px;
		z-index: 1
	}
	nav ul {
    	list-style-type: none;
    	margin: 0;
    	padding-left: 20px;
   		overflow: hidden
	}
	nav ul li {
		margin-right: 20px;
    	float: left
	}
	nav ul li#contacto-nav {
		margin-right: 0px;
		position:relative;
    	float: right
	}
	nav a:link, nav a:visited {
		padding-bottom: 11px;
		padding-top: 11px;
	    display: block;
	    font-weight: bold;
	    color: #666666;
	    text-align: center;
	    margin: 0;
	    text-decoration: none;
	    text-transform: uppercase
	}
	nav a:hover, nav a:active {
	    color: #000000
	}
	#header {
		position: relative;
		background: url('img/page-bg.png') repeat-x;
		height: 134px;
		z-index: 2
	}

</style>
<title>Roger De Moreta | Mathematician and Computer Engineer</title>
</head>
<body class="es">
	<?php
	function getBrowser() 
	{ 
	    $u_agent = $_SERVER['HTTP_USER_AGENT']; 
	    $bname = 'Unknown';
	    $platform = 'Unknown';
	    $version= "";

	    //First get the platform?
	    if (preg_match('/linux/i', $u_agent)) {
	        $platform = 'linux';
	    }
	    elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
	        $platform = 'mac';
	    }
	    elseif (preg_match('/windows|win32/i', $u_agent)) {
	        $platform = 'windows';
	    }
	    
	    // Next get the name of the useragent yes seperately and for good reason
	    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Internet Explorer'; 
	        $ub = "MSIE"; 
	    } 
	    elseif(preg_match('/Firefox/i',$u_agent)) 
	    { 
	        $bname = 'Mozilla Firefox'; 
	        $ub = "Firefox"; 
	    } 
	    elseif(preg_match('/Chrome/i',$u_agent)) 
	    { 
	        $bname = 'Google Chrome'; 
	        $ub = "Chrome"; 
	    } 
	    elseif(preg_match('/Safari/i',$u_agent)) 
	    { 
	        $bname = 'Apple Safari'; 
	        $ub = "Safari"; 
	    } 
	    elseif(preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Opera'; 
	        $ub = "Opera"; 
	    } 
	    elseif(preg_match('/Netscape/i',$u_agent)) 
	    { 
	        $bname = 'Netscape'; 
	        $ub = "Netscape"; 
	    } 
	    
	    // finally get the correct version number
	    $known = array('Version', $ub, 'other');
	    $pattern = '#(?<browser>' . join('|', $known) .
	    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
	    if (!preg_match_all($pattern, $u_agent, $matches)) {
	        // we have no matching number just continue
	    }
	    
	    // see how many we have
	    $i = count($matches['browser']);
	    if ($i != 1) {
	        //we will have two since we are not using 'other' argument yet
	        //see if version is before or after the name
	        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
	            $version= $matches['version'][0];
	        }
	        else {
	            $version= $matches['version'][1];
	        }
	    }
	    else {
	        $version= $matches['version'][0];
	    }
	    
	    // check if we have a number
	    if ($version==null || $version=="") {$version="?";}
	    
	    return array(
	        'userAgent' => $u_agent,
	        'name'      => $bname,
	        'version'   => $version,
	        'platform'  => $platform,
	        'pattern'    => $pattern
	    );
	} 

	// now try it
	$ua=getBrowser();
	$yourbrowser= "Your browser: " . $ua['name'] . " " . $ua['version'] . " on " .$ua['platform'];
	//print_r($yourbrowser);

	?>

	<div id="header">
	    <div id="titulo" lang="cat">
	    	<ul>
	    		<li id="img-roger">
			    	<img src="img/roger.png"/>
	    		</li>
			    <li id="ttitulo">
			    	<h1>Portafoli</h1>
	    		</li>
			    <li id="idiomas">
			    	<div>
						<img onclick="document.body.className='cat'" src="img/cat.png" />
						<img onclick="document.body.className='es'" src="img/es0.png" />
						<img onclick="document.body.className='en'" src="img/eng0.png" />
		    		</div>
		    	</li>
			</ul>
	    </div>
	    <div id="titulo" lang="es">
	    	<ul>
	    		<li id="img-roger">
			    	<img src="img/roger.png"/>
	    		</li>
			    <li id="ttitulo">
			    	<h1>Portafolio</h1>
	    		</li>
			    <li id="idiomas">
			    	<div>
						<img onclick="document.body.className='cat'" src="img/cat0.png" />
						<img onclick="document.body.className='es'" src="img/es.png" />
						<img onclick="document.body.className='en'" src="img/eng0.png" />
		    		</div>
		    	</li>
			</ul>
	    </div>
	    <div id="titulo" lang="en">
	    	<ul>
	    		<li id="img-roger">
			    	<img src="img/roger.png"/>
	    		</li>
			    <li id="ttitulo">
			    	<h1>Portfolio</h1>
	    		</li>
			    <li id="idiomas">
			    	<div>
						<img onclick="document.body.className='cat'" src="img/cat0.png" />
						<img onclick="document.body.className='es'" src="img/es0.png" />
						<img onclick="document.body.className='en'" src="img/eng.png" />
		    		</div>
		    	</li>
			</ul>
	    </div>
	    <nav>
	    	<ul>
			    <li><a href="index.php" title=""><span lang="cat">Portafoli</span><span lang="es">Portafolio</span><span lang="en">Portfolio</span></a></li>
			    <li><a href="index.php" title=""><span lang="cat">Sobre mi</span><span lang="es">Sobre mi</span><span lang="en">About</span></a></li>
			    <li><a id="cv-nav" href="index.php" title=""></a></li>
			    <li id="contacto-nav"></li>
			</ul>
	    </nav>
	</div>
    <div id="main-container" lang="cat">  
    	Contingut Principal.
    </div>
    <div id="main-container" lang="es">  
    	Contenido Principal.
    </div>
    <div id="main-container" lang="en">  
    	Main container.
    </div>
    <footer lang="cat">Peu de pàgina</footer>
    <footer lang="es">Pie de página</footer>
    <footer lang="en">Footer</footer>
</body>
</html>