import React, { FC } from "react";
import styled from "styled-components";
import Hour from "./components/hour";
import { Gym } from "@/lib/types/schedule";
import { parseSchedule } from "@/lib/utils";

import Cookies from "js-cookie";

/**
 *
 * @param data => schedule data
 * @returns all the indicators for the schedule
 */
const MobileView: FC<Props> = ({ data }) => {
  const hours = Array.from({ length: 24 });

  const tempData = parseSchedule(data.activities);
  const schedule = tempData[0];

  const val = Cookies.get("userGym");

  const parsed = val ? JSON.parse(decodeURIComponent(val)) : null;

  return (
    <Container>
      <p>{`Studio availability in ${parsed?.name || "Sheffield Millhouses"} in hour intervals`}</p>
      <p>Tap an hour block to see 15min intervals</p>
      {hours.map((_, index) => {
        const intervals = [schedule[index * 4], schedule[index * 4 + 1], schedule[index * 4 + 2], schedule[index * 4 + 3]];

        return <Hour key={index} hour={index} intervals={intervals} />;
      })}
    </Container>
  );
};

type Props = {
  data: Gym;
};

export default MobileView;

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
  gap: 1rem;
`;
