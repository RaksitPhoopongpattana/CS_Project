<?php

  $temp=$_GET['temp'];
  $humi=$_GET['humi'];
  $pm25=$_GET['pm25'];
  $pm10=$_GET['pm10'];
  $light=$_GET['light'];
  $ec=$_GET['ec'];
  $ph=$_GET['ph'];
  $date=$_GET['date'];
  

  date_default_timezone_set("Asia/Bangkok");
  $hostname="vps163.vpshispeed.net"; //
  $user="root";
  $pass="@Abcd1234";
  $port=3309;
  $dbname="SmartDetectdb";
  $conn = mysql_connect($hostname.':'.$port,$user,$pass);
  mysql_select_db($dbname,$conn); 
  mysql_query("SET NAMES UTF8"); 

  $sql="insert into datadb(userid,temperature,humidity,light,pm25,pm10,ec,ph,date)  values ('Admin',$temp,$humi,$light,$pm25,$pm10,$ec,$ph,'$date')";
			  
	  if (mysql_query($sql)) {

		?>
<script>
echo "Success ....";
</script>
<?php
                
        }
?>