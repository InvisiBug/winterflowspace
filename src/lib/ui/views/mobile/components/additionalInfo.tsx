import React, { FC } from "react";
import styled from "styled-components";
import { freeColour, partiallyFreeColour, busyColour } from "@/lib/colours";

const AdditionalInfo: FC<Props> = ({ isOpen, intervals }) => {
  return (
    <Container $open={isOpen}>
      {intervals.map((val, index) => {
        return (
          <Indicator key={index} $val={val}>
            {val === 1 ? "X" : null}
          </Indicator>
        );
      })}
    </Container>
  );
};

export default AdditionalInfo;

type Props = {
  isOpen: boolean;
  intervals: number[];
};

const Container = styled.div<{ $open?: boolean }>`
  display: ${(props) => (props.$open ? "flex" : "none")};

  /* display: flex; */
  margin: 0.5rem 1rem;

  justify-content: space-around;

  /* transition: all 0.3s linear;
  height: ${({ $open }) => (!$open ? "100%" : "0")};

  transform: ${({ $open }) => ($open ? "translateY(0)" : "translateY(-50px)")};
  opacity: ${({ $open }) => ($open ? "0" : "1")}; */
`;

const Indicator = styled.h1<{
  $val?: number;
}>`
  background-color: ${(props) => (props.$val === 0 ? freeColour : busyColour)};
  border: 1px solid black;

  width: 2rem;
  height: 2rem;
  border-radius: 1rem;

  justify-content: center;

  display: flex;
  align-items: center;
`;
