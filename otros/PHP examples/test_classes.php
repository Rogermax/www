<pre>
<?php

include "classes.inc";

// utility functions

function print_vars($obj) 
{
	foreach (get_object_vars($obj) as $prop => $val) {
    	echo "\t$prop = $val\n";
	}
}

function print_methods($obj) 
{
	$arr = get_class_methods(get_class($obj));
		foreach ($arr as $method) {
    	echo "\tfunction $method()\n";
	}
}

function class_parentage($obj, $class) 
{
if (is_subclass_of($GLOBALS[$obj], $class)) {
    echo "Object $obj belongs to class " . get_class($GLOBALS[$obj]);
    echo " a subclass of $class\n";
} else {
    echo "Object $obj does not belong to a subclass of $class\n";
}
}

// instantiate 2 objects

$veggie = new Vegetable(true, "blue");
$leafy = new Spinach();

// print out information about objects
echo "veggie: CLASS " . get_class($veggie) . "\n";
echo "leafy: CLASS " . get_class($leafy);
echo ", PARENT " . get_parent_class($leafy) . "\n";

// show veggie properties
echo "\nveggie: Properties\n";
print_vars($veggie);

// and leafy methods
echo "\nleafy: Methods\n";
print_methods($leafy);

echo "\nParentage:\n";
class_parentage("leafy", "Spinach");
class_parentage("leafy", "Vegetable");

echo "------------------------\n";
$estudiante1 = new Estudiante();
echo "dni antes del estu1: " . $estudiante1->getDNI() . "\n";
echo "maxima_nota antes: " . $estudiante1->Nota() . "\n";
$estudiante1->Aprueba();
echo "dni despues del estu1: " . $estudiante1->getDNI() . "\n";
echo "maxima_nota despues: " . $estudiante1->Nota() . "\n";
?>
</pre>