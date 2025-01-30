"use client";
import React, { useState } from "react";
import styled from "styled-components";

// TODO (Fix): Try this guide for a hamburger menu => https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/
// You cant see the mahburger ison when the menu is open on this one
const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <HamburgerButton onClick={toggleMenu} $isOpen={isOpen}>
        <span />
        <span />
        <span />
      </HamburgerButton>
      <Menu $isOpen={isOpen}>
        <MenuItem>Home</MenuItem>
        <MenuItem>About</MenuItem>
        <MenuItem>Contact</MenuItem>
      </Menu>
    </div>
  );
};

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;

  span {
    width: 2rem;
    height: 0.25rem;
    background: black;
    border-radius: 10px;
    transition: all 0.3s linear;
    /* position: relative; */
    transform-origin: 1px;

    :first-child {
      transform: ${($isOpen) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
      transform: ${({ $isOpen }) => ($isOpen ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

const Menu = styled.nav<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: 100%;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
`;

const MenuItem = styled.a`
  font-size: 2rem;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: black;
  text-decoration: none;
  transition: color 0.3s linear;

  &:hover {
    color: gray;
  }
`;

export default HamburgerMenu;
