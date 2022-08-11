import { useState } from "react";

const Character = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>{props.character.name}</div>
      <div style={{ display: isOpen ? "block" : "none" }}>
        {props.character.details}
      </div>
      <div>
        <button onClick={toggleDetails}>
          {isOpen ? "Show less" : "Show more"}
        </button>
      </div>
      <br />
    </div>
  );
};

export default Character;
