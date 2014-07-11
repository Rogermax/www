<?php
class Item
{
    // Declaración de propiedades
	public $item_id;
	public $name_en;
	public $description_en;
	public $name_es;
	public $description_es;
	public $name_de;
	public $description_de;
	public $name_fr;
	public $description_fr;
	public $type;
	public $level;
	public $rarity;
	public $vendor_value;
	public $icon_file_id;
	public $icon_file_signature;
	public $default_skin;
	public $game_types;
	public $flags;
	public $restrictions;

    // Declaración de métodos
    function __construct() {
		$item_id = 0;
		$name_en = "unkown";
		$description_en = "unkown";
		$name_es = "unkown";
		$description_es = "unkown";
		$name_de = "unkown";
		$description_de = "unkown";
		$name_fr = "unkown";
		$description_fr = "unkown";
		$type = "unkown";
		$level = 0;
		$rarity = "unkown";
		$vendor_value = 0;
		$icon_file_id = 0;
		$icon_file_signature = "unkown";
		$default_skin = 0;
		$game_types = array();
		$flags = array();
		$restrictions = array();
		print "Construido Item\n";
   	}

    public function parseItem($item) {
    	if (array_key_exists('item_id', $item)) {
       		$item_id = $item['item_id'];
		}
    }
}
?>