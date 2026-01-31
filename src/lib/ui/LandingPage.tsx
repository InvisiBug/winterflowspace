"use client";
import React, { FC, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { AvailableGyms } from "@/lib/types/gyms";
import { HamburgerButton, HamburgerMenu } from "@/lib/ui/hamburger";

const tiles = [
  {
    icon: "🏃‍♂️",
    title: "Real-Time Tracking",
    description:
      "Live studio availability updates showing exactly when studios are free",
  },
  {
    icon: "📍",
    title: "Any Pure Gym",
    description: "Choose from hundreds of Pure Gym locations across the UK",
  },
  {
    icon: "⏰",
    title: "Smart Scheduling",
    description:
      "Plan your workouts around studio class schedules and free periods",
  },
];

const LandingPage: FC<Props> = ({ availableGyms }) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Fixes hydration error by holding off rendering until on client

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <HamburgerButton
            setIsHamburgerMenuOpen={setIsHamburgerMenuOpen}
            isHamburgerMenuOpen={isHamburgerMenuOpen}
          />
          <HamburgerMenu
            isHamburgerMenuOpen={isHamburgerMenuOpen}
            gymIds={availableGyms}
          />
        </>
      )}

      <Container>
        <Hero $isClient={isClient}>
          <MainTitle>Winter Flow Space</MainTitle>
          <Subtitle>Pure Gym Studio Availability Tracker</Subtitle>
          <Subtitle>Open the menu to select your gym</Subtitle>
          <Description>
            Discover when your favorite Pure Gym studio is free. Track real-time
            availability and plan your workouts around studio schedules at any
            Pure Gym location.
          </Description>

          <FeatureGrid>
            {tiles.map((tile) => (
              <FeatureCard key={tile.title}>
                <FeatureIcon>{tile.icon}</FeatureIcon>
                <FeatureTitle>{tile.title}</FeatureTitle>
                <FeatureDescription>{tile.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>

          <GetStartedSection>
            <GetStartedTitle>Ready to start?</GetStartedTitle>
            <GetStartedDescription>
              Use the menu in the top-left corner to select your Pure Gym and
              start tracking studio availability.
            </GetStartedDescription>
            <MenuIndicator $isClient={isClient}>☰</MenuIndicator>
          </GetStartedSection>
        </Hero>
      </Container>
    </>
  );
};

export default LandingPage;

interface Props {
  availableGyms: AvailableGyms | null;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Container = styled.div`
  border: 1px solid red;
  min-height: 100vh;
  /* width: 100%; */
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Hero = styled.div<{ $isClient?: boolean }>`
  max-width: 800px;
  width: 100%;
  text-align: center;
  ${({ $isClient }) =>
    $isClient &&
    css`
      animation: ${fadeIn} 0.8s ease-out;
    `}
`;

const MainTitle = styled.h1`
  color: white;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  letter-spacing: 0.025em;

  background: linear-gradient(135deg, #ffffff 0%, #4ade80 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  color: #4ade80;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 2rem 0;
  letter-spacing: 0.05em;

  text-shadow: 0 0 12px rgba(74, 222, 128, 0.4);

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.25rem;
  line-height: 1.6;
  margin: 0 0 3rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.9) 0%,
    rgba(15, 23, 42, 0.9) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem 1.5rem;

  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 4px 6px rgba(0, 0, 0, 0.1);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(74, 222, 128, 0.3);
    box-shadow:
      0 12px 24px rgba(0, 0, 0, 0.4),
      0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
`;

const FeatureTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  letter-spacing: 0.025em;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const GetStartedSection = styled.div`
  background: linear-gradient(
    135deg,
    rgba(74, 222, 128, 0.1) 0%,
    rgba(30, 41, 59, 0.9) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 222, 128, 0.3);
  border-radius: 20px;
  padding: 2.5rem 2rem;

  box-shadow:
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(74, 222, 128, 0.1);
`;

const GetStartedTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  letter-spacing: 0.025em;
`;

const GetStartedDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const MenuIndicator = styled.div<{ $isClient?: boolean }>`
  display: inline-block;
  font-size: 2rem;
  color: #4ade80;
  ${({ $isClient }) =>
    $isClient &&
    css`
      animation: ${pulse} 2s ease-in-out infinite;
    `}

  filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.6));
`;
