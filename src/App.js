import './App.css';
import { useReducer, useState } from 'react';

const initialState = {
  items: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      let updatedState = {
        ...state,
        items: [...state.items, action.payload]
      };
      return updatedState;
    case 'update':
      var updateItem = [...state.items].find((x) => x.id === action.payload.id);
      if (updateItem) {
        return {
          ...state,
          items: [...state.items].map((x) => x.id === updateItem.id ? action.payload : x)
        }
      }

      else {
        return { ...state, items: [...state.items, action.payload] }
      }

    case 'delete':
      let filteredState = {
        ...state,
        items: [...state.items].filter((x) => x.id !== action.payload)
      };
      return filteredState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [update, setUpdate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'add',
      payload: {
        id: new Date().getTime(),
        name: input
      }
    })
    setInput('');
  }

  const handleUpdate = (item) => {
    dispatch({
      type: 'update',
      payload: {
        id: item.id,
        name: updateInput
      }
    })
    setUpdateInput('');
    setUpdate(false);
  }

  return (
    <div className="App container">
      <h1>Shopping Cart</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='btn' type="submit">Add item</button>
      </form>

      <div>
        {state && state.items.map((item, index) => (
          <div key={index} className='items_container'>

            <span>{index + 1}. {item.name}</span>&nbsp;&nbsp;
            {update ? <>
              <input type="text" value={updateInput} onChange={(e) => setUpdateInput(e.target.value)} />
              <button className='btn' onClick={() => handleUpdate(item)}>Update</button>
            </> :
              <button className='btn' onClick={() => setUpdate(true)}>edit</button>}&nbsp;&nbsp;
            <button className="btn" onClick={() => dispatch({ type: 'delete', payload: item.id })}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
