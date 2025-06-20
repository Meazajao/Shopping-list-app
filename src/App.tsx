import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ShoppingItem as ItemType } from "./types"
import ShoppingItem from "./components/ShoppingItem"

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("shoppingItems")
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shoppingItems", JSON.stringify(items))
  }, [items])

  const handleAdd = () => {
    if (input.trim() === "") return
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      text: input,
      bought: false,
    }
    setItems([newItem, ...items])
    setInput("")
  }

  const toggleBought = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, bought: !item.bought } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <Container>
      <h1>🛒 Min Inköpslista</h1>
      <InputRow>
        <Input
          type="text"
          placeholder="Lägg till vara..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <AddButton onClick={handleAdd}>Lägg till</AddButton>
      </InputRow>

      {items.map(item => (
        <ShoppingItem
          key={item.id}
          item={item}
          onToggle={toggleBought}
          onRemove={removeItem}
        />
      ))}
    </Container>
  )
}

export default App

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #FFF0F5;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  @media (max-width: 600px) {
    margin: 1rem;
    padding: 1rem;
  }

  h1 {
    text-align: center;
    color: #5D1049;
    margin-bottom: 1.5rem;
  }
`

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
`

const Input = styled.input`
  flex: 1;
  padding: 0.6rem;
  border: 2px solid #FFD700;
  border-radius: 10px;
  font-size: 1rem;
`

const AddButton = styled.button`
  background: #FFB6C1;
  color: #5D1049;
  font-weight: bold;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #FF69B4;
  }
`
