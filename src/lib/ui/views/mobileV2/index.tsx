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
      <p>{`Studio availability in ${parsed?.name || "Sheffield Millhouses"}`}</p>

      {openClosedTimes.map((times) => {
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
