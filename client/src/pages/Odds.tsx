import { useState } from "react";
import { useLoaderData } from "react-router-dom";

interface Outcome {
  name: string;
  price: number;
}

interface Market {
  key: string;
  outcomes: Outcome[];
}

interface Bookmaker {
  key: string;
  markets: Market[];
}

interface Odd {
  id: number;
  away_team: string;
  home_team: string;
  bookmakers: Bookmaker[];
}

export default function Odds() {
  const odds = useLoaderData() as Odd[];
  const [selectedOdds, setSelectedOdds] = useState<
    { name: string; price: number }[]
  >([]);

  if (!odds || odds.length === 0) {
    return <p>No odds for the moment</p>;
  }

  const totalOdds =
    selectedOdds.length > 0
      ? selectedOdds.reduce((total, odd) => total * odd.price, 1)
      : 0;

  const handleSelectOdd = (outcome: Outcome) => {
    setSelectedOdds((prevOdds) => {
      if (prevOdds.some((odd) => odd.name === outcome.name)) {
        return prevOdds.filter((odd) => odd.name !== outcome.name);
      }
      return [...prevOdds, outcome];
    });
  };

  return (
    <>
      {odds.map((odd) => {
        const firstBookmaker = odd.bookmakers[0];
        const firstMarket = firstBookmaker?.markets[0];
        const outcomes = firstMarket?.outcomes || [];

        if (outcomes.length < 2) {
          return (
            <div key={odd.id}>
              <h2>
                {odd.home_team} vs {odd.away_team}
              </h2>
              <p>No odds for the moment</p>
            </div>
          );
        }

        return (
          <div key={odd.id}>
            <h2>
              {odd.home_team} vs {odd.away_team}
            </h2>
            {outcomes.map((outcome) => (
              <label key={outcome.name}>
                <input
                  type="checkbox"
                  onChange={() => handleSelectOdd(outcome)}
                  checked={selectedOdds.some(
                    (odd) => odd.name === outcome.name,
                  )}
                />{" "}
                {outcome.name} - {outcome.price}
              </label>
            ))}
          </div>
        );
      })}

      {selectedOdds.length > 0 && (
        <div>
          <h3>Your odds :</h3>
          <ul>
            {selectedOdds.map((odd) => (
              <li key={odd.name}>
                {odd.name}: {odd.price}
              </li>
            ))}
          </ul>
          <p>Total Odds : {totalOdds.toFixed(2)}</p>
        </div>
      )}
    </>
  );
}
