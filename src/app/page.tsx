// "use client";
import React, { FC } from "react";

// import styled from "styled-components";
// import dynamic from "next/dynamic";
// import axios from "axios";
import { Gym } from "@/lib/ui/studioFree/types";
import Experiment from "@/lib/ui/studioFree";

const StudioFree: FC = async () => {
  // export default async function Page() {

  const response: any = await fetch("https://businessgateway.puregym.com/api/bookings/v1/timetable/75/scheduled-class", { cache: "no-store" });
  const data = await response.json();

  return (
    <>
      <Experiment data={data} />
    </>
  );
};

type Props = {
  data: Gym;
};

export default StudioFree;

const borders = false;

// const Description = styled.div`
//   border: ${borders ? "2px solid red" : "none"};
//   position: absolute;
//   transform: translateY(-50%);
//   top: 50%;
//   left: 5rem;

//   min-width: 0px;
//   max-width: 15rem;
//   color: white;
//   font-weight: 400;
//   font-size: 0.9rem;
//   font-size: 1rem;
//   text-align: justify;
//   padding: 1rem;
//   border: 1px solid grey;
//   background-color: rgba(0, 0, 0, 0.7);
//   border-radius: 5%;
// `;
