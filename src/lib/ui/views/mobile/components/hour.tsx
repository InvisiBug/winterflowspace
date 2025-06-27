import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrentHour } from "@/lib/utils";
import AdditionalInfo from "./additionalInfo";
import { textColour } from "@/lib/colours";
import { freeColour, partiallyFreeColour, busyColour } from "@/lib/colours";

type State = "Free" | "Partially Free" | "Busy";

const Hour: FC<Props> = ({ hour, intervals }) => {
  const [open, setOpen] = useState(false); // Start closed
  const [highlight, setHighlight] = useState(false);
  const [state, setState] = useState<State>("Free");

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const currentHour = getCurrentHour();
    const thisSectionsHour = hour;

    const sum = intervals.reduce((partialSum, a) => partialSum + a, 0);
    if (sum <= 0) {
      setState("Free");
    } else if (sum < 4) {
      setState("Partially Free");
    } else if (sum >= 4) {
      setState("Busy");
    }

    // console.log("Current Hour:", currentHour, "Section Hour:", thisSectionsHour);

    // Set the border if the time represented by this section is the current time
    if (thisSectionsHour === currentHour) {
      setHighlight(true);
    }
  }, [open, hour, state, intervals]);

  return (
    <Container onClick={handleClick} $shouldhighlight={highlight} $state={state}>
      <Info>
        <Title>{hour}:00</Title>
        <Status>{state}</Status>
      </Info>

      <AdditionalInfo isOpen={open} intervals={intervals} />
    </Container>
  );
};
export default Hour;

type Props = {
  hour: number;
  intervals: number[]; // * Needs to be number for p5js to work (doesn't like booleans)
};

const borders = false;

const Container = styled.div<{
  $shouldhighlight: boolean;
  $state: State;
}>`
  border: ${({ $shouldhighlight }) => ($shouldhighlight ? "2px dashed yellow" : "white 1px solid")};
  background-color: ${({ $state }) =>
    $state === "Free" ? freeColour : $state === "Partially Free" ? partiallyFreeColour : $state === "Busy" ? busyColour : null};

  color: ${textColour};

  border-radius: 0.5rem;
  /* align-self: center; */

  display: flex;

  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;

  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
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
