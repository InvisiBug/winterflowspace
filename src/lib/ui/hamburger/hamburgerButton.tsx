import React, { FC } from "react";
import styled from "@emotion/styled";
import { mq, px } from "src/lib/mediaQueries";

import Link from "next/link";

const HamburgerButton: FC<Props> = ({ setIsHamburgerMenuOpen, isHamburgerMenuOpen }) => {
  const clickHandler = () => {
    console.log("clicked");
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  return (
    <>
      <Container onClick={() => clickHandler()}>
        <Burger />
        <Burger />
        <Burger />
      </Container>
    </>
  );
};

export default HamburgerButton;

type Props = {
  setIsHamburgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHamburgerMenuOpen: boolean;
};

const borders = false;

const Container = styled.div`
  position: fixed;
  border: ${borders ? "1px solid greenyellow" : "none"};
  width: 4rem;
  height: 4rem;

  padding-top: 2rem;
  padding-left: 2rem;

  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 100000;
`;

const Burger = styled.div`
  width: 2rem;
  height: 0.25rem;
  border-radius: 10px;
  background-color: white;
  /* transform-origin: 1px; */
  /* transition: all 0.3s linear; */
`;
