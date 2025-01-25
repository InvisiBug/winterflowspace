import React, { FC } from "react";
import styled from "styled-components";

const AdditionalInfo: FC<Props> = ({ isOpen, intervals }) => {
  console.log(isOpen);
  return (
    <>
      <Container $open={isOpen}>
        {intervals.map((val, index) => {
          return <Indicator key={index} $val={val}></Indicator>;
        })}
      </Container>
    </>
  );
};

export default AdditionalInfo;

type Props = {
  isOpen: boolean;
  intervals: number[];
};

const Container = styled.div<{ $open?: boolean }>`
  display: ${(props) => (props.$open ? "flex" : "none")};

  margin: 0.5rem 1rem;

  /* border: 1px solid red; */

  justify-content: space-around;
`;

const Indicator = styled.div<{ $val?: number }>`
  background-color: ${(props) => (props.$val === 0 ? "green" : "red")};

  width: 2rem;
  height: 2rem;
  border-radius: 1rem;

  justify-content: center;
`;
