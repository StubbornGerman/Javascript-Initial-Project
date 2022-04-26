
//placeholder variable for fetch data
let characterList = [];

//waits until fetch is completed and displays the characters
dataFetch().then(() => {
  characterList.forEach((character) => displayCharacter(character));
});

//While searching, limits results based on matching text.
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", () => {
  let input = searchInput.value;
  document.querySelectorAll(".character-card").forEach((card) => {
    if (card.getAttribute("name").match(input)) {
      card.removeAttribute("hidden");
    } else {
      card.setAttribute("hidden", "true");
    }
  });
});

//Initial API fetch. Sets characterList variable to response data.
function dataFetch() {
  return fetch("https://raw.githubusercontent.com/KostaSav/hp-api/master/data/characters.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      characterList = data;
    });
}
//Weeeeee Testing
//Creates HTML elements to display character info. 
function displayCharacter(character) {
  //console.log(character);
  //console.log(character.name);
  const characterCard = document.createElement("div");
  characterCard.classList.add("character-card");
  
  // Setting the name attribute so we are able to filter cards. 
  characterCard.setAttribute("name", character.name);
  
  //Modify the string to pull in correct image file from JSON file instead of API. 

  const image = character.image.replace("http://hp-api.herokuapp.com", "https://raw.githubusercontent.com/KostaSav/hp-api/master/public/" )
//console.log(image)

  //Assigning class tags so they can be executed against in our CSS file. 
  characterCard.innerHTML = `
    <h2>${character.name}</h2>
    <p class="house"><strong>House:</strong> ${character.house}</p>
    <p class="ancestry"><strong>Ancestry:</strong> ${character.ancestry}</p>
    <p class="patronus"><strong>Patronus: </strong> ${character.patronus}</p>
    <p class="image"><strong>Picture: </strong></p>
    <img class="picSize" src="${image}" alt="${character.name}">
    `;


// Adds the character cards to the body of the HTML page. 
  document.body.append(characterCard);

  //Creates favorite cards when clicked. Toggles this value. 
  characterCard.addEventListener("click", () => {
    characterCard.classList.toggle("favorite");
  });
}
//For Future: Create a container element for the character cards, rather then appending them to the body. 
//For Future: Add character portraits. 👍
// Persist data through page refreshes.



