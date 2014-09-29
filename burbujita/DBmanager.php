<?php 
header ('Content-type: text/html; charset=utf-8');
class DBManager {
	private $connection;
	//private $username;
	private $nombre;
	//private $level;
	//private $id;
	private $dano_ataque;
	private $nivel_mapa;
	private $aguante;
	private $vel_mov;
	private $color_cuerpo;
	private $color_energia;
	private $color_manitas;
	//private $exp;
	//private $densidad;
	//private $dureza;	
	//private $absorcion;
	private $vel_rec_ener;
	private $vel_rec_vida;
	private $vel_trans_ener;


	function __construct($id)
	{
		$this->connection = mysqli_connect('localhost','user_burbujita','amcbm3wFe7e7GTHr','burbujita');
       	if($id) {
       		$this->llena_id($id);
		}

		session_start();
		session_regenerate_id(true);
		$_SESSION["ip"] = getenv ( "REMOTE_ADDR" );
		$_SESSION["id"] = $id;
		$_SESSION["nivel_mapa"] = $this->nivel_mapa;
		$_SESSION["exp"] = 0;
		$_SESSION["nombre"] = $this->nombre;
		$_SESSION["cc"] = $this->color_cuerpo;
		$_SESSION["ce"] = $this->color_energia;
		$_SESSION["cm"] = $this->color_manitas;		
		$_SESSION["aguante"] = $this->aguante;
		$_SESSION["dano"] = $this->dano_ataque;
		$_SESSION["vel_mov"] = $this->vel_mov;
		$_SESSION["vel_rec_ener"] = $this->vel_rec_ener;
		$_SESSION["vel_rec_vida"] = $this->vel_rec_vida;
		$_SESSION["vel_trans_ener"] = $this->vel_trans_ener;
	}

	/*private function llena($username){

       	$sql = "SELECT * FROM burbujas,users WHERE burbujas.id = users.id and username = '$username'";

		// Select queries return a resultset
		$result = mysqli_query($this->connection,$sql);
		if(mysqli_num_rows($result) == 0)
	    {
	    	printf("<br>Select gived 0 rows!<br>");
	    	return 0;
	    }
	    else 
	    {
	    	while ($row = mysqli_fetch_assoc($result))
	    	{
	    		$this->username = $row["username"];
	    		$this->nombre = $row["nombre"];
	    		//$this->level = $row["level"];
	    		//$this->id = $row["id"];
	    		$this->dano_ataque = $row["dano_ataque"];
	    		$this->nivel_mapa = $row["nivel_mapa"];
	    		$this->aguante = $row["aguante"];
	    		$this->vel_mov = $row["vel_mov"];
	    		$this->color_cuerpo = $row["color_cuerpo"];
	    		$this->color_energia = $row["color_energia"];
	    		$this->color_manitas = $row["color_manitas"];
	    		//$this->exp = $row["exp"];
	    	}
	    }

	}*/

	private function llena_id($id){

       	$sql = "SELECT * FROM burbujas,users WHERE burbujas.id = users.id and burbujas.id = '$id'";

		/* Select queries return a resultset */
		$result = mysqli_query($this->connection,$sql);
		if(mysqli_num_rows($result) == 0)
	    {
	    	printf("<br>Select gived 0 rows!<br>");
	    	return 0;
	    }
	    else 
	    {
	    	while ($row = mysqli_fetch_assoc($result))
	    	{
	    		//$this->username = $row["username"];
	    		$this->nombre = $row["nombre"];
	    		//$this->level = $row["level"];
	    		//$this->id = $row["id"];
	    		$this->dano_ataque = $row["dano_ataque"];
	    		$this->aguante = $row["aguante"];
	    		$this->vel_mov = $row["vel_mov"];
	    		$this->color_cuerpo = $row["color_cuerpo"];
	    		$this->color_energia = $row["color_energia"];
	    		$this->color_manitas = $row["color_manitas"];
	    		$this->nivel_mapa = $row["nivel_mapa"];
	    		//$this->exp = $row["exp"];
	    		$this->vel_rec_ener = $row["vel_rec_ener"];
				$this->vel_rec_vida = $row["vel_rec_vida"];
				$this->vel_trans_ener = $row["vel_trans_ener"];
	    	}
	    }

	}

	/*public function name($username) {
		if ($this->username == $username and $this->nombre) {
			return $this->nombre;
		}
		else {
	       	$this->llena($username);
		    return $this->nombre;
		}
	}

	public function nivel_mapa($username) {
		if ($this->username == $username and $this->nivel_mapa) {
			return $this->nivel_mapa;
		}
		else {
	       	$this->llena($username);
		    return $this->nivel_mapa;
		}
	}

	public function id($username) {
		if ($this->username == $username and $this->id) {
			return $this->id;
		}
		else {
	       	$this->llena($username);
		    return $this->id;
		}
	}

	public function c_c($username) {
		if ($this->username == $username and $this->color_cuerpo) {
			return $this->color_cuerpo;
		}
		else {
	       	$this->llena($username);
		    return $this->color_cuerpo;
		}
	}

	public function c_e($username) {
		if ($this->username == $username and $this->color_energia) {
			return $this->color_energia;
		}
		else {
	       	$this->llena($username);
		    return $this->color_energia;
		}
	}

	public function c_m($username) {
		if ($this->username == $username and $this->color_manitas) {
			return $this->color_manitas;
		}
		else {
	       	$this->llena($username);
		    return $this->color_manitas;
		}
	}

	public function colors($username) {
		if ($this->username == $username and $this->color_cuerpo and $this->color_energia and $this->color_manitas) {
			return '"'.$this->color_cuerpo.'","'.$this->color_energia.'","'.$this->color_manitas.'"'; 
		}
		else {
	       	$this->llena($username);
			return '"'.$this->color_cuerpo.'","'.$this->color_energia.'","'.$this->color_manitas.'"'; 
		}
	}

	public function dano_ataque($username) {
		if ($this->username == $username and $this->dano_ataque) {
			return $this->dano_ataque;
		}
		else {
	       	$this->llena($username);
		    return $this->dano_ataque;
		}
	}
    */

	public function change_values($nombre, $c_c, $c_e, $c_m) {
		$this->connection = mysqli_connect('localhost','user_burbujita','amcbm3wFe7e7GTHr','burbujita');
		if (array_key_exists('ip',$_SESSION) && !empty($_SESSION['ip']) && 
			array_key_exists('id',$_SESSION) && !empty($_SESSION['id']) &&
			$_SESSION['ip'] == getenv ( "REMOTE_ADDR" )) {
			$id = $_SESSION['id'];
			$sql = "UPDATE burbujas SET nombre = '$nombre', color_cuerpo = '$c_c', color_energia = '$c_e', color_manitas = '$c_m' WHERE id = '$id' ";
			if ($result = mysqli_query($this->connection,$sql)) {
				$this->nombre = $nombre;
				$this->color_cuerpo = $c_c;
				$this->color_energia = $c_e;
				$this->color_manitas = $c_m;
				$_SESSION["nombre"] = $this->nombre;
				$_SESSION["cc"] = $this->color_cuerpo;
				$_SESSION["ce"] = $this->color_energia;
				$_SESSION["cm"] = $this->color_manitas;
			}
			else {
				echo "Error en change_values (DBManager)";
			}
		}
	}

	public function inc_exp() {
		$this->connection = mysqli_connect('localhost','user_burbujita','amcbm3wFe7e7GTHr','burbujita');
		if (array_key_exists('ip',$_SESSION) && !empty($_SESSION['ip']) && 
			array_key_exists('id',$_SESSION) && !empty($_SESSION['id']) &&
			array_key_exists('exp',$_SESSION) && !empty($_SESSION['exp']) &&
			$_SESSION['ip'] == getenv ( "REMOTE_ADDR" )) {
			$id = $_SESSION["id"];
			$exp = $_SESSION["exp"];
			$sql = "UPDATE burbujas SET exp = exp+$exp WHERE id = '$id' ";
			if ($result = mysqli_query($this->connection,$sql)) {
				$_SESSION["exp"] = 0;
			}
			else {
				echo "Error en inc_exp (DBManager)";
			}
		}
	}

	/*public function ranking_burbujas() {
		$sql = "SELECT username, nombre, level, exp, dano_ataque, aguante, burbujas.id FROM burbujas,users WHERE burbujas.id = users.id ORDER BY level desc,exp desc, id asc";

		// Select queries return a resultset
		$result = mysqli_query($this->connection,$sql);
		if(mysqli_num_rows($result) == 0)
	    {
	    	printf("<br>Select gived 0 rows!<br>");
	    	return 0;
	    }
	    else 
	    {
	    	$ret = '<table border="1"> 
	    <tr id="first_row">
	      <td>' . "Burbujita" . '</td>
	      <td>' . "Level" . '</td>
	      <td>' . "Experiencia" . '</td>
	      <td>' . "Daño ataque" . '</td>
	      <td>' . "Defensa" . '</td>
	      <td>' . "Usuario" . '</td>
	    </tr>';
	    	while ($row = mysqli_fetch_assoc($result))
	    	{
	    		$ret = $ret . '
	    <tr>
	      <td>' . $row["nombre"] . '</td>
	      <td>' . $row["level"] . '</td>
	      <td>' . $row["exp"] . '</td>
	      <td>' . $row["dano_ataque"] . '</td>
	      <td>' . $row["aguante"] . '</td>
	      <td>' . $row["username"] . '</td>
	    </tr>
	';
	    	}
	    	return $ret . '</table>';
	    }
	}*/

	public function ranking_burbujas2() {
		if (array_key_exists('ip',$_SESSION) && !empty($_SESSION['ip']) && 
			array_key_exists('id',$_SESSION) && !empty($_SESSION['id']) &&
			$_SESSION['ip'] == getenv ( "REMOTE_ADDR" )) {
			$sql = "SELECT users.id, nombre, level, exp, dano_ataque, aguante, burbujas.id FROM burbujas,users WHERE burbujas.id = users.id ORDER BY level desc,exp desc, users.id asc";

			/* Select queries return a resultset */
			if($result = mysqli_query($this->connection,$sql))
			{

			if($result->num_rows == 0)
		    {
		    	printf("<br>Select gived 0 rows!<br>");
		    	return 0;
		    }
		    else 
		    {
	    		$ret = '<table border="1"> 
	    <tr id="first_row">
	      <td>' . "Burbujita" . '</td>
	      <td>' . "Level" . '</td>
	      <td>' . "Experiencia" . '</td>
	      <td>' . "Daño ataque" . '</td>
	      <td>' . "Defensa" . '</td>
	    </tr>';
		    	while ($row = mysqli_fetch_assoc($result))
		    	{
		    		if ($_SESSION["id"] == $row["id"])
		    		{
		    		$ret = $ret . '
	    <tr id="selected">
	      <td>' . $row["nombre"] . '</td>
	      <td>' . $row["level"] . '</td>
	      <td>' . $row["exp"] . '</td>
	      <td>' . $row["dano_ataque"] . '</td>
	      <td>' . $row["aguante"] . '</td>
	    </tr>
	';
					}
					else {
		    		$ret = $ret . '
	    <tr>
	      <td>' . $row["nombre"] . '</td>
	      <td>' . $row["level"] . '</td>
	      <td>' . $row["exp"] . '</td>
	      <td>' . $row["dano_ataque"] . '</td>
	      <td>' . $row["aguante"] . '</td>
	    </tr>
	';	
					}
		    	}
		    	return $ret . '</table>';
		    }
		}
		}
	}

	public function own_ranking() {
		if (array_key_exists('ip',$_SESSION) && !empty($_SESSION['ip']) && 
			array_key_exists('id',$_SESSION) && !empty($_SESSION['id']) &&
			$_SESSION['ip'] == getenv ( "REMOTE_ADDR" )) {
			$id = $_SESSION["id"];
			$sql = "SELECT users.id, nombre, level, exp, dano_ataque, aguante, burbujas.id FROM burbujas,users WHERE burbujas.id = users.id and users.id = '$id'";

			/* Select queries return a resultset */
			if($result = mysqli_query($this->connection,$sql))
			{
			if($result->num_rows == 0)
		    {
		    	printf("<br>Select gived 0 rows!<br>");
		    	return 0;
		    }
		    else 
		    {
		    	$ret = '<table border="1">
	    <tr id ="first_row">
	      <td>' . "Burbujita" . '</td>
	      <td>' . "Level" . '</td>
	      <td>' . "Experiencia" . '</td>
	      <td>' . "Daño ataque" . '</td>
	      <td>' . "Defensa" . '</td>
	    </tr>';
		    	while ($row = mysqli_fetch_assoc($result))
		    	{
		    		$ret = $ret . '
	    <tr id="selected">
	      <td>' . $row["nombre"] . '</td>
	      <td>' . $row["level"] . '</td>
	      <td>' . $row["exp"] . '</td>
	      <td>' . $row["dano_ataque"] . '</td>
	      <td>' . $row["aguante"] . '</td>
	    </tr>
	';
		    	}
		    	return $ret . '</table>';
		    }
		}
		}
	}
}
?>