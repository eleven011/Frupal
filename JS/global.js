//File where global variables will are located

/* ************************ map file information **************************/
var title = "";
var mapSize = 0;

//Elements for the hero game
var hero = {
  row_coordinate: 0,
  column_coordinate: 0,
  energy: 0,   // default
  whiffles: 0,  // default
  items: [],
}

//contains the coordinates of the royal diamond jewel on the map
var jewel = {
  x: 0,
  y: 0,
}
// contains the coordinates of the power bar on the map
var powerbar = {
  x: 0,
  y: 0,
}
var map;  // two dimensional array to store each map cell
// when parsing script performed successfully, it can use as:
// example: map[3][5].row  map[3][5].col  map[3][5].visibility  map[3][5].terrain  map[3][5].obstacle
// each element in this two dimensional array is a class of map_cell that declared below.

class map_cell {  // for each map cell's property
    constructor(x, y) {
        this.row = x;
        this.column = y;
        this.visibility = 0;
        this.terrain = 0;
        this.obstacle = "None";
    }
}
/* ************************* End map file information ******************************/



/*************************** graphic map information ******************************/
var cellSize = 40;  // each square's actual size measured in px. (can be any value)
var hero_left_pos = 0; // the graphic hero's position measured in px.
var hero_top_pos = 0;  // same above

var graphic_map = document.getElementById("map");
var startPage = document.getElementById("startPage");
var gamePage = document.getElementById("game");
var graphic_hero = document.getElementById("hero");
/*************************** End graphic map information ***************************/


// for state-preserving file 
var saved_map_info = [];
