import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { ShoppingItem as ItemType } from "./types"
import ShoppingItem from "./components/ShoppingItem"

const STORAGE_KEY = "shoppingItems"

const App: React.FC = () => {
  const [items, setItems] = useState<ItemType[]>([])
  const [input, setInput] = useState("")

  // Load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setItems(JSON.parse(saved))
  }, [])

  // Save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const stats = useMemo(() => {
    const total = items.length
    const done = items.filter(i => i.bought).length
    return { total, done, left: total - done }
  }, [items])

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return

    const newItem: ItemType = {
      id: crypto.randomUUID(),
      text,
      bought: false,
    }

    setItems(prev => [newItem, ...prev])
    setInput("")
  }

  const toggleBought = (id: string) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, bought: !item.bought } : item))
    )
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Page>
      <Card>
        <Header>
          <Title>🛒 Min inköpslista</Title>
          <SubTitle>
            {stats.total === 0
              ? "Lägg till första varan ✨"
              : `${stats.left} kvar • ${stats.done} klara`}
          </SubTitle>
        </Header>

        <InputRow onSubmit={handleAdd}>
          <Input
            type="text"
            placeholder="Lägg till vara…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Lägg till vara"
          />
          <AddButton type="submit" disabled={!input.trim()}>
            Lägg till
          </AddButton>
        </InputRow>

        {items.length === 0 ? (
          <EmptyState>
            <EmptyTitle>Tomt än så länge</EmptyTitle>
            <EmptyText>Skriv något ovan och tryck Enter.</EmptyText>
          </EmptyState>
        ) : (
          <List aria-label="Inköpslista">
            {items.map(item => (
              <ShoppingItem
                key={item.id}
                item={item}
                onToggle={toggleBought}
                onRemove={removeItem}
              />
            ))}
          </List>
        )}
      </Card>
    </Page>
  )
}

export default App

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 28px 16px;
`

const Card = styled.div`
  width: min(560px, 100%);
  padding: 22px;
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(93, 16, 73, 0.12);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(14px);
`

const Header = styled.div`
  display: grid;
  gap: 6px;
  margin-bottom: 16px;
  text-align: center;
`

const Title = styled.h1`
  font-size: 20px;
  letter-spacing: 0.2px;
  color: #3f0b31;
`

const SubTitle = styled.p`
  font-size: 13px;
  color: rgba(63, 11, 49, 0.72);
`

const InputRow = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  margin-bottom: 14px;
`

const Input = styled.input`
  height: 44px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(93, 16, 73, 0.18);
  background: rgba(255, 255, 255, 0.75);
  color: #3f0b31;
  font-size: 14px;

  &::placeholder {
    color: rgba(63, 11, 49, 0.55);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 105, 180, 0.6);
    box-shadow: 0 0 0 4px rgba(255, 105, 180, 0.18);
  }
`

const AddButton = styled.button`
  height: 44px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 105, 180, 0.35);
  background: linear-gradient(180deg, rgba(255, 105, 180, 0.95), rgba(255, 105, 180, 0.75));
  color: #2b0822;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.08s ease, filter 0.2s ease, opacity 0.2s ease;

  &:hover { filter: brightness(1.03); }
  &:active { transform: translateY(1px); }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: grid;
  gap: 10px;
`

const EmptyState = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 14px;
  border: 1px dashed rgba(93, 16, 73, 0.22);
  background: rgba(255, 255, 255, 0.45);
  text-align: center;
`

const EmptyTitle = styled.div`
  font-weight: 700;
  color: #3f0b31;
`

const EmptyText = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: rgba(63, 11, 49, 0.7);
`
