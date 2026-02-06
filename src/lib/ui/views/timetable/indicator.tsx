import React, { FC } from "react";
import styled, { keyframes, css } from "styled-components";
import { getCurrentTimePercentage, formatTo12Hour } from "@/lib/utils";
import { freeColour, busyColour } from "@/lib/ui/colours";
import { Booking } from "@/lib/types";

const Indicator: FC<Props> = ({ free, start, end, timeline }) => {
  const timePerc = getCurrentTimePercentage(start, end);

  return (
    <Container $free={free} $timePerc={timePerc}>
      <StatusBadge $free={free}>{free ? "Free" : "In Use"}</StatusBadge>
      {timeline && <Line $timePerc={timePerc}></Line>}
      <Content>
        <TimeRange>{`${formatTo12Hour(start)} - ${formatTo12Hour(end)}`}</TimeRange>
      </Content>
    </Container>
  );
};

export default Indicator;

interface Props extends Booking {
  timeline: boolean;
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
`;

const Container = styled.div<{
  $free: boolean;
  $timePerc: number | null;
}>`
  position: relative;
  width: 100%;
  margin-top: 1rem;

  background: ${({ $free }) => ($free ? freeColour : busyColour)};
  border-radius: 12px;
  overflow: hidden;

  /* Modern shadow and depth */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  /* Subtle border */
  border: 1px solid ${({ $free }) => ($free ? "rgba(48, 115, 81, 0.3)" : "rgba(76, 92, 104, 0.3)")};

  /* Smooth transitions */
  transition: all 0.3s ease;
  ${css`
    animation: ${slideIn} 0.3s ease-out;
  `}

  /* Hover effect */
  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const StatusBadge = styled.div<{ $free: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  background: ${({ $free }) => ($free ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.9)")};
  color: ${({ $free }) => ($free ? freeColour : busyColour)};

  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* Subtle animation for active states */
  ${({ $free }) =>
    !$free &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
    `}
`;

const Line = styled.div<{
  $timePerc: number;
}>`
  position: absolute;
  top: 0;
  left: ${({ $timePerc }) => $timePerc}%;

  height: 100%;
  width: 3px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.9) 100%);

  display: ${({ $timePerc }) => ($timePerc > 0 ? ($timePerc < 100 ? "block" : "none") : "none")};

  /* Glowing effect */
  box-shadow:
    0 0 8px rgba(255, 255, 255, 0.6),
    0 0 16px rgba(255, 255, 255, 0.3);

  /* Pulsing animation for current time indicator */
  ${css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}
`;

const Content = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4rem;
`;

const TimeRange = styled.div`
  color: white;
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: 0.025em;

  /* Text shadow for better readability */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;
