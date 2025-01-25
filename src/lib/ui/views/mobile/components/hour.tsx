import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrentHour } from "@/lib/utils";
import AdditionalInfo from "./additionalInfo";

const Hour: FC<Props> = ({ hour, intervals }) => {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const sum = intervals.reduce((partialSum, a) => partialSum + a, 0);
  console.log("hour", hour, "intervals", intervals, "sum", sum);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (hour === getCurrentHour()) {
      setHighlight(true);
    }
  }, [open, hour]);

  return (
    <Container onClick={handleClick} $shouldhighlight={highlight}>
      <Info>
        <Title>{hour}:00</Title>
        <Status>{sum <= 0 ? "Free" : sum < 4 ? "Partially Free" : "In Use"}</Status>
      </Info>

      <AdditionalInfo isOpen={open} intervals={intervals} />
    </Container>
  );
};
export default Hour;

type Props = {
  hour: number;
  intervals: number[]; // * Needs to be number for p5js to work (doesnt like booleans)
};

const borders = false;

const Container = styled.div<{ $shouldhighlight: boolean }>`
  border: ${(props) => (props.$shouldhighlight ? "1px solid green" : "#8b8982 1px solid")};

  border-radius: 0.5rem;
  display: flex;

  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* box-shadow: 6px 0px 14px 3px rgba(93, 153, 72, 0.73); */
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  border: ${borders ? "1px solid blue" : "none"};
`;

const Status = styled.p`
  border: ${borders ? "1px solid yellow" : "none"};
`;

// display: ${open ? "block" : "none"};
