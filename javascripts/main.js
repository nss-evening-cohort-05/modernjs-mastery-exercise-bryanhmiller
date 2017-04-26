$(document).ready(function(){
    const theTeams = [];
    let xMen = [];
    let theAvengers = [];
    let guardiansOfTheGalaxy = [];
    const emptyTeam = [];
    let teamId = 0;
    let domString;


// The writeDom function should write everything to the DOM
    const writeToDOM = (team) => {
        domString = "";
        
// Each row should have a bootstrap row class
        domString += `<div class="container"><div class="row">`;
        for(t = 0; t < team.length; t++) {
            let gender = team[t].gender_id;
// If there is no description for a character (ie description is "") your code should change the description 
// as follows:
            let description = team[t].description;
// Each character should be displayed in a bootstrap panel
            domString += `<div class="panel panel-warning">`;
            domString += `<div class="panel-heading text-center"><h3 class="panel-title">${team[t].name}</h3></div>`;
// Each character's image should be a circle and have a border color of:
// Pink if the character is Female
            if (gender === 0) {
                domString += `<img class="img-circle" src="${team[t].image}" alt="${team[t].name}"/>`;
// A female character with no description should get a description of "abcde fghij klmno pqrst uvwxy z"
                if (description === "") {
                    domString += `<div class="panel-body">abcde fghij klmno pqrst uvwxy z</div>`;                   
                }
// Each character's image should be a circle and have a border color of:
// Blue if the character is Male
            } else if (gender === 1) {
                domString += `<img class="img-circle boy" src="${team[t].image}" alt="${team[t].name}"/>`;                
// A male character with no description should get a description of "1234567890"
                if (description === "") {
                    domString += `<div class="panel-body">1234567890</div>`;                   
                }
            }
            domString += `<div class="panel-body">${team[t].description}</div>`;
            domString += `</div>`;
// There should be 4 panels in each row
            if ((t + 1) % 4 === 0) {
// Each row should have a bootstrap row class
                domString += `</div><div class="row">`;
            }
        }
        domString += `</div></div>`;    
        $("#card-holder").html(domString);
    };


// The click event should call a function called dataGetter that has a Promise.all
    $("#xmen-button").click((event) => {
        hideLogo();
        clearTeamArrays();
        assembleXMen();
      });

    $("#avengers-button").click((event) => {
        hideLogo();
        clearTeamArrays();
        assembleAvengers();
      });

    $("#gaurdians-button").click((event) => {
        hideLogo();
        clearTeamArrays();
        assembleGuardians();
      });

// On click of a button in the navbar
// The large Marvel logo should go away (use a jQuery method for this)
    const hideLogo = () => {
        $("#logo").addClass("hidden");
    };

    const clearTeamArrays = () => {
        xMen = [];
        theAvengers = [];
        guardiansOfTheGalaxy = [];
        // document.hide();
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
    

// The Promise.all should resolve 3 functions that get the data from the json files
// dataGetter should pass a SINGLE array to the writeDom function
	Promise.all([loadTeams(), loadGenders(), loadCharacters()])
	.then((result) => {
		result.forEach((xhrResult) => {
			xhrResult.forEach((data) => {
				theTeams.push(data);
			});
		});
	})
	.catch(function(errors){
		console.log(errors);
	});


});