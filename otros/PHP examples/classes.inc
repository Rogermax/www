<?php

class Persona {
  protected $dni; //si es private, Estudiante ha de acceder por el setDNI.

  public function Persona()
  {
    $this->dni = 0;
  }

  public function setDNI($dni)
  {
    $this->dni = $dni;
  }

  public function getDNI()
  {
    return $this->dni;
  }
}

class Estudiante extends Persona {
  private $maxima_nota;

  public function Estudiante() {
    parent::Persona();
    $this->maxima_nota = 4;
  }

  public function Aprueba() {
    $this->maxima_nota = 8;
    $this->dni += 1;
  }

  public function Nota() {
    return $this->maxima_nota;
  }
}



// base class with member properties and methods
class Vegetable {

   var $edible;
   var $color;

   function Vegetable($edible, $color="green") 
   {
       $this->edible = $edible;
       $this->color = $color;
   }

   function is_edible() 
   {
       return $this->edible;
   }

   function what_color() 
   {
       return $this->color;
   }
   
} // end of class Vegetable

// extends the base class
class Spinach extends Vegetable {

   var $cooked = false;

   function Spinach() 
   {
       $this->Vegetable(true, "green");
   }

   function cook_it() 
   {
       $this->cooked = true;
   }

   function is_cooked() 
   {
       return $this->cooked;
   }
   
} // end of class Spinach

?>