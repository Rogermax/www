<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<?php
class DBManager
{
  public function parseItems($id,$supercon) {
    $item_es = file_get_contents("https://api.guildwars2.com/v1/item_details.json?item_id=$id&lang=es");
    $item_en = file_get_contents("https://api.guildwars2.com/v1/item_details.json?item_id=$id&lang=en");
    $item_de = file_get_contents("https://api.guildwars2.com/v1/item_details.json?item_id=$id&lang=de");
    $item_fr = file_get_contents("https://api.guildwars2.com/v1/item_details.json?item_id=$id&lang=fr");
    $item_values = file_get_contents("http://api.gw2tp.com/1/items?ids=$id&fields=buy,sell,supply,demand");
    $item_decodificado_es = json_decode($item_es, true);
    $item_decodificado_en = json_decode($item_en, true);
    $item_decodificado_de = json_decode($item_de, true);
    $item_decodificado_fr = json_decode($item_fr, true);
    $item_decodificado_values = json_decode($item_values, true);
    switch ($item_decodificado_en['type']) {
      case 'Armor':
        $this->insertArmor($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Back':
        $this->insertBack($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Bag':
        $this->insertBag($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Consumable':
        $this->insertConsumable($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Container':
        $this->insertContainer($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'CraftingMaterial':
        $this->insertCraftingMaterial($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Gathering':
        $this->insertGathering($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Gizmo':
        $this->insertGizmo($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'MiniPet':
        $this->insertMiniPet($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Tool':
        $this->insertTool($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Trinket':
        $this->insertTrinket($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Trophy':
        $this->insertTrophy($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'UpgradeComponent':
        $this->insertUpgradeComponent($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      case 'Weapon':
        $this->insertWeapon($item_decodificado_es,$item_decodificado_en,$item_decodificado_de,$item_decodificado_fr,$item_decodificado_values,$supercon);
        break;
      default:
        print "error en el tipo de objeto";
        break;
    }
  }

  public function insertArmor($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon) {
    //$con = mysqli_connect('localhost','user_gw2','KanBtZMZs5yWfbKZ','gw2');
   
    $this->insertItem($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon);



    $uniqkey = array($a_en['item_id'],$a_en['armor']['type'],$a_en['armor']['weight_class'],$a_en['armor']['defense']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    armor(item_id, subtype, weight_class, defense)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";

    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Armor" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Armor hecho!<br>";
    }

    
  }

  public function insertBack($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon) {
    //$con = mysqli_connect('localhost','user_gw2','KanBtZMZs5yWfbKZ','gw2');
   
    $this->insertItem($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon);




    if(count($a_en['back']['infusion_slots']) > 0) $is = $this->calculate_back_infusion_slots($a_en,0);
    else $is = 1;

    $uniqkey = array($a_en['item_id'],$is);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    back(item_id, infusion_type)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";

    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Back" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Back hecho!<br>";
    }

    
  }

  public function insertBag($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon) {
    //$con = mysqli_connect('localhost','user_gw2','KanBtZMZs5yWfbKZ','gw2');
   
    $this->insertItem($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon);



    $uniqkey = array($a_en['item_id'],$a_en['bag']['no_sell_or_sort'], $a_en['bag']['size']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    bag(item_id, no_sell_or_sort, size)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";

    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Bag" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Bag hecho!<br>";
    }

    
  }

  public function insertConsumable($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon) {
    //$con = mysqli_connect('localhost','user_gw2','KanBtZMZs5yWfbKZ','gw2');
   
    $this->insertItem($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon);


    switch ($a_en['consumable']['type']) {
      case 'Unlock':
        switch ($a_en['consumable']['unlock_type']) {
          case 'CraftingRecipe':
            $uniqkey = array($a_en['item_id'],$a_en['consumable']['type'],$a_en['consumable']['unlock_type'],$a_en['consumable']['recipe_id']);
            // Escape each value in the uniqkey array
            $values = array_map('mysql_real_escape_string', $uniqkey);

            // implode values with quotes and commas
            $values = "'" . implode("', '", $values) . "'";

            $sql="INSERT INTO 
            consumable(item_id, subtype, unlock_type, recipe_id)
             VALUES ($values)";

            //echo "<br>" . $sql . "<br>";

            $result = mysqli_query($supercon,$sql);
            break;
          case 'Dye':            
            $uniqkey = array($a_en['item_id'],$a_en['consumable']['type'],$a_en['consumable']['unlock_type'],$a_en['consumable']['color_id']);
            // Escape each value in the uniqkey array
            $values = array_map('mysql_real_escape_string', $uniqkey);

            // implode values with quotes and commas
            $values = "'" . implode("', '", $values) . "'";

            $sql="INSERT INTO 
            consumable(item_id, subtype, unlock_type, color_id)
             VALUES ($values)";

            //echo "<br>" . $sql . "<br>";

            $result = mysqli_query($supercon,$sql);
            break;
          default:
            $uniqkey = array($a_en['item_id'],$a_en['consumable']['type'],$a_en['consumable']['unlock_type']);
            // Escape each value in the uniqkey array
            $values = array_map('mysql_real_escape_string', $uniqkey);

            // implode values with quotes and commas
            $values = "'" . implode("', '", $values) . "'";

            $sql="INSERT INTO 
            consumable(item_id, subtype, unlock_type)
             VALUES ($values)";

            //echo "<br>" . $sql . "<br>";

            $result = mysqli_query($supercon,$sql);
            break;
        }
        break;
      case 'Generic':
        if (!array_key_exists('description', $a_en['consumable']) || strlen($a_en['consumable']['description']) < 1) $d_en = "no description";
        else $d_en = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_es['consumable']) || strlen($a_es['consumable']['description']) < 1) $d_es = "sin descripción";
        else $d_es = $a_es['consumable']['description'];
        if (!array_key_exists('description', $a_de['consumable']) || strlen($a_de['consumable']['description']) < 1) $d_de = "keine Beschreibung";
        else $d_de = $a_de['consumable']['description'];
        if (!array_key_exists('description', $a_fr['consumable']) || strlen($a_fr['consumable']['description']) < 1) $d_fr = "pas de description";
        else $d_fr = $a_fr['consumable']['description'];
        if (!array_key_exists('duration_ms', $a_en['consumable'])) $dms = 0;
        else $dms = $a_en['consumable']['duration_ms'];

        $uniqkey = array($a_en['item_id'],$a_en['consumable']['type'], $dms, $d_en, $d_es, $d_de, $d_fr);
        // Escape each value in the uniqkey array
        $values = array_map('mysql_real_escape_string', $uniqkey);

        // implode values with quotes and commas
        $values = "'" . implode("', '", $values) . "'";

        $sql="INSERT INTO 
        consumable(item_id, subtype, duration_ms, description_en, description_es, description_de, description_fr)
         VALUES ($values)";

        //echo "<br>" . $sql . "<br>";

        $result = mysqli_query($supercon,$sql);
        break;
      case 'Food':
        if (!array_key_exists('description', $a_en['consumable']) || strlen($a_en['consumable']['description']) < 1) $d_en = "no description";
        else $d_en = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_es['consumable']) || strlen($a_es['consumable']['description']) < 1) $d_es = "sin descripción";
        else $d_es = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_de['consumable']) || strlen($a_de['consumable']['description']) < 1) $d_de = "keine Beschreibung";
        else $d_de = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_fr['consumable']) || strlen($a_fr['consumable']['description']) < 1) $d_fr = "pas de description";
        else $d_fr = $a_en['consumable']['description'];
        if (!array_key_exists('duration_ms', $a_en['consumable'])) $dms = 0;
        else $dms = $a_en['consumable']['duration_ms'];

        $uniqkey = array($a_en['item_id'],$a_en['consumable']['type'], $dms, $d_en, $d_es, $d_de, $d_fr);
        // Escape each value in the uniqkey array
        $values = array_map('mysql_real_escape_string', $uniqkey);

        // implode values with quotes and commas
        $values = "'" . implode("', '", $values) . "'";

        $sql="INSERT INTO 
        consumable(item_id, subtype, duration_ms, description_en, description_es, description_de, description_fr)
         VALUES ($values)";

        //echo "<br>" . $sql . "<br>";

        $result = mysqli_query($supercon,$sql);
        break;
      case 'Utility':
        if (!array_key_exists('description', $a_en['consumable']) || strlen($a_en['consumable']['description']) < 1) $d_en = "no description";
        else $d_en = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_es['consumable']) || strlen($a_es['consumable']['description']) < 1) $d_es = "sin descripción";
        else $d_es = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_de['consumable']) || strlen($a_de['consumable']['description']) < 1) $d_de = "keine Beschreibung";
        else $d_de = $a_en['consumable']['description'];
        if (!array_key_exists('description', $a_fr['consumable']) || strlen($a_fr['consumable']['description']) < 1) $d_fr = "pas de description";
        else $d_fr = $a_en['consumable']['description'];
        if (!array_key_exists('duration_ms', $a_en['consumable'])) $dms = 0;
        else $dms = $a_en['consumable']['duration_ms'];

        $uniqkey = array($a_en['item_id'],$a_en['consumable']['type'], $dms, $d_en, $d_es, $d_de, $d_fr);
        // Escape each value in the uniqkey array
        $values = array_map('mysql_real_escape_string', $uniqkey);

        // implode values with quotes and commas
        $values = "'" . implode("', '", $values) . "'";

        $sql="INSERT INTO 
        consumable(item_id, subtype, duration_ms, description_en, description_es, description_de, description_fr)
         VALUES ($values)";

        //echo "<br>" . $sql . "<br>";

        $result = mysqli_query($supercon,$sql);
        break;
      default:           
        $uniqkey = array($a_en['item_id'],$a_en['consumable']['type']);
        // Escape each value in the uniqkey array
        $values = array_map('mysql_real_escape_string', $uniqkey);

        // implode values with quotes and commas
        $values = "'" . implode("', '", $values) . "'";

        $sql="INSERT INTO 
        consumable(item_id, subtype)
         VALUES ($values)";

        //echo "<br>" . $sql . "<br>";

        $result = mysqli_query($supercon,$sql);
        break;
    }

    if(!$result) {
      echo "Error en consumable" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Consumable hecho!<br>";
    }

    
  }

  public function insertContainer($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon) {
    //$con = mysqli_connect('localhost','user_gw2','KanBtZMZs5yWfbKZ','gw2');
   
    $this->insertItem($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon);





    $uniqkey = array($a_en['item_id'], $a_en['container']['type']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    container(item_id, subtype)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";

    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Container" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Container hecho!<br>";
    }

    
  }

  public function insertCraftingMaterial($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);



    $uniqkey = array($a_en['item_id']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    craftingmaterial(item_id)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en CraftingMaterial" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en CraftingMaterial hecho!<br>";
    }
    
  }

  public function insertGathering($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);


    $uniqkey = array($a_en['item_id'],$a_en['gathering']['type']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    gathering(item_id, subtype)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Gathering" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Gathering hecho!<br>";
    }
    
  }

  public function insertGizmo($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);


    $uniqkey = array($a_en['item_id'],$a_en['gizmo']['type']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    gizmo(item_id, subtype)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Gizmo" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Gizmo hecho!<br>";
    }
    
  }

  public function insertMiniPet($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);


    $uniqkey = array($a_en['item_id']/*,...*/);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    minipet(item_id)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en minipet" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en MiniPet hecho!<br>";
    }
    
  }

  public function insertTool($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);


    $uniqkey = array($a_en['item_id'],$a_en['tool']['type'],$a_en['tool']['charges']);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    tool(item_id, subtype, charges)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Tool" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Tool hecho!<br>";
    }
    
  }

  public function insertTrinket($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);

    if (count($a_en['trinket']['infusion_slots']) > 0) $is = $this->calculate_trinket_infusion_slots($a_en,0);
    else $is = 0;

    $uniqkey = array($a_en['item_id'],$a_en['trinket']['type'],$is);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    trinket(item_id, subtype, infusion_type)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en trinket" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Trinket hecho!<br>";
    }
    
  }

  public function insertTrophy($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);


    $uniqkey = array($a_en['item_id']/*,...*/);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    trophy(item_id)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Trophy" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Trophy hecho!<br>";
    }
    
  }

  public function insertUpgradeComponent($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);

    $flags = $this->calculate_uc_flags($a_en);
    $iu = $this->calculate_infusion_upgrade($a_en);
    if (array_key_exists('bonuses', $a_en['upgrade_component']) && count($a_en['upgrade_component']['bonuses']) > 0) $d_en = json_encode($a_en['upgrade_component']['bonuses']);
    if (array_key_exists('bonuses', $a_es['upgrade_component']) && count($a_es['upgrade_component']['bonuses']) > 0) $d_es = json_encode($a_es['upgrade_component']['bonuses']);
    if (array_key_exists('bonuses', $a_de['upgrade_component']) && count($a_de['upgrade_component']['bonuses']) > 0) $d_de = json_encode($a_de['upgrade_component']['bonuses']);
    if (array_key_exists('bonuses', $a_fr['upgrade_component']) && count($a_fr['upgrade_component']['bonuses']) > 0) {
      $d_fr = json_encode($a_fr['upgrade_component']['bonuses']);
      $uniqkey = array($a_en['item_id'],$a_en['upgrade_component']['type'], $flags, $iu, $d_en, $d_es, $d_de, $d_fr);
      // Escape each value in the uniqkey array
      $values = array_map('mysql_real_escape_string', $uniqkey);

      // implode values with quotes and commas
      $values = "'" . implode("', '", $values) . "'";

      $sql="INSERT INTO 
      upgradecomponent(item_id, subtype, flags, infusion_upgrade_flags, bonuses_en, bonuses_es, bonuses_de, bonuses_fr)
       VALUES ($values)";
    }
    else {

      $uniqkey = array($a_en['item_id'],$a_en['upgrade_component']['type'], $flags, $iu);
      // Escape each value in the uniqkey array
      $values = array_map('mysql_real_escape_string', $uniqkey);

      // implode values with quotes and commas
      $values = "'" . implode("', '", $values) . "'";

      $sql="INSERT INTO 
      upgradecomponent(item_id, subtype, flags, infusion_upgrade_flags)
       VALUES ($values)";
    }

    //echo "<br>" . $sql . "<br>";
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en UpgradeComponent" ;
      echo "<br>" . $sql . "<br>";
    } 
    else 
    { 
      //echo "Insert en UpgradeComponent hecho!<br>";
    }
    
  }

  public function insertWeapon($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon) {
    $this->insertItem($a_es,$a_en,$a_de,$a_fr,$a_values,$supercon);

    if (count($a_en['weapon']['infusion_slots']) > 0) $it1 = $this->calculate_infusion_upgrade_w($a_en,0);
    else $it1 = 0;
    if (count($a_en['weapon']['infusion_slots']) > 1) $it2 = $this->calculate_infusion_upgrade_w($a_en,1);
    else $it2 = 0;

    $uniqkey = array($a_en['item_id'],$a_en['weapon']['type'],$a_en['weapon']['damage_type'],$a_en['weapon']['min_power'],$a_en['weapon']['max_power'],$a_en['weapon']['defense'],$it1, $it2);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    $sql="INSERT INTO 
    weapon(item_id, subtype, damage_type, min_power, max_power, defense, infusion_type1, infusion_type2)
     VALUES ($values)";

    //
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Weapon" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Weapon hecho!<br>";
    }
  }

  private function insertItem($a_es, $a_en, $a_de, $a_fr, $a_values,$supercon) {
   
    
    // Check connection
    if (mysqli_connect_errno())
    {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    $gt = $this->calculate_game_type($a_en);
    $f = $this->calculate_flags($a_en);
    $r = $this->calculate_restrictions($a_en);
    if (!array_key_exists('description', $a_en) || strlen($a_en['description']) < 1) $d_en = "no description";
    else $d_en = $a_en['description'];
    if (!array_key_exists('description', $a_en) || strlen($a_es['description']) < 1) $d_es = "sin descripción";
    else $d_es = $a_es['description'];
    if (!array_key_exists('description', $a_en) || strlen($a_de['description']) < 1) $d_de = "keine Beschreibung";
    else $d_de = $a_de['description'];
    if (!array_key_exists('description', $a_en) || strlen($a_fr['description']) < 1) $d_fr = "pas de description";
    else $d_fr = $a_fr['description'];

    if(!array_key_exists('default_skin',$a_en) || strlen($a_en['default_skin']) < 1) $ds = 0;
    else $ds = $a_en['default_skin'];

    if (count($a_values['results']) < 1) $a1 = array(0,0,0,0,0);
    else $a1 = $a_values['results'][0]; 

    $uniqkey = array($a_en['item_id'],$a_en['name'],$d_en,$a_es['name'],$d_es,$a_de['name'],$d_de,$a_fr['name'],$d_fr,
      $a_en['type'],$a_en['level'],$a_en['rarity'],$a_en['vendor_value'],$a1[1],$a1[2],$a1[3],$a1[4],$a_en['icon_file_id'],$a_en['icon_file_signature'],
      $ds,$gt,$f,$r);
    // Escape each value in the uniqkey array
    $values = array_map('mysql_real_escape_string', $uniqkey);

    // implode values with quotes and commas
    $values = "'" . implode("', '", $values) . "'";

    //var_dump($a_values);
    $sql="INSERT INTO 
    item(item_id, name_en, description_en, name_es, description_es, name_de, description_de, name_fr, description_fr, 
      type, level, rarity, vendor_value, bazar_buy, bazar_sell, bazar_supply, bazar_demand, icon_file_id, icon_file_signature,
      default_skin, game_types, flags, restrictions)
     VALUES ($values)";

    //echo "<br>" . $sql . "<br>";

    $result = mysqli_query($supercon,"SET NAMES utf8");
    if(!$result) echo "Set names utf8 falló.<br>";
    else {
      //echo "Conexion a utf8 correcta.<br>";
    }
    $result = mysqli_query($supercon,$sql);
    if(!$result) {
      echo "Error en Items" ;
      echo "<br>" . $sql . "<br>";
    }
    else 
    { 
      //echo "Insert en Item hecho!<br>";
    }

  }

  private function calculate_game_type($a_en) {
    $gt = 0;
    if (in_array('Activity', $a_en['game_types'])) $gt += 1;
    if (in_array('Dungeon', $a_en['game_types'])) $gt += 2;
    if (in_array('Pve', $a_en['game_types'])) $gt += 2*2;
    if (in_array('Pvp', $a_en['game_types'])) $gt += 2*2*2;
    if (in_array('PvpLobby', $a_en['game_types'])) $gt += 2*2*2*2;
    if (in_array('Wvw', $a_en['game_types'])) $gt += 2*2*2*2*2;
    return $gt;
  }

  private function calculate_flags($a_en) {
    $gt = 0;
    if (in_array('AccountBindOnUse', $a_en['flags'])) $gt += 1;
    if (in_array('AccountBound', $a_en['flags'])) $gt += 2;
    if (in_array('HideSuffix', $a_en['flags'])) $gt += 2*2;
    if (in_array('NoMysticForge', $a_en['flags'])) $gt += 2*2*2;
    if (in_array('NoSalvage', $a_en['flags'])) $gt += 2*2*2*2;   
    if (in_array('NoSell', $a_en['flags'])) $gt += 2*2*2*2*2;
    if (in_array('NotUpgradeable', $a_en['flags'])) $gt += 2*2*2*2*2*2;
    if (in_array('NoUnderwater', $a_en['flags'])) $gt += 2*2*2*2*2*2*2;
    if (in_array('SoulbindOnAcquire', $a_en['flags'])) $gt += 2*2*2*2*2*2*2*2;
    if (in_array('SoulBindOnUse', $a_en['flags'])) $gt += 2*2*2*2*2*2*2*2*2;
    if (in_array('Unique', $a_en['flags']))  $gt += 2*2*2*2*2*2*2*2*2*2;
    return $gt;
  }

  private function calculate_restrictions($a_en) {
    $gt = 0;
    if (in_array('Asura', $a_en['flags'])) $gt += 1;
    if (in_array('Charr', $a_en['flags'])) $gt += 2;
    if (in_array('Human', $a_en['flags'])) $gt += 2*2;
    if (in_array('Norn', $a_en['flags'])) $gt += 2*2*2;
    if (in_array('Sylvari', $a_en['flags'])) $gt += 2*2*2*2;   
    if (in_array('Guardian', $a_en['flags'])) $gt += 2*2*2*2*2;
    if (in_array('Warrior', $a_en['flags'])) $gt += 2*2*2*2*2*2;
    return $gt;
  }

  private function calculate_back_infusion_slots($a_en,$num) {
    $gt = 0;
    if (array_key_exists('flags', $a_en['back']['infusion_slots'][$num]) && in_array('Offense', $a_en['back']['infusion_slots'][$num]['flags'])) $gt += 1;
    if (array_key_exists('flags', $a_en['back']['infusion_slots'][$num]) && in_array('Defense', $a_en['back']['infusion_slots'][$num]['flags'])) $gt += 2;
    return $gt;
  }

  private function calculate_trinket_infusion_slots($a_en,$num) {
    $gt = 0;
    if (array_key_exists('flags', $a_en['trinket']['infusion_slots'][$num]) && in_array('Offense', $a_en['trinket']['infusion_slots'][$num]['flags'])) $gt += 1;
    if (array_key_exists('flags', $a_en['trinket']['infusion_slots'][$num]) && in_array('Defense', $a_en['trinket']['infusion_slots'][$num]['flags'])) $gt += 2;
    return $gt;
  }

  private function calculate_uc_flags($a_en) {
    $gt = 0;
    if (in_array('HeavyArmor', $a_en['upgrade_component']['flags'])) $gt += 1;
    if (in_array('Axe', $a_en['upgrade_component']['flags'])) $gt += 2;
    if (in_array('Trinket', $a_en['upgrade_component']['flags'])) $gt += 2*2;
    return $gt;
  }

  private function calculate_infusion_upgrade($a_en) {
    $gt = 0;
    if (in_array('Offense', $a_en['upgrade_component']['infusion_upgrade_flags'])) $gt += 1;
    if (in_array('Defense', $a_en['upgrade_component']['infusion_upgrade_flags'])) $gt += 2;
    if (in_array('Utility', $a_en['upgrade_component']['infusion_upgrade_flags'])) $gt += 2*2;
    return $gt;
  }

  private function calculate_infusion_upgrade_w($a_en,$num) {
    $gt = 0;
    if (array_key_exists('flags', $a_en['weapon']['infusion_slots'][$num]) && in_array('Offense', $a_en['weapon']['infusion_slots'][$num]['flags'])) $gt += 1;
    if (array_key_exists('flags', $a_en['weapon']['infusion_slots'][$num]) && in_array('Defense', $a_en['weapon']['infusion_slots'][$num]['flags'])) $gt += 2;
    if (array_key_exists('flags', $a_en['weapon']['infusion_slots'][$num]) && in_array('Utility', $a_en['weapon']['infusion_slots'][$num]['flags'])) $gt += 2*2;
    return $gt;
  }

}


$supercon = mysqli_connect('localhost','superuser_gw2','CpWcnMuDXFyuwaqD','gw2');
$items = file_get_contents("https://api.guildwars2.com/v1/items.json");
$arr = json_decode($items, true);
$tam = count($arr['items']);
$act = 1;
//echo $arr['items'][36];
//echo $arr['items'][71];
$a = new DBManager();
ini_set('max_execution_time', 130000);
foreach ($arr['items'] as &$value) {
    if ($act == 169) {
      echo $value ."<br>";
    }
    else {
      //echo $act;
      //echo "/";
      //echo $tam;
      //echo "<br>";
      if ($act >= 169) break;
    }
    $act += 1;
}

mysqli_close($supercon);
echo "hemos salido.<br>";
//$a->parseItems(19983); //123,36677,9572,12488,20356,66165,38463,13105,38291,24739,30689
?>