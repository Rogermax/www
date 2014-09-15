<?php
header('content-type:text/css');
 
$colorPrincipal = '#369';
$colorSecundario = '#557E29';
$numColumnas = 3;
$numFilas = 3;
$margenLateral = 20;
$margenInterno = 10;
$ladoCuadrado = 156;
$cuadriculaWidth = $numColumnas*$ladoCuadrado+2*($numColumnas-1)*$margenInterno+2*$margenLateral;
$cuadriculaHeight = $numFilas*$ladoCuadrado+2*($numFilas-1)*$margenInterno+2*$margenLateral;
$bottomWidth = $cuadriculaWidth - 2*$margenLateral;

$margenLateral = $margenLateral .'px';
$margenInterno = $margenInterno .'px';
$ladoCuadrado = $ladoCuadrado .'px';
$cuadriculaWidth = $cuadriculaWidth .'px';
$cuadriculaHeight = $cuadriculaHeight .'px';
$bottomWidth = $bottomWidth . 'px';

echo <<<FINCSS
* { margin: 0; padding: 0;}
body { background: #000; color:white; font: 14px Georgia, serif; }
p#titulo {color:white; font-family:Palatino Linotype; font-size: 400%; text-align:center; margin: 40px}
div#cuadricula {height: $cuadriculaHeight; width: $cuadriculaWidth; margin-left: auto; margin-right: auto; margin-top: 40px}
div#cuadro_centro {float: left; width: $ladoCuadrado; height: $ladoCuadrado; margin: $margenInterno; text-align:center;}
div#cuadro_izquierdo {float: left;  width: $ladoCuadrado; height: $ladoCuadrado; margin: $margenInterno; margin-left: $margenLateral; text-align:center;}
div#cuadro_derecho {float: left; width: $ladoCuadrado; height: $ladoCuadrado; margin: $margenInterno; margin-right: $margenLateral; text-align:center;}
div#resto {float: left; width: $bottomWidth; height: $ladoCuadrado; margin: $margenLateral; margin-top: $margenInterno}
FINCSS;
?>
