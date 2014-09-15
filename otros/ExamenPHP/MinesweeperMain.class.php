<pre>
<?php
 // Include the class that you have to program.
require_once 'Minesweeper.class.php';

ini_set('display_errors', 1);
ini_set('html_errors', 1);
error_reporting( E_ALL | E_NOTICE );

/**
 * Main class. 
 * It has a static method that you can call to check if your app is working. By default, that's the behaviour when visiting this page.
 *
 */
class MinesweeperMain {
	
	public $filename	= "";
	public $parsedGrid	= "";
	public $numberOfColumns = 0;
	public $grids		= array();

	/**
	 * The constructor will receive the filename and parse it, initializing the object.
	 * @param String $filename
	 *
	 */

	public function  __construct( $filename = null )
	{
	    $this->filename = $filename;
		// We call a method to parse the input file and initialize our object. You have to create this method.
	    $this->parseInputFile();
	}
	/**
	 * This method will solve and print the solutions for all the grids from the input file.
	 */
	public function run()
	{
		foreach( $this->grids as $grid )
		{
			$grid->solve();
			$grid->printSolution();
		}
	}

	private function parseInputFile()
	{
		$fp = fopen($this->filename, 'r');
		if (!$fp) {
		    echo 'Could not open file' . $this->filename;
		}
		while (!feof($fp)) {
   			$line = fgets($fp);
   			$n = intval($line);
   			$this->parsedGrid = fgets($fp);
		    //echo "Leemos numero: " . $n . "\n"; 
			$this->grids[] = new Minesweeper($this->parsedGrid, $n);
		}
		fclose($fp);
	}

	/**
	 * This is a method that you can use to check if your app is working.
	 * This is not the final ultimate test: your app can pass this test and still be wrong. But if it passes this test, it's a good indicator.
	 * You don't have to change anything here.
	 *
	 */
	static public function runTest()
    {
	    $ourFilename = "ourTests.txt";
	    // We create an instance of the program to test it.
	    $program = new MinesweeperMain( $ourFilename );
	    // And we test the results :D
	    $program->run();

	    if ( $program->grids[0]->solution != array( array( '*', 1, 0, 0 ), array( 2, 2, 1, 0 ), array( 1, '*', 1, 0 ), array( 1, 1, 1, 0 ) ) )
	    {
		    echo "Grid #1: That's not the right solution :(";
	    }
	    else if ( $program->grids[1]->solution != array( array( '*', '*', 1, 0, 0 ), array( 3, 3, 2, 0, 0 ), array( 1, '*', 1, 0, 0 ) ) )
	    {
		    echo "Grid #2: That's not the right solution :(";
	    }
	    else if ( $program->grids[2]->solution != array( array( '*' ) ) )
	    {
		    echo "Grid #3: That's not the right solution :(";
	    }
	    else
	    {
			echo "Your program seems to work correctly ;)";
	    }
    }
	
}
// Visit this page to see if your program is working or not :)
MinesweeperMain::runTest();