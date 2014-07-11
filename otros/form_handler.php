<html>
<body>
<?php

$sellPrice = $_GET['sellPrice'];
$orbePrice = $_GET['orbePrice'];
$oriPrice = $_GET['oriPrice'];
$pegotePrice = $_GET['pegotePrice'];

$beneficio = 1.0*($sellPrice*0.85-5.*$orbePrice-28.*$oriPrice-5.*$pegotePrice);
 echo "Wapeton, si lo vendes ganas: ". $beneficio ."! (por unidad)";
?>
</body>
</html>