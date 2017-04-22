$(document).ready(function(){
    const theTeams = [];

    const writeToDOM = (theTeams) => {

    }

	$("#xmen-button").click((event) => {
	    console.log($(event.currentTarget));
	    hideLogo();
	  });

	$("#avengers-button").click((event) => {
	    console.log($(event.currentTarget));
	    hideLogo();
	  });

	$("#gaurdians-button").click((event) => {
	    console.log($(event.currentTarget));
	    hideLogo();
	  });

	const hideLogo = () => {
		$("#logo").addClass("hidden");
	};


    const loadTeams = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./db/teams.json")
            .done((data1) => resolve(data1.teams))
            .fail((error1) => reject(error1));
        });
    };

    const loadGenders = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./db/genders.json")
            .done((data1) => resolve(data1.genders))
            .fail((error1) => reject(error1));
        });
    };

    const loadCharacters = () => {
        return new Promise((resolve, reject) => {
            $.ajax("./db/characters.json")
            .done((data1) => resolve(data1.characters))
            .fail((error1) => reject(error1));
        });
    };

	// const checkForTypeMatch = function(human, pet) {
	// 	const interestedInArray = human["interested-in"];
	// 	const isMatchNumber = interestedInArray.indexOf(pet.type);
	// 	if (isMatchNumber === -1) {
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// 	return isMatch;
	// };

	// const checkForKidFriendly = function(human, pet) {
	// 	const hasKids = human["has-kids"];
	// 	const isKidFriendly = pet["kid-friendly"];
	// 	let isMatched = true;
	// 	if (hasKids && !isKidFriendly) {
	// 		isMatched = false;
	// 	}
	// 	return isMatched;
	// };


    const assembleXMen = (team, characters) => {
    	if (theTeams.name === "X-Men"){
    		let teamId = theTeams.id
    		console.log(teamId);
    	}
    	console.log(teamId);
    }

    const assembleAvengers = () => {
    	
    }

    const assembleGuardians = () => {
    	
    }
    

	Promise.all([loadTeams(), loadGenders(), loadCharacters()])
	.then(function(result){
		console.log("result", result);
		theTeams.push(result);
		console.log("theTeams", theTeams);
		writeToDOM(theTeams);
	})
	.catch(function(errors){
		console.log(errors);
	});


});