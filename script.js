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

    for(const match of data["matches"]){
        console.log(`${match.team1} -- ${match.team2}`);
    }
}

async function mainFunc(){
    const results = await getMatches();
    printMatches(results);
}