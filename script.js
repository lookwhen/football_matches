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

function printMatches(data){
    console.log(data["name"]);
    for(const match of data["matches"]){
        console.log(`${match.team1} -- ${match.team2}`);
    }
}

function createWorldCupButton(data){
    document.querySelector(".world-cup--text").textContent = data.name;
}

async function mainFunc(){
    try{
        const results = await getMatches();
        printMatches(results);
        createWorldCupButton(results);
        }
    catch(error){
        console.error(error.message);
        }
    }

mainFunc();