// this function creates the power bar on the map at a random x,y location, is called once upon games start
function create_power_bar(){
	powerbar.x = Math.floor(Math.random()*(mapSize));
	powerbar.y = Math.floor(Math.random()*(mapSize));
	map[powerbar.x][powerbar.y].obstacle = "Powerbar";	
}
// function that removes the power bar from the map, this function is called once a power bar is purchased
function delete_power_bar(){
	remove_item_in_cell(powerbar.x,powerbar.y);
	map[powerbar.x][powerbar.y].obstacle = "None";
	powerbar.x = null;
	powerbar.y = null;
}
// this function asks the user if they want to purchase a powerbar once found
function encounter_power_bar(){
	if((eval(hero.row_coordinate) == eval(powerbar.x)) && (eval(hero.column_coordinate) == eval(powerbar.y))){
		var ask = confirm("You found a power bar! It costs one whiffle. Would you like to purchase it?");
		if(ask == true)
		{
			// if the user says they want to purchase the power bar
			// but they do not have enough whiffles, they are notified
			if(hero.whiffles == 0){
				alert("You don't have enough whiffles to purchase a power bar!");	
			}
			else{
				hero.energy += 20;	
				hero.whiffles--;
				document.getElementById("whiffles").value = hero.whiffles;
				// remove the power bar once user purchases it
				delete_power_bar();	
		}
	}
}
}
