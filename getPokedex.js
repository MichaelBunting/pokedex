const fetch = require("node-fetch");

const averageArray = (array) => {
  return array.reduce((a, b) => a + b) / array.length;
}

const fetchPokemonData = async (index) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
  const pokemon = await response.json();
  const filteredPokemonData = {
    name: pokemon.name,
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name,
      stat: stat.base_stat,
    }))
  };

  return filteredPokemonData;
}

const averageStats = (pokemon) => {
  const stats = {};

  for (pokeman of pokemon) {
    for (stat of pokeman.stats) {
      if (!stats[stat.name]) {
        stats[stat.name] = [];
      }

      stats[stat.name].push(stat.stat);
    }
  }

  return Object.entries(stats).map(([name, stats]) => {
    return {
      name,
      stat: averageArray(stats),
    }
  });
};

module.exports = async (numberOfPokemon) => {
  const pokemon = [];
  const pokemonCount = [...Array(numberOfPokemon).keys()];

  for (pokemonIndex of pokemonCount) {
    const pokemonData = await fetchPokemonData(pokemonIndex + 1);
    pokemon.push(pokemonData);
  }

  pokemon.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const statsAverage = averageStats(pokemon);

  return {
    pokemon: pokemon,
    averages: statsAverage,
  };
}