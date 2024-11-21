"use client";
import React, { FC } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const BackArrow: FC = () => {
  const router = useRouter();

  return (
    <>
      <Arrow onClick={() => router.back()}>&#171;</Arrow>
    </>
  );
};

export default BackArrow;

const Arrow = styled.div`
  position: absolute;
  /* border: 1px solid green; */

  top: 0rem;
  left: 2rem;
  font-size: 6rem;
  color: white;
  cursor: pointer;
  z-index: 20;
`;
