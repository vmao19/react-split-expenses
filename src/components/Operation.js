import {useState} from 'react';

function Operation({name, currentAnswer, parentCallback}) {
  const [inputText, setInputText] = useState(1);

  const handleInputUpdate = (event) => {
    setInputText(Number(event.target.value));
  };

  const handleClick = (operation) => {
    switch (operation) {
      case 'Add':
        parentCallback(currentAnswer + inputText);
        break;
      case 'Subtract':
        parentCallback(currentAnswer - inputText);
        break;
      case 'Multiply':
        parentCallback(currentAnswer * inputText);
        break;
      case 'Divide':
        parentCallback(currentAnswer / inputText);
        break;
      default:
        console.log('Default case.');
    }
  };

    return (
      <div>
        <input type="number" onChange={handleInputUpdate} value={inputText} />
        <button onClick={() => handleClick(name)}>{name}</button>
      </div>
    )
  
}

export default Operation