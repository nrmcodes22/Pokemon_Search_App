const searchinput=document.getElementById("search-input");
const searchBtn=document.getElementById("search-button");
const pokename=document.getElementById("pokemon-name");
const pokeid=document.getElementById("pokemon-id");
const weight=document.getElementById("weight");
const height=document.getElementById("height");
const types=document.getElementById("types");
const hp=document.getElementById("hp");
const attack=document.getElementById("attack");
const defense=document.getElementById("defense");
const specialdef=document.getElementById("special-defense");
const specialat=document.getElementById("special-attack");
const speed=document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

const getPokemon=async ()=>{
    try {
      const pokeNameOrId=searchinput.value.toLowerCase();
      console.log(pokeNameOrId);
      const response=await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeNameOrId}`,
      ) ;
      const data=await response.json();
      pokename.textContent=`${data.name.toUpperCase()}`;
      pokeid.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front_default sprite">
    `;

    // Set stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialat.textContent = data.stats[3].base_stat;
    specialdef.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set types
    types.innerHTML = data.types
      .map(
        (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`,
      )
      .join("");

    }
    catch (err) {
        resetDisplay();
        alert("Pokémon not found");
        console.log(`Pokémon not found: ${err}`);
      }
};
const resetDisplay = () => {
    const sprite = document.getElementById("sprite");
    if (sprite) sprite.remove();
  
    // reset stats
    pokename.textContent = "";
    pokeid.textContent = "";
    types.innerHTML = "";
    height.textContent = "";
    weight.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialat.textContent = "";
    specialdef.textContent = "";
    speed.textContent = "";
  };
searchBtn.addEventListener('click',getPokemon);