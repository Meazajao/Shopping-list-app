import React from "react"
import styled from "styled-components"
import { ShoppingItem as ItemType } from "../types"

interface Props {
  item: ItemType
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

const ShoppingItem: React.FC<Props> = ({ item, onToggle, onRemove }) => {
  return (
    <ItemRow bought={item.bought}>
      <Text onClick={() => onToggle(item.id)} title={item.text}>
        {item.text}
      </Text>
      <RemoveBtn onClick={() => onRemove(item.id)}>❌</RemoveBtn>
    </ItemRow>
  )
}

export default ShoppingItem

const ItemRow = styled.div<{ bought: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  margin: 0.4rem 0;
  background: ${({ bought }) => (bought ? "#FFFACD" : "#fff")};
  text-decoration: ${({ bought }) => (bought ? "line-through" : "none")};
  border-left: 6px solid ${({ bought }) => (bought ? "#FFD700" : "#FFB6C1")};
  border-radius: 12px;
  font-size: 1rem;
  color: #5D1049;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
`

const Text = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 10px;
  cursor: pointer;
`

const RemoveBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #5D1049;
  cursor: pointer;
  margin-left: 12px;
`
