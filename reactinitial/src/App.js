import React, { useEffect, useRef, useState } from "react";
import Character from "./components/Character";
import LoadingMask from "./components/LoadingMask";
import Subscription from "./components/Subscription";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [subscriptionIsOpen, setSubscriptionIsOpen] = useState(false);
  const counter = useRef(0);

  useEffect(() => {
    fetch(`https://demoapi.com/api/series/howimetyourmother`)
      .then((rawData) => rawData.json())
      .then((parsedData) => {
        setCharacters(parsedData);

        const counterInterval = setInterval(() => {
          console.log(counter.current);

          if (counter.current === 10) {
            clearInterval(counterInterval);
            setSubscriptionIsOpen(true);
          }

          counter.current++;
        }, 1000);

        return () => {
          clearInterval(counterInterval);
        };
      });
  }, []);

  return (
    <>
      {characters.length === 0 ? (
        <LoadingMask />
      ) : (
        characters.map((character, index) => (
          <Character
            key={"characterDetails" + index}
            character={character}
          ></Character>
        ))
      )}

      {subscriptionIsOpen ? (
        <Subscription setSubscriptionIsOpen={setSubscriptionIsOpen} />
      ) : null}
    </>
  );
};

export default App;
