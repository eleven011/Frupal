// Load the royal jewels into a random cell in the map.
function create_royal_jewel()
{
  jewel.x = Math.floor(Math.random()*(mapSize)); //max coordinate (24,24)
  jewel.y = Math.floor(Math.random()*(mapSize)); //max coordinate (24,24)
  map[jewel.x][jewel.y].obstacle = "Jewel";  // use to display jewel image in the cell
}

// Get the x,y location of the royal jewels
function get_jewel_loc()
{
  return jewel.x +',' +jewel.y;
}

// If the hero's location equals the jewel's location, player wins the game
// Game ends once jewels are collected
function win_game()
{
  if ( (eval(hero.row_coordinate) == eval(jewel.x)) && (eval(hero.column_coordinate) == eval(jewel.y)) )
  {
    alert("Royal Jewel Found! Game over.");
    game_over();
  }
}

//Creats a treasure2 instance on the map
funciton treasure2 () {
  x = 0;
  y = 0;
  i = 0;
  
  //Find a random empty cell to place treasure2 in
  while (!i) {
    x = Math.floor(Math.random()*(mapSize));
    y = Math.floor(Math.random()*(mapSize));
    
    if (map[x][y].obstacle == "None")
      i = 1;
  }
  
  map[x][y].obstacle = "Treasure2";
  treasure2.x = x; //Save informaiton into a global variable
  treasure2.y = y; //Save informaiton into a global variable
}

//Checks if the hero is at treasure2
function checkTreasure() {
  
  //If at treasure2 location, whiffles go to zero and the obstacle 
  //if removed from the map.
  if ((eval(hero.row_coordinate) == eval(treasure2.x)) &&
      (eval(hero.column_coordinate) == eval(treasure2.y)))
  {
    hero.whiffles = 0;
    remove_item_in_cell(treasure2.x,treasure2.y);
    map[treasure2.x][treasure2.y].obstacle = "None";
  }
}

// This assumes if the hero moves to the royal jewels with their last energy they win the game.
// Otherwise, the hero runs out of energy and loses the game.
function noEnergy() {
  if (hero.energy == 0 && ((eval(hero.row_coordinate) == eval(jewel.x)) && (eval(hero.column_coordinate) == eval(jewel.y))))
    return;
  
  if (hero.energy == 0) {
    alert ("You ran out of energy!");
    game_over();
  }
}


