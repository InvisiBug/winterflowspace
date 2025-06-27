// "use server";
import React, { FC } from "react";
import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { AvailableGyms } from "@/lib/types/gyms";

const HamburgerMenu: FC<Props> = ({ isHamburgerMenuOpen, gymIds }) => {
  console.log("🚀 ~ isHamburgerMenuOpen:", isHamburgerMenuOpen);

  const val = Cookies.get("userGym");

  const parsed = val ? JSON.parse(decodeURIComponent(val)) : null;

  const click = (gym: { name: string; id: string }) => {
    Cookies.set("userGym", encodeURIComponent(JSON.stringify({ name: gym.name, id: gym.id })));
    window.location.reload();
  };

  return (
    <>
      {isHamburgerMenuOpen ? (
        <Container>
          <p>Please select your gym</p>
          <br />
          <p>{`Currently selected: \n ${parsed.name}`}</p>
          <br />
          <Links>
            {gymIds.map((gym) => (
              <LinkItem key={gym.id}>
                <GymName onClick={() => click(gym)}>{gym.name}</GymName>
              </LinkItem>
            ))}
          </Links>
        </Container>
      ) : null}
    </>
  );
};

export default HamburgerMenu;

type Props = {
  isHamburgerMenuOpen: boolean;
  gymIds: AvailableGyms;
};

const slide = keyframes`
  from {
    width: translateX(-50vw);
  }

  to {
    transform: translateX(50vw);
  }
`;
const borders = false;

const GymName = styled.div`
  color: white;
`;

const Container = styled.div`
  border: ${borders ? "1px solid red" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  left: -50vw;
  /* width: 25vw; */
  height: 100vh;
  z-index: 10;
  background: rgba(50, 50, 50);
  padding-top: 5rem;
  /* padding-left: 1rem; */
  /* margin-left: 1rem; */

  animation: ${slide} 0.5s forwards;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Links = styled.div`
  border: ${borders ? "1px solid yellow" : "none"};

  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

const LinkItem = styled.div`
  border: ${borders ? "1px solid purple" : "none"};
  min-width: 100px;
  margin-bottom: 0.5rem;

  font-weight: bold;
  text-align: left;
  font-size: large;
  cursor: pointer;
`;
