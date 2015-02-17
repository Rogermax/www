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
	var body;
	function calculateCV() {
		if (window.innerWidth >= 600) {
			document.body = body;
			document.getElementsByName("ttitulo")[0].innerHTML = '<h1 lang="cat">Currículum Vitae</h1><h1 lang="es">Currículum Vitae</h1><h1 lang="en">Curriculum Vitae</h1>';
			document.getElementsByName("ttitulo")[1].innerHTML = '<h1 lang="cat">Currículum Vitae</h1><h1 lang="es">Currículum Vitae</h1><h1 lang="en">Curriculum Vitae</h1>';
			document.getElementsByName("ttitulo")[2].innerHTML = '<h1 lang="cat">Currículum Vitae</h1><h1 lang="es">Currículum Vitae</h1><h1 lang="en">Curriculum Vitae</h1>';
			document.getElementById("port-nav").innerHTML = '<span lang="cat">Portafoli</span><span lang="es">Portafolio</span><span lang="en">Portfolio</span>';
			document.getElementById("sobremi-nav").innerHTML = '<span lang="cat">Sobre mi</span><span lang="es">Sobre mi</span><span lang="en">About</span>';
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">Curriculum Vitae</span><span lang="es">Curriculum Vitae</span><span lang="en">Curriculum Vitae</span>';
			document.getElementById("contacto-nav").innerHTML = '<a href="index.php" title=""><span lang="cat">Contacte</span><span lang="es">Contacto</span><span lang="en">Contact</span></a>';
			body = document.body;
		}
		else if(window.innerWidth > 480) {
			document.body = body;
			document.getElementsByName("ttitulo")[0].innerHTML = '<h1>CV</h1>';
			document.getElementsByName("ttitulo")[1].innerHTML = '<h1>CV</h1>';
			document.getElementsByName("ttitulo")[2].innerHTML = '<h1>CV</h1>';
			document.getElementById("port-nav").innerHTML = '<span lang="cat">Portafoli</span><span lang="es">Portafolio</span><span lang="en">Portfolio</span>';
			document.getElementById("sobremi-nav").innerHTML = '<span lang="cat">Sobre mi</span><span lang="es">Sobre mi</span><span lang="en">About</span>';
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">CV</span><span lang="es">CV</span><span lang="en">CV</span>';
			document.getElementById("contacto-nav").innerHTML = '<a href="index.php" title=""><span lang="cat">Contacte</span><span lang="es">Contacto</span><span lang="en">Contact</span></a>';
			body = document.body;
		}
		else if(window.innerWidth > 360) {
			document.body = body;
			document.getElementsByName("ttitulo")[0].innerHTML = '<h1>CV</h1>';
			document.getElementsByName("ttitulo")[1].innerHTML = '<h1>CV</h1>';
			document.getElementsByName("ttitulo")[2].innerHTML = '<h1>CV</h1>';
			document.getElementById("port-nav").innerHTML = '<img id="portafolio" src="img/home.png"/>';
			document.getElementById("sobremi-nav").innerHTML = '<span lang="cat">Sobre mi</span><span lang="es">Sobre mi</span><span lang="en">About</span>';
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">CV</span><span lang="es">CV</span><span lang="en">CV</span>';
			document.getElementById("contacto-nav").innerHTML = '<a style="padding:0; margin-right:0" href="index.php" title=""><img id="contacto" src="img/contacto.png"/></a>';
			body = document.body;
		}
		else if(window.innerWidth > 270) {
			document.body = body;
			document.getElementsByName("ttitulo")[0].innerHTML = '<h1>CV</h1>';
			document.getElementsByName("ttitulo")[1].innerHTML = '<h1>CV</h1>';
			document.getElementsByName("ttitulo")[2].innerHTML = '<h1>CV</h1>';
			document.getElementById("port-nav").innerHTML = '<img id="portafolio" src="img/home.png"/>';
			document.getElementById("sobremi-nav").innerHTML = '<span lang="cat">Sobre mi</span><span lang="es">Sobre mi</span><span lang="en">About</span>';
			document.getElementById("cv-nav").innerHTML = '<span lang="cat">CV</span><span lang="es">CV</span><span lang="en">CV</span>';
			document.getElementById("contacto-nav").innerHTML = '<a style="padding:0; margin-right:0" href="index.php" title=""><img id="contacto" src="img/contacto.png"/></a>';
			body = document.body;
		}
		else {
			document.body = document.createElement("body");
			document.body.innerHTML = '<img style="width: '+(300*(270-window.innerWidth)/(10*270)+20)+'%" src="img/minion.png"/><img style="float: right; width: '+(300*(270-window.innerWidth)/(10*270)+20)+'%" src="img/minion2.png"/>';
			//console.log(""+window.innerWidth);
		}
	}
	$(document).ready(function() {
		body = document.body;
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

	#table-cv {
		border-spacing: 20px;
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

	#titulo ul li#ttitulo-cat{
		margin-left: 10px;
		margin-top: 4px;
    	float: left
	}

	#titulo ul li#ttitulo-es{
		margin-left: 10px;
		margin-top: 4px;
    	float: left
	}

	#titulo ul li#ttitulo-en{
		margin-left: 10px;
		margin-top: 4px;
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
		position: relative;
		text-align: left;
		margin: 0 auto;
		margin-top: 4px;
		background-image: none;
		background-color: #f1f1f1;
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

	#contacto {
		width: 32px
	}

	#portafolio {
		width: 32px;
		margin-top: -7px
	}

</style>
<title>Roger De Moreta | Mathematician and Computer Engineer</title>
</head>
<body class="es">
	<div id="header">
	    <div id="titulo" lang="cat">
	    	<ul>
	    		<li id="img-roger">
			    	<img src="img/roger.png"/>
	    		</li>
			    <li id="ttitulo-cat" name="ttitulo">
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
			    <li id="ttitulo-es" name="ttitulo">
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
			    <li id="ttitulo-en" name="ttitulo">
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
			    <li><a id="port-nav" href="index.php" title=""></a></li>
			    <li><a id="sobremi-nav" href="index.php" title=""></a></li>
			    <li><a id="cv-nav" href="cv.php" title=""></a></li>
			    <li id="contacto-nav"></li>
			</ul>
	    </nav>
	</div>
	<div id="main-container" lang="cat">  
		<table id="table-cv" align="center">
			<colgroup>
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
				<col width="5%"><col width="5%">
			</colgroup>
			<tr>
				<td colspan="4"><img style="max-width: 60%; max-height: 60%" src="img/carnet.jpg"/></td>
				<td colspan="16" id="table-nom">Roger De Moreta Salusi</td>
			</tr>
			<tr>
				<td colspan="2"><span style="font-size: 30px; font-weight: 700">Estudis</span></td>
				<td colspan="18"></td>
			</tr>
			<tr>
				<td colspan="2">2011-2014</td>
				<td colspan="18"><span style="font-weight: 700">Finalitzant l'últim curs en grau d'informática</span>, Facultat d'informàtica de Barcelona, Universitat Politècnica de Catalunya.</td>
			</tr>
			<tr>
				<td colspan="2">2007-2013</td>
				<td colspan="18"><span style="font-weight: 700">Llicenciat en matemàtiques</span>, Facultat de Matemàtiques i Estadística, Universitat Politècnica de Catalunya.</td>
			</tr>
		</table>
    </div>
    <div id="main-container" lang="es">  
    	<p><img style="min-width: 100%; min-height: 100%" src="img/cv-es.png" /></p>
    	<p><a href="pdf/RogerDeMoreta-es.pdf">Bajar versión en PDF</a></p>
    </div>
    <div id="main-container" lang="en">  
    	<p><img style="min-width: 100%; min-height: 100%" src="img/cv-es.png" /></p>
    	<p><a href="pdf/RogerDeMoreta-es.pdf">Download PDF version</a></p>
    </div>
    <footer lang="cat">Peu de pàgina</footer>
    <footer lang="es">Pie de página</footer>
    <footer lang="en">Footer</footer>
</body>
</html>