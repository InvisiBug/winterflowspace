"use client";
import React, { FC } from "react";
import styled from "styled-components";
import { borders } from "src/lib/colours";
//? Turned off by display none at the bottom

const Tag: FC<Props> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};
export default Tag;

interface Props {
  children: string;
}

const Container = styled.div`
  border: 1px solid ${borders};
  border-radius: 20px;
  /* padding: 0 0.5rem 0 0.5rem; */
  /* margin-left: 1rem; */
  font-size: 0.7rem;

  display: none;

  align-content: center;
`;
