import React, { FC } from "react";
import styled from "styled-components";

const MobileView: FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  console.log(hours[5]);
  return (
    <Container>
      {hours.map((hour) => (
        <Hour key={hour}>
          <Title>{hour}:00</Title>
          <Status>Partially In Use</Status>
        </Hour>
      ))}
    </Container>
  );
};

export default MobileView;

const borders = true;

const Title = styled.p`
  border: ${borders ? "1px solid blue" : "none"};
`;

const Status = styled.p`
  border: ${borders ? "1px solid yellow" : "none"};
`;

const Container = styled.div`
  border: ${borders ? "1px solid red" : "none"};

  width: 100svw;
  min-height: 100svh;
  padding: 2rem;

  /* font-family: "Trebuchet MS, sans-serif"; */

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Hour = styled.div`
  border: ${borders ? "1px solid green" : "none"};
  display: flex;

  padding: 1rem;
`;
