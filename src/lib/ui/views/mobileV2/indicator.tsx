import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrentTimePercentage } from "./utils";

const Indicator = ({ free, start, end }) => {
  return (
    <Container $free={free} $timePerc={getCurrentTimePercentage(start, end)}>
      <Line $timePerc={getCurrentTimePercentage(start, end)}></Line>
      <Text>
        <Status>{free ? "Free" : "In Use"}</Status>
        <Times>{`${start} - ${end}`}</Times>
      </Text>
    </Container>
  );
};

export default Indicator;

const Container = styled.div<{
  $free: boolean;
  $timePerc: number | null;
}>`
  position: relative;
  color: black;
  width: 100%;

  margin-top: 1rem;
  background: ${({ $free }) => ($free ? "lightgreen" : "lightcoral")};
  border-radius: 8px;
`;

const Line = styled.div<{
  $timePerc: number;
}>`
  position: absolute;

  height: 100%;

  display: ${({ $timePerc }) => ($timePerc > 0 ? ($timePerc < 100 ? "block" : "none") : "none")};
  left: ${({ $timePerc }) => $timePerc}%; // Causes rerenders but works

  background: black;

  width: 2px;
`;

const Status = styled.div`
  font-weight: bold;
  font-size: larger;
  padding-bottom: 0.5rem;
`;

const Times = styled.div`
  font-size: larger;
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.5rem;
`;
