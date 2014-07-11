<?php

class Minesweeper
{
    private $solution = array();
    private $unsolvedGrid = array();
    private $numColumns = 0;

    /**
     * The constructor must accept the parsed grid from the input, and the number of columns of the grid.
     */
    public function __construct( $parsedGrid, $numberOfColumns ) {
        //Solution is filled with 0's, except if there is a mine, that we put a '*'
        for ($i = 0; $i<$numberOfColumns; $i++) {
                for ($j = 0; $j < $length; $j++) {
                    if ($parsedGrid[i][j] == '*') {
                        $aux[] = '*';
                    }
                    else $aux[] = 0;
                }
            $solution[] = $aux;
        }
        $this->numColumns = $numberOfColumns;
        $this->unsolvedGrid = $parsedGrid;
    }

    /**
     * This method should return an array containing the solution of the minesweeper grid.
     */
    public function solve() {

        //Every time we find a mine. The neighbors are incremented. That's sufficient, because at the beginning we had initialized, the array vector "solution", correctly.
        for ($i = 0; $i<$numberOfColumns; $i++) {
                for ($j = 0; $j < $length; $j++) {
                    if ($solution[i][j] == '*') {
                        //We have to take care to do not go out of bounds.
                        if (i > 0) $solution[i-1][j]++;
                        if (i < $numberOfColumns) $solution[i+1][j]++;
                        if (j > 0) $solution[i][j-1]++;
                        if (j < $length) $solution[i][j+1]++;
                    }
                }
            }
        }
    }

    /**
     * This method should print the solution to the screen.
     */
    public function printSolution() {
        echo $solution;
    }
}


?>