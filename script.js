async function getMatches(){
    const file = "./worldcup.json";

    try{
        const response = await fetch(file);

        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    }
    catch(error){
        console.error(error.message);
    }
}