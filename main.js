// Elementos del HTML
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const container = document.querySelector('.container');

//request
const requestPokemon = async pokemon => {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${input.value}`
        )
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
};

//FUNCIONES AUXILIARES
const isEmptyInput = () => {
    return input.value.trim() === '';
};

const isInvalidPokemon = (data) => {
    return !data;
};

const renderPokemon = (data) => {
    container.innerHTML = pokemonTemplate(data);
};

const firstMayus = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const getPokemonData = (data) => {
    return {
        pokemonName: firstMayus(data.name),
        pokemonImg: data.sprites.front_default,
        pokemonType: firstMayus(data.types[0].type.name),
        pokemonHeight: data.height/10,
        pokemonWeight: data.weight/10
    };
};

const pokemonTemplate = (data) => {
    const {
        pokemonName,
        pokemonImg,
        pokemonType,
        pokemonHeight,
        pokemonWeight
    } = getPokemonData(data);

    return `
        <h2>${pokemonName}</h2>
        <img src=${pokemonImg} alt=${pokemonName} >
        <div class="data__container">
            <div class="p__container">
                <p>Tipo:</p> <p> ${pokemonType}</p>
            </div>
            <div class="p__container">
                <p>Altura:</p> <p> ${pokemonHeight} Mts</p>
            </div>
            <div class="p__container">
                <p>Peso:</p> <p> ${pokemonWeight} Kg </p>
            </div>
        </div>
    `
};

const searchPokemon = async (e) => {
    e.preventDefault();
    //input vacio
    if (isEmptyInput()) {
        alert('Por favor ingrese un numero');
        return;
    }
    //busqueda
    const fetchedPokemon = await requestPokemon(input.value);
    //busqueda invalida
    if (isInvalidPokemon(fetchedPokemon)) {
        alert('El número ingresado no coincide con un numero de la Pokedex');
        form.reset();
        return;
    }
    //renderiza el pokemon
    renderPokemon(fetchedPokemon);
    form.reset();
}; 

//Funcion init
const init = () => {
    form.addEventListener('submit', searchPokemon);
};
init();