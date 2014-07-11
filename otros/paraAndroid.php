<?php
mysql_connect('localhost','localhost','');
mysql_select_db("test");
$sql=mysql_query("SELECT * FROM Persons");
while($row=mysql_fetch_assoc($sql))
$output[]=$row;
print(json_encode($output));// this will print the output in json
mysql_close();
?>