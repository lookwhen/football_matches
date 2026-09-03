async function getMatches(){
    const file = "./worldcup.json";

    try{
        const response = await fetch(file);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    }
    catch(error){
        console.error(error.message);
    }
}

function printMatches(matchesData){
    console.log(matchesData["name"]);
    for(const match of matchesData["matches"]){
        console.log(`${match.team1} -- ${match.team2}`);
    }
}

function createWorldCupButton(matchesData){
    document.querySelector(".world-cup--text").textContent = matchesData.name;
}

function displayGroupStageMatches(matchesData){
    const buttons = document.querySelectorAll(".match-button");
    
    for(let i = 0; i < buttons.length; i++){
        const match = matchesData.matches[i];

        if(match){
            if(!match.round.includes("Matchday")){
                buttons[i].classList.add("is-hidden");
            }
            else{
                buttons[i].classList.remove("is-hidden");
            }
        }
    }
}

function displayKnockoutsMatches(matchesData){
    const buttons = document.querySelectorAll(".match-button");
    
    for(let i = 0; i < buttons.length; i++){
        const match = matchesData.matches[i];

        if(match){
            if(match.round.includes("Matchday")){
                buttons[i].classList.add("is-hidden");
            }
            else{
                buttons[i].classList.remove("is-hidden");
            }
        }
    }
}

function createMatchButtons(matchesData){
    const buttonsWrapper = document.getElementById("matches-button-wrap");

    for(const match of matchesData.matches){
        let button = document.createElement("button");
        button.innerText = `${match.team1}  ${match.score.ft[0]} - ${match.score.ft[1]}  ${match.team2}`;
        button.classList.add("match-button");
        buttonsWrapper.appendChild(button);
    }
}

async function mainFunc(){
    try{
        const results = await getMatches();
        printMatches(results);
        createWorldCupButton(results);
        createMatchButtons(results);

        document.getElementById("group-stage-button").addEventListener("click", ()=>{
            displayGroupStageMatches(results);
        });

        document.getElementById("knockout-button").addEventListener("click", () =>{
            displayKnockoutsMatches(results);
        });

        }
    catch(error){
        console.error(error.message);
        }
    }

mainFunc();