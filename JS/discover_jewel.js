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


