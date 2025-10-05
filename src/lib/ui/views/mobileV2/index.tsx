import React, { FC } from "react";
import styled from "styled-components";
import Indicator from "./indicator";
import { Gym } from "@/lib/types/schedule";
import { parseSchedule } from "@/lib/utils";
import { getOpenClosedRanges } from "./utils";
import Cookies from "js-cookie";

const MobileViewV2: FC<Props> = ({ data }) => {
  const dailySchedule = parseSchedule(data.activities)[0];

  const openClosedTimes = getOpenClosedRanges(dailySchedule);

  const val = Cookies.get("userGym");

  const parsed = val ? JSON.parse(decodeURIComponent(val)) : null;

  return (
    <Container>
      <Title>
        <TitleText>Studio Availability</TitleText>
        <GymName>{parsed?.name || "Sheffield Millhouses"}</GymName>
      </Title>

      {openClosedTimes.map((times) => {
        console.log("🚀 ~ MobileViewV2 ~ times:", times);
        return <Indicator free={times.free} start={times.start} end={times.end} key={`${times.start}-${times.end}`} />;
      })}
    </Container>
  );
};

type Props = {
  data: Gym;
};

export default MobileViewV2;

const borders = false;

const Container = styled.div`
  /* border: ${borders ? "1px solid red" : "none"}; */
  color: #fbfffe;

  width: 100svw;
  min-height: 100svh;
  padding: 15vw;
  padding-top: 5rem;

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
