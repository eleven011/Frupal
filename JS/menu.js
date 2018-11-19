// save map to state-preserving file when close the browser or tab. 
window.onbeforeunload = window.onunload = function (){
    if(localStorage.getItem("game_status") == "in_game"){
        saveMap();
        localStorage.setItem("game_status", "saved_game");
    }
};


// start, function to display the game 
// scripts to execute when clicked "new game"
function startGame(){
    if(parse_map_file("map")){  // when new name, parse map file
        create_royal_jewel();  //setup the location of royal diamond on the map.
       	create_power_bar();	// setup the location of the power bar on the map
	create_binoculars();  // setup binoculars
	document.getElementById("currentlocation").value=get_hero_position();
  document.getElementById("energy").value=get_energy();
  document.getElementById("terrain").value=get_terrain();
	document.getElementById("whiffles").value = hero.whiffles;


        // put code above, parsing or setting or creating something necessary
        localStorage.setItem("game_status", "in_game");
        setupMap();  // setup the game map, have all game element ready in the map
        setup_Inventory();  // setup inventory
        //display_all_blocks();  // remove comment for testing only, display all cells to viewable
        startPage.style.display = "none"; // hide the menu page
        gamePage.style.display = "block";  // display the game with the map and control-panel
    }
    else{
        alert("Loading map file failed!");
    }
}


// exit, remove all map cells and display starting menu when clicked "exit game"
// scripts to perform after exit game
function exitGame(){
    gamePage.style.display = "none";
    startPage.style.display = "block";
    removeAllCells();
    // put code below
    saveMap();
    reset_Inventory();
    localStorage.setItem("game_status", "saved_game");
}


// scripts to perform when user come back and click "continue game"
function continueGame(){
    if (parse_map_file("save_map")){
        document.getElementById("currentlocation").value=get_hero_position();
        document.getElementById("energy").value=get_energy();
        document.getElementById("terrain").value=get_terrain();
	      document.getElementById("whiffles").value = hero.whiffles;


        // load state preserving file from localStorage above
        localStorage.setItem("game_status", "in_game");
        setupMap();
        setup_Inventory();
        startPage.style.display = "none"; // hide the menu page
        gamePage.style.display = "block";  // display the game with the map and control-panel
    }
    else{
        alert("No state-preserving file found!");
    }
}


// scripts to perform when royal dismond found or run out of energy
function game_over(){
    localStorage.removeItem("save_map");
    localStorage.setItem("game_status", "off_game");
    gamePage.style.display = "none";
    startPage.style.display = "block";
    removeAllCells();
    reset_Inventory();
}


//I tried to set up save to save the file in the same format as the parsing sctipt so when we add the continue button we should be 
//able just add a call to the parsing script then the create map to create the map off the values we have. I imagine once we
//add items to the cells we will need to change this a bit.
function saveMap() {
     var file = [];
     file.push(title);
     file.push(mapSize);
     file.push("#########");//pointless, i know, but it kind of helps with readability/consistancy with the parsing script
     //file.push([hero.row_coordinate, hero.column_coordinate]);
     file.push(hero.row_coordinate + "," + hero.column_coordinate); //looks like the parsing script breaks up a concatenation of strings and not an array
     file.push(hero.energy);
     file.push(hero.whiffles);
     
     //adds each hero item to a seperate index of file
     items_max = hero.items.length;
     for (i = 0; i < items_max; ++i) {
         file.push(hero.items[i]);
     }
     file.push("########"); //to reuse the parsing script
     
     //goes through each cell of the map and saves it's information to its own index of file.
     for(a = 0; a < mapSize; ++a){
         for(b = 0; b < mapSize; ++b){
             file.push(map[a][b].row + "," + map[a][b].column + "," + map[a][b].visibility + "," +  map[a][b].terrain + "," + map[a][b].obstacle);
         }
     }
    
     //appends the jewel coordinates tot he end of the file to be written
     file.push('#');
     file.push(jewel.x);
     file.push(jewel.y);

     //stores as a string in JSON format for the parsing script
     localStorage.setItem("save_map", JSON.stringify(file));
}

