<!DOCTYPE html>
<html>
	<body>
		<?php
			$monthNames = Array("January", "February", "March", "April", "May", "June", "July", 
			"August", "September", "October", "November", "December");

			if (!isset($_REQUEST["month"])) $_REQUEST["month"] = date("n");
			if (!isset($_REQUEST["year"])) $_REQUEST["year"] = date("Y");


			$cMonth = $_REQUEST["month"];
			$cYear = $_REQUEST["year"];
	 
			$prev_year = $cYear;
			$next_year = $cYear;
			$prev_month = $cMonth-1;
			$next_month = $cMonth+1;
			 
			if ($prev_month == 0 ) {
			    $prev_month = 12;
			    $prev_year = $cYear - 1;
			}
			if ($next_month == 13 ) {
			    $next_month = 1;
			    $next_year = $cYear + 1;
			}
		?>
		<table width="200">
			<tr align="center">
			<td bgcolor="#999999" style="color:#FFFFFF">
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
			<td width="50%" align="left">  <a href="<?php echo $_SERVER["PHP_SELF"] . "?month=". $prev_month . "&year=" . $prev_year; ?>" style="color:#FFFFFF">Previous</a></td>
			<td width="50%" align="right"><a href="<?php echo $_SERVER["PHP_SELF"] . "?month=". $next_month . "&year=" . $next_year; ?>" style="color:#FFFFFF">Next</a>  </td>
			</tr>
			</table>
			</td>
			</tr>
			<tr>
			<td align="center">
			<table width="100%" border="0" cellpadding="2" cellspacing="2">
			<tr align="center">
			<td colspan="7" bgcolor="#999999" style="color:#FFFFFF"><strong><?php echo $monthNames[$cMonth-1].' '.$cYear; ?></strong></td>
			</tr>
			<tr>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>L</strong></td>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>M</strong></td>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>X</strong></td>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>J</strong></td>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>V</strong></td>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>S</strong></td>
			<td align="center" bgcolor="#999999" style="color:#FFFFFF"><strong>D</strong></td>
			</tr>
			<?php 
			$timestamp = mktime(0,0,0,$cMonth,1,$cYear);
			$maxday = date("t",$timestamp);
			//echo $timestamp;
			$thismonth = getdate ($timestamp);
			//echo $thismonth['wday'];
			$startday = $thismonth['wday'];
			for ($i=0; $i<($maxday+$startday); $i++) {
				if($i == 0 && $startday == 0) echo "<td></td><td></td><td></td><td></td><td></td><td></td>";
			    if(($i % 7) == 1 ) echo "<tr>";
			    if($i < $startday) echo "<td></td>";
			    else {
			    	if (($i - $startday+1)%2)	echo "<td style='background-color:red;' align='center' valign='middle' height='20px'>". ($i - $startday+1) . "</td>";
			    	else echo "<td style='color:green;' align='center' valign='middle' height='20px'>". ($i - $startday+1) . "</td>";

			    }
			    if(($i % 7) == 0 ) echo "</tr>";
			}
			?>
		</table>
	</body>
</html>