import React, { FC, useState, useMemo, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { AvailableGyms } from "@/lib/types";
import Login from "./login";

const HamburgerMenu: FC<Props> = ({ isHamburgerMenuOpen, gymIds }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const gymCookie = Cookies.get("userGym");
  const savedGym = gymCookie ? JSON.parse(decodeURIComponent(gymCookie)) : null;

  // Debounce the search term to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const click = useCallback((gym: { name: string; id: string }) => {
    Cookies.set("userGym", encodeURIComponent(JSON.stringify({ name: gym.name, id: gym.id })), { expires: 365 * 20 });
    window.location.reload();
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Filter gyms based on debounced search term
  const filteredGyms = useMemo(() => {
    if (!gymIds) return null;
    if (!debouncedSearchTerm) return gymIds;

    return gymIds.filter((gym) => gym.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
  }, [gymIds, debouncedSearchTerm]);

  return (
    <>
      {isHamburgerMenuOpen ? (
        <Container>
          <Header>
            <Title>Your Gym</Title>
            {savedGym?.name && (
              <Selection>
                <CurrentSelection>Currently selected:</CurrentSelection>
                <SelectedGym>{savedGym.name}</SelectedGym>
              </Selection>
            )}
          </Header>
          <Login />

          <SearchContainer>
            <SearchInput type="text" placeholder="🔍 Search gyms..." value={searchTerm} onChange={handleSearchChange} />
          </SearchContainer>

          <Links>
            {filteredGyms ? (
              filteredGyms.map((gym) => {
                return (
                  <LinkItem key={gym.id}>
                    <GymName onClick={() => click(gym)}>{gym.name}</GymName>
                  </LinkItem>
                );
              })
            ) : (
              <ErrorMessage>Wow, how did you manage to break this, thats impressive</ErrorMessage>
            )}
          </Links>
        </Container>
      ) : null}
    </>
  );
};

export default HamburgerMenu;

type Props = {
  isHamburgerMenuOpen: boolean;
  gymIds: AvailableGyms | null;
};
const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 1rem;
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  margin: 1rem 0;
`;

const slide = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.5px;
`;

const CurrentSelection = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
`;

const Selection = styled.div`
  padding-top: 0.5rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
  text-align: right;
`;

const SelectedGym = styled.span`
  color: #4ade80;
  font-weight: 600;
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #4ade80;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

const GymName = styled.div`
  color: white;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #4ade80;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  z-index: 50;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  backdrop-filter: blur(10px);
  padding: 2rem 1.5rem;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
  animation: ${slide} 0.3s ease-out;

  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.4s ease-out 0.1s both;
`;

const LinkItem = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(74, 222, 128, 0.3);
    transform: translateX(4px);
  }

  &:active {
    transform: translateX(2px);
  }
`;
