// a function to generate a pair of binoculars once the game started, it will only execute once for a single game.
// once created, update the map file.
function create_binoculars(){
    var row, column;
    var i = 0;

    // loop multiple times in order to avoid overwrite other map cells' item.
    // it will stop looping once the item updated to the map file successfully.
    while(i < mapSize*mapSize){
        row = Math.floor(Math.random()*(mapSize));
        column = Math.floor(Math.random()*(mapSize));

        // if this location contains other item already, loop again. default value for obstacle is "None"
        if(map[row][column].obstacle != "None"){
            ++i;
            continue;
        }
        else{
            // update map file to contain binoculars in this location.
            // make sure the item's name matched the class name that appear in item list in the file gameLayout.css (appear in bottom of the file)
            map[row][column].obstacle = "Binoculars"; 
            break;
        }
    }
}


// a function to check binoculars every time the hero moved to a location
// it will ask user if the cell contains a pair of binoculars and display its value as well.
// once the item purchased, update money, update visibility, add to inventory, remove from graphic map, update map file
function encounter_binoculars(){
    if(map[hero.row_coordinate][hero.column_coordinate].obstacle == "Binoculars"){
        var response = confirm("You found a pair of binoculars! Would you like to purchase it for (50 whiffles)?");
        if(response == true){
            if(hero.whiffles < 50){
                alert("Sorry! you don't have enough whiffles to purchase this item!");
            }
            else{
                hero.whiffles -= 50;   // deducted money by 50
                document.getElementById("whiffles").value = hero.whiffles;  // display the updated money to the input box
                display_two_block_around(hero.row_coordinate, hero.column_coordinate);  // display two blocks around the hero immediately when purchased.
                hero.items.push("Binoculars"); // update useful item to map file (hero's item list)
                add_to_inventory("Binoculars");  // add useful item to graphic inventory block
                remove_item_in_cell(hero.row_coordinate, hero.column_coordinate);  // remove the graphic item in the graphic map
                map[hero.row_coordinate][hero.column_coordinate].obstacle = "None";  // set this cell's item to "None" in map file after removed from graphic map, must be in this sequence.  
            }
        }
    }
}


// a function to check if hero has binocular or not every time the hero move to a new location.
// update appropriate vivisibility.
function update_visibility(row, column){
    if(document.getElementById("Binoculars")){  // if binoculars exist in the inventory list
        display_two_block_around(row, column);
    }
    else{  // if not, display default
        display_one_block_around(row, column);
    }
}
