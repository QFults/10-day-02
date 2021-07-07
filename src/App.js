import { useState } from 'react'
import Form from './components/Form'
import Item from './components/Item'
import './App.css'

const App = () => {
  const [itemState, setItemState] = useState({
    item: '',
    items: []
  })

  const handleInputChange = ({ target }) => {
    setItemState({ ...itemState, [target.name]: target.value })
  }

  const handleAddItem = event => {
    event.preventDefault()
    const items = [...itemState.items]
    items.push({
      text: itemState.item,
      isDone: false
    })
    setItemState({ ...itemState, items, item: '' })
  }

  const handleIsDone = i => {
    const items = [...itemState.items]
    items[i].isDone = !items[i].isDone
    setItemState({ ...itemState, items })
  }

  const handleDeleteItem = i => {
    const items = [...itemState.items]
    items.splice(i, 1)
    setItemState({ ...itemState, items })
  }
  return (
    <>
      <Form
        item={itemState.item}
        handleInputChange={handleInputChange}
        handleAddItem={handleAddItem}
      />
      <div>
        {
          itemState.items.map((item, i) => (
            <Item
              key={i}
              index={i}
              item={item}
              handleIsDone={handleIsDone}
              handleDeleteItem={handleDeleteItem}
            />
          ))
        }
      </div>
    </>
  )
}

export default App
