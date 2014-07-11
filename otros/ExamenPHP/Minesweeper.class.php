<?php

require_once 'Minesweeper.Interface.php';

class Minesweeper implements MinesweeperInterface
{
    private $grid;
    private $col;
    private $fil;
    public $solution;
    /**
     * The constructor must accept the parsed grid from the input, and the number of columns of the grid.
     */
    public function __construct( $parsedGrid, $numberOfColumns )
    {
        $next = 0;
        $this->fil = $numberOfColumns;
        //echo "filas: " . $this->fil . "\n";
        $this->col = (strlen($parsedGrid) - 2)/$this->fil;
        if ($this->col == -1) $this->col = 1;
        //echo "columnas: " . $this->col . "\n";
        for ($i = 0; $i < $this->col; $i += 1) {
            for ($j = 0 ; $j < $this->fil; $j += 1) {
                if ($parsedGrid[$next] == '.')  $this->grid[$i][$j] = '0';
                else $this->grid[$i][$j] = $parsedGrid[$next];
                //echo $this->grid[$i][$j];
                $next += 1;
            }
            //echo "\n";
        }
    }

    /**
     * This method should return an array containing the solution of the minesweeper grid.
     */
    public function solve()
    {
        for ($i = 0; $i < $this->col; $i += 1) {
            for ($j = 0 ; $j < $this->fil; $j += 1) {
                if ($this->grid[$i][$j] == '*')
                    $this->sumarAlrededor($i,$j);
            }
            //echo "\n";
        }
        $this->solution = $this->grid;
    } 

    private function sumarAlrededor($i, $j)
    {
        if (($i+1) < $this->col && $this->grid[$i+1][$j] != '*') $this->grid[$i+1][$j] += 1;
        if (($i+1) < $this->col && ($j+1) < $this->fil && $this->grid[$i+1][$j+1] != '*') $this->grid[$i+1][$j+1] += 1;
        if (($j+1) < $this->fil && $this->grid[$i][$j+1] != '*') $this->grid[$i][$j+1] += 1;
        if (($i-1) >= 0 && ($j+1) < $this->fil && $this->grid[$i-1][$j+1] != '*') $this->grid[$i-1][$j+1] += 1;
        if (($i-1) >= 0 && $this->grid[$i-1][$j] != '*') $this->grid[$i-1][$j] += 1;
        if (($i-1) >= 0 && ($j-1) >= 0 && $this->grid[$i-1][$j-1] != '*') $this->grid[$i-1][$j-1] += 1;
        if (($j-1) >= 0 &&  $this->grid[$i][$j-1] != '*') $this->grid[$i][$j-1] += 1;
        if (($i+1) < $this->col && ($j-1) >= 0 && $this->grid[$i+1][$j-1] != '*') $this->grid[$i+1][$j-1] += 1;
    }

    /**
     * This method should print the solution to the screen.
     */
    public function printSolution()
    {
        for ($i = 0; $i < $this->col; $i += 1) {
            for ($j = 0 ; $j < $this->fil; $j += 1) {
                echo $this->grid[$i][$j];
            }
            echo "\n";
        }
        echo "\n";
    }
}
?>