$(document).ready(function(){
    const theTeams = [];
    let xMen = [];
    let theAvengers = [];
    let guardiansOfTheGalaxy = [];
    let teamId = 0;
    let domString;

    const writeToDOM = (team) => {
  		for(t = 0; t < team.length; t++) {
			domString += `<div class="panel panel-default">`;
			domString += `<div class="panel-heading"><h3 class="panel-title">${team[t].name}</h3></div>`;
			domString += `<img src="${team[t].image}"/>`;
			domString += `<div class="panel-body">${team[t].description}</div>`;
			domString += `</div>`;
		}

    	$("#card-holder").append(domString);
    };

	$("#xmen-button").click((event) => {
	    console.log($(event.currentTarget));
	    hideLogo();
	    clearTeamArrays();
	    assembleXMen();
	  });

	$("#avengers-button").click((event) => {
	    console.log($(event.currentTarget));
	    hideLogo();
	    clearTeamArrays();
	    assembleAvengers();
	  });

	$("#gaurdians-button").click((event) => {
	    console.log($(event.currentTarget));
	    hideLogo();
	    clearTeamArrays();
	    assembleGuardians();
	  });

	const hideLogo = () => {
		$("#logo").addClass("hidden");
	};

	const clearTeamArrays = () => {
	    xMen = [];
    	theAvengers = [];
    	guardiansOfTheGalaxy = [];
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


    const assembleXMen = () => {
    	for (let i = 0; i < theTeams.length; i++) {
    		if (theTeams[i].name === "X-Men") {
    			teamId = theTeams[i].id;
    		}
    		if (theTeams[i].team_id === teamId){
    				xMen.push(theTeams[i]);
    		}
    	}
    	console.log("xMen", xMen); 
    	writeToDOM(xMen);
  	};

    const assembleAvengers = () => {
    	for (let m = 0; m < theTeams.length; m++) {
    		if (theTeams[m].name === "The Avengers") {
    			teamId = theTeams[m].id;
    		}
    		if (theTeams[m].team_id === teamId){
    			theAvengers.push(theTeams[m]);
    		}
    	} 
    	console.log("theAvengers", theAvengers);
    };

    const assembleGuardians = () => {
    	for (let q = 0; q < theTeams.length; q++) {
    		if (theTeams[q].name === "Guardians of the Galaxy") {
    			teamId = theTeams[q].id;
    		}
    		if (theTeams[q].team_id === teamId) {
				guardiansOfTheGalaxy.push(theTeams[q]);
    		}
    	}
    	console.log("Guardians of the Galaxy", guardiansOfTheGalaxy);
    };
    

	Promise.all([loadTeams(), loadGenders(), loadCharacters()])
	.then(function(result){
		result.forEach(function(xhrResult){
			xhrResult.forEach(function(data){
				theTeams.push(data);
			});
		});
	})
	.catch(function(errors){
		console.log(errors);
	});


});