import { useEffect, useState } from "react"

type ListProps = {
    initialItems: string [];
}

function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = useState('')
  const [items, setList] = useState<string[]>(initialItems);

  useEffect(() =>{
    setList(initialItems)
  },[initialItems])

  function addToList() {
    setTimeout(() => {
      setList(state => [...state, newItem]);
    }, 500);
  }

  function removeFromList(element: string){
    setTimeout(() => {
      setList(state => state.filter(item => item !== element));
    }, 500);
  }

  return (
    <>
      <input placeholder="Novo item" value={newItem} onChange={e => setNewItem(e.target.value)}/>
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {items.map((item)=> (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List;