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
    <Row bought={item.bought}>
      <Check
        type="button"
        onClick={() => onToggle(item.id)}
        aria-pressed={item.bought}
        aria-label={item.bought ? "Markera som ej köpt" : "Markera som köpt"}
        title={item.bought ? "Ångra" : "Klar"}
      >
        {item.bought ? "✓" : "○"}
      </Check>

      <Text
        type="button"
        onClick={() => onToggle(item.id)}
        title={item.text}
        bought={item.bought}
      >
        {item.text}
      </Text>

      <Remove
        type="button"
        onClick={() => onRemove(item.id)}
        aria-label="Ta bort vara"
        title="Ta bort"
      >
        ✕
      </Remove>
    </Row>
  )
}

export default ShoppingItem

const Row = styled.li<{ bought: boolean }>`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  gap: 10px;

  padding: 10px 10px;
  border-radius: 14px;

  background: ${({ bought }) =>
    bought ? "rgba(255, 250, 205, 0.55)" : "rgba(255, 255, 255, 0.70)"};
  border: 1px solid rgba(93, 16, 73, 0.12);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);

  transition: transform 0.12s ease, filter 0.2s ease;

  &:hover {
    filter: brightness(1.02);
  }
`

const Check = styled.button`
  height: 34px;
  width: 34px;
  border-radius: 12px;
  border: 1px solid rgba(93, 16, 73, 0.16);
  background: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  font-weight: 800;
  color: #3f0b31;

  &:active { transform: translateY(1px); }
`

const Text = styled.button<{ bought: boolean }>`
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;

  color: ${({ bought }) => (bought ? "rgba(63, 11, 49, 0.55)" : "#3f0b31")};
  text-decoration: ${({ bought }) => (bought ? "line-through" : "none")};
  font-size: 14px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Remove = styled.button`
  height: 34px;
  width: 34px;
  border-radius: 12px;
  border: 1px solid rgba(93, 16, 73, 0.14);
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  color: rgba(63, 11, 49, 0.85);
  font-size: 16px;

  &:hover {
    border-color: rgba(255, 77, 109, 0.45);
  }
  &:active { transform: translateY(1px); }
`
