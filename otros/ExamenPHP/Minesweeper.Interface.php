<?php
/**
 * This is the interface that you need to implement. Your class MUST have at least these methods.
 *
 */
interface MinesweeperInterface {

	/**
	 * The constructor must accept the parsed grid from the input, and the number of columns of the grid.
	 */
	public function __construct( $parsedGrid, $numberOfColumns );

	/**
	 * This method should return an array containing the solution of the minesweeper grid.
	 */
	public function solve();	

	/**
	 * This method should print the solution to the screen.
	 */
	public function printSolution();

}
?>
