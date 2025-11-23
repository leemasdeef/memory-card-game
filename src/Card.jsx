import { useState, useEffect } from "react";

export default function Card() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [allFlipped, setAllFlipped] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      const ids = getRandomPokemonIds(18);
      const promises = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
          response.json()
        )
      );

      const results = await Promise.all(promises);
      //   add 'clicked' prop to track clicked pokemon
      const pokemonWithClicked = results.map((p) => ({ ...p, clicked: false }));
      setPokemon(pokemonWithClicked);
    };

    fetchPokemon();
  }, []);

  //   shuffle after every card click
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (id) => {
    // Flip all cards
    setAllFlipped(true);

    // Wait for flip animation, then process game logic
    setTimeout(() => {
      let alreadyClicked = false;

      const updatedPokemon = pokemon.map((p) => {
        if (p.id === id) {
          if (p.clicked) {
            alreadyClicked = true;
          }
          return { ...p, clicked: true };
        } else {
          return p;
        }
      });

      if (alreadyClicked) {
        // Reset if the card was already clicked
        alert("Oops! You clicked this Pokémon before. Score reset.");
        setScore(0);
        setPokemon((prev) => prev.map((p) => ({ ...p, clicked: false })));
        window.location.reload();
      } else {
        // Increment score
        setScore((score) => score + 1);

        if (score + 1 === 18) {
          alert("Congratulations! You won!");
          setScore(0);
          setPokemon((prev) => prev.map((p) => ({ ...p, clicked: false })));
          window.location.reload();
        } else {
          // Shuffle the cards after each correct click
          setPokemon(shuffleArray(updatedPokemon));
        }
      }

      // Flip all cards back after processing
      setTimeout(() => {
        setAllFlipped(false);
      }, 100);
    }, 600);
  };

  return (
    <>
      <div className="flex gap-4 ml-auto mr-auto md:py-4 bg-blue-400 rounded-xl shadow-black shadow-sm w-50">
        <p className="p-3">Score: {score}</p>
        <p className="p-3">Target: 18</p>
      </div>

      <div className="flex justify-center">
        <div className="w-full grid grid-cols-3 md:grid-cols-6 md:gap-4 bg-gradient-to-bl from-red-600 to-blue-500 rounded-md opacity-95 max-w-7xl p-2 md:p-8">
          {pokemon.map((p) => (
            <div
              key={p.id}
              onClick={() => handleCardClick(p.id)}
              className="relative cursor-pointer h-30 md:h-48"
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-full h-30  md:h-full transition-transform duration-700"
                style={{
                  transformStyle: "preserve-3d",
                  transform: allFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute inset-0 border rounded p-4 bg-violet-200 hover:bg-blue-200 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={p.sprites.front_default}
                    alt={p.name}
                    className="size-full md:w-full"
                  />
                  <p className="text-center text-xs md:text-base capitalize mt-2">
                    {p.name}
                  </p>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 border rounded p-4 bg-gradient-to-bl from-red-600 to-blue-500 flex items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <p className="text-white text-center font-bold text-2xl">?</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// randomise gen 1 pokemon
function getRandomPokemonIds(count) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 151) + 1);
  }
  return Array.from(ids);
}
