import React, { FC } from "react";
import styled from "styled-components";
import Indicator from "./indicator";
import { Schedule } from "@/lib/types/schedule";
import { parseSchedule } from "@/lib/utils";
import { getOpenClosedRanges } from "./utils";
import Cookies from "js-cookie";

const MobileViewV2: FC<Props> = ({ data, peopleInGym }) => {
  console.log(data);
  // TODO (Improvement): Rework the data parsing as it still uses the old mark timeline method
  const todaysSchedule = parseSchedule(data.activities)[0];
  const tomorrowsSchedule = parseSchedule(data.activities)[1];

  const todayTimes = getOpenClosedRanges(todaysSchedule);
  const tomorrowTimes = getOpenClosedRanges(tomorrowsSchedule);

  const val = Cookies.get("userGym");
  const parsed = val ? JSON.parse(decodeURIComponent(val)) : null;

  return (
    <Container>
      <Title>
        <TitleText>Studio Availability</TitleText>
        {parsed?.name && <GymName>{parsed.name}</GymName>}
        {peopleInGym !== undefined && (
          <PeopleCount>
            <PeopleIcon>👥</PeopleIcon>
            <PeopleText>{peopleInGym} people currently in the gym</PeopleText>
          </PeopleCount>
        )}
      </Title>

      {todayTimes.map((times) => {
        return <Indicator free={times.free} start={times.start} end={times.end} timeline={true} key={`${times.start}-${times.end}`} />;
      })}

      <DaySpacer>
        <SpacerLine />
        <SpacerText>Tomorrow</SpacerText>
        <SpacerLine />
      </DaySpacer>

      {tomorrowTimes.map((times) => {
        return <Indicator free={times.free} start={times.start} end={times.end} timeline={false} key={`tomorrow-${times.start}-${times.end}`} />;
      })}
    </Container>
  );
};

type Props = {
  data: Schedule;
  peopleInGym?: number;
};

export default MobileViewV2;

const borders = false;

const Container = styled.div`
  border: ${borders ? "1px solid white" : "none"};
  color: #fbfffe;

  width: 100svw;
  min-height: 100svh;
  padding: 5rem 30vw 2vw 30vw;

  @media (max-width: 1200px) {
    padding: 5rem 15vw 5vw 15vw;
  }

  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem 2rem;

  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 4px 6px rgba(0, 0, 0, 0.1);
`;

const TitleText = styled.h1`
  color: white;
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.025em;

  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const GymName = styled.h2`
  color: #4ade80;
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.05em;

  /* Subtle glow effect */
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.3);
`;

const DaySpacer = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0 2rem 0;
  gap: 1rem;
`;

const SpacerLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
`;

const SpacerText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.5rem 1rem;

  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;

  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PeopleCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;

  background: linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(30, 41, 59, 0.9) 100%);
  backdrop-filter: blur(10px);
  /* border: 1px solid rgba(74, 222, 128, 0.3); */
  border-radius: 12px;

  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(74, 222, 128, 0.1);
`;

const PeopleIcon = styled.span`
  font-size: 1.25rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const PeopleText = styled.span`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;

  /* Subtle glow effect */
  text-shadow: 0 0 8px rgba(74, 222, 128, 0.2);
`;
