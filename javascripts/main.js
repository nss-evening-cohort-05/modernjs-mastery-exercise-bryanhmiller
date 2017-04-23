$(document).ready(function(){
    const theTeams = [];
    let xMen = [];
    let theAvengers = [];
    let guardiansOfTheGalaxy = [];
    const emptyTeam = [];
    let teamId = 0;
    let domString;


    const writeToDOM = (team) => {
    	domString += `<div class="container"><div class="row">`;
  		for(t = 0; t < team.length; t++) {
            let gender = team[t].gender_id;
            let description = team[t].description;
            console.log(team);
			domString += `<div class="panel panel-warning">`;
			domString += `<div class="panel-heading text-center"><h3 class="panel-title">${team[t].name}</h3></div>`;
			if (gender === 0) {
                domString += `<img class="img-circle" src="${team[t].image}" alt="${team[t].name}"/>`;
                if (description === "") {
                    domString += `<div class="panel-body">abcde fghij klmno pqrst uvwxy z</div>`;                   
                }
            } else if (gender === 1) {
                domString += `<img class="img-circle boy" src="${team[t].image}" alt="${team[t].name}"/>`;                
                if (description === "") {
                    domString += `<div class="panel-body">1234567890</div>`;                   
                }
            }
            domString += `<div class="panel-body">${team[t].description}</div>`;
			domString += `</div>`;
			if ((t + 1) % 4 === 0) {
				domString += `</div><div class="row">`;
			}
		}
		domString += `</div></div>`;	

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

    const assembleXMen = () => {
        document.hide();
        for (let i = 0; i < theTeams.length; i++) {
            if (theTeams[i].name === "X-Men") {
                teamId = theTeams[i].id;
            }
            if (theTeams[i].team_id === teamId){
                    xMen.push(theTeams[i]);
            }
        }
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
        writeToDOM(theAvengers);
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
    	writeToDOM(guardiansOfTheGalaxy);
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