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


function addSelectedClass(buttonIdName){
    const buttons = document.querySelectorAll("#sort-buttons button");
    const selectedButton = document.getElementById(buttonIdName);

    try{
        buttons.forEach((element) => element.classList.remove("is-selected"));
        selectedButton.classList.add("is-selected");
    }
    catch(error){
        console.error(error);
    }

}


function displayAllMatches(matchesData){
    const buttons = document.querySelectorAll(".match-button");

    buttons.forEach((element) => element.classList.remove("is-hidden"));
}


function fillMatchInfoButtons(matchesData, id){
    const team1Button = document.getElementById("#team1");
    const team2Button = document.getElementById("#team2");

    team1Button.innerText = `${matchesData[id].team1}`;
    team2Button.innerText = `${matchesData[id].team2}`;

}


function createMatchButtons(matchesData){
    const buttonsWrapper = document.getElementById("matches-button-wrap");

    let id = 0;
    for(const match of matchesData.matches){
        match.id = id++;
        let button = document.createElement("button");
        button.innerHTML = `
        <span class="match-button-teams">${match.team1} vs ${match.team2}</span>
        <span class="match-button-score">${match.score.ft[0]} - ${match.score.ft[1]}</span>
        `;
        button.classList.add("match-button");
        buttonsWrapper.appendChild(button);
    }
}

function showUserInput(userInput){
    try{    
        const matchButtons = document.querySelectorAll(".match-button");
        if(!userInput){
            matchButtons.forEach((element) => element.classList.remove("is-hidden"));    
            return;
        }
        const userInputLower = userInput.toLowerCase();

        for(const btn of matchButtons){
            if(!btn.textContent.toLowerCase().includes(userInputLower)){
                btn.classList.add("is-hidden");
            }
            else{
                btn.classList.remove("is-hidden");
            }
        }
    }catch(error){
        console.error(error);
    }
}


async function mainFunc(){
    try{
        const results = await getMatches();
        createWorldCupButton(results);
        createMatchButtons(results);

        //showUserInput("Czech");


        document.getElementById("group-stage-button").addEventListener("click", ()=>{
            displayGroupStageMatches(results);
            addSelectedClass("group-stage-button");
        });

        document.getElementById("knockout-button").addEventListener("click", () =>{
            displayKnockoutsMatches(results);
            addSelectedClass("knockout-button");
        });

        document.getElementById("all-button").addEventListener("click", () =>{
            displayAllMatches(results);
            addSelectedClass("all-button");
        });

        const input = document.querySelector('input[type="search"]');

        document.getElementById("search-input").addEventListener("search", (e) => {
            showUserInput(input.value);
        });

        document.querySelectorAll(".match-button").forEach((button) => {
            button.addEventListener("click", (event) => {
                const matchId = event.currentTarget.id; 
                window.location.href = `match_info.html?id=${matchId}`;
                
            });
        });

        }
    catch(error){
        console.error(error.message);
        }
    }

mainFunc();