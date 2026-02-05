import React, { FC } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const HamburgerButton: FC<Props> = ({ setIsHamburgerMenuOpen, isHamburgerMenuOpen }) => {
  const clickHandler = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  return (
    <>
      <Container onClick={() => clickHandler()} $isOpen={isHamburgerMenuOpen}>
        <Burger $isOpen={isHamburgerMenuOpen} $position="top" />
        <Burger $isOpen={isHamburgerMenuOpen} $position="middle" />
        <Burger $isOpen={isHamburgerMenuOpen} $position="bottom" />
      </Container>
    </>
  );
};

export default HamburgerButton;

type Props = {
  setIsHamburgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHamburgerMenuOpen: boolean;
};

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.375rem;

  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  cursor: pointer;
  z-index: 100;

  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%);
    border-color: rgba(74, 222, 128, 0.3);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(74, 222, 128, 0.1);
    animation: ${pulse} 0.6s ease-in-out;
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(30, 41, 59, 0.9) 100%);
    border-color: rgba(74, 222, 128, 0.4);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(74, 222, 128, 0.2);
  `}
`;

const Burger = styled.div<{ $isOpen: boolean; $position: "top" | "middle" | "bottom" }>`
  width: 1.5rem;
  height: 0.125rem;
  border-radius: 2px;
  background-color: white;
  transform-origin: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${({ $isOpen, $position }) => {
    if (!$isOpen) return "";

    switch ($position) {
      case "top":
        return `
          transform: translateY(0.5rem) rotate(45deg);
          background-color: #4ade80;
        `;
      case "middle":
        return `
          opacity: 0;
          transform: scaleX(0);
        `;
      case "bottom":
        return `
          transform: translateY(-0.5rem) rotate(-45deg);
          background-color: #4ade80;
        `;
      default:
        return "";
    }
  }}
`;
