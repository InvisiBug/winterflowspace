"use client";
import React, { FC, useState, useMemo } from "react";
import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { AvailableGyms } from "@/lib/types/gyms";

const HamburgerMenu: FC<Props> = ({ isHamburgerMenuOpen, gymIds }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialsSaved, setIsCredentialsSaved] = useState(false);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  const gymCookie = Cookies.get("userGym");
  const savedGym = gymCookie ? JSON.parse(decodeURIComponent(gymCookie)) : null;

  // Check for saved credentials on component mount
  React.useEffect(() => {
    const savedCredentials = Cookies.get("credentials");

    if (savedCredentials) {
      const { username, pin } = JSON.parse(decodeURIComponent(savedCredentials));
      setUsername(username);
      setPassword(pin);
      setIsCredentialsSaved(true);
    }
  }, []);

  const click = (gym: { name: string; id: string }) => {
    Cookies.set("userGym", encodeURIComponent(JSON.stringify({ name: gym.name, id: gym.id })), { expires: 365 * 20 });
    window.location.reload();
  };

  const handleSaveCredentials = () => {
    if (username.trim() && password.trim()) {
      Cookies.set("credentials", encodeURIComponent(JSON.stringify({ username: username.trim(), pin: password.trim() })), { expires: 365 * 20 });
      setIsCredentialsSaved(true);
      setShowCredentialsForm(false);
    }
    window.location.reload();
  };

  const handleClearCredentials = () => {
    Cookies.remove("credentials");

    setUsername("");
    setPassword("");
    setIsCredentialsSaved(false);
    setShowCredentialsForm(false);
  };

  // Filter gyms based on search term
  const filteredGyms = useMemo(() => {
    if (!searchTerm) return gymIds;
    return gymIds.filter((gym) => gym.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [gymIds, searchTerm]);

  return (
    <>
      {isHamburgerMenuOpen ? (
        <Container>
          <Header>
            <Title>Select Your Gym</Title>
            {savedGym?.name && (
              <CurrentSelection>
                Currently selected: <SelectedGym>{savedGym.name}</SelectedGym>
              </CurrentSelection>
            )}
          </Header>

          <CredentialsSection>
            <CredentialsHeader>
              <CredentialsTitle>🔑 Pure Gym Credentials</CredentialsTitle>
              {!isCredentialsSaved ? <ToggleButton onClick={() => setShowCredentialsForm(!showCredentialsForm)}>{showCredentialsForm ? "➖" : "➕"}</ToggleButton> : <StatusIndicator>✅</StatusIndicator>}
            </CredentialsHeader>

            {showCredentialsForm && !isCredentialsSaved && (
              <CredentialsForm>
                <FormGroup>
                  <FormLabel>Username/Email</FormLabel>
                  <FormInput type="email" placeholder="your.email@example.com" value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Password</FormLabel>
                  <FormInput type="password" placeholder="Your Pin" value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormGroup>

                <FormButtons>
                  <SaveCredentialsButton onClick={handleSaveCredentials} disabled={!username.trim() || !password.trim()}>
                    💾 Save
                  </SaveCredentialsButton>
                </FormButtons>
              </CredentialsForm>
            )}

            {isCredentialsSaved && (
              <SavedCredentialsInfo>
                <SavedText>Saved: {username}</SavedText>
                <ClearCredentialsButton onClick={handleClearCredentials}>🗑️ Clear</ClearCredentialsButton>
              </SavedCredentialsInfo>
            )}
          </CredentialsSection>

          <SearchContainer>
            <SearchInput type="text" placeholder="🔍 Search gyms..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </SearchContainer>

          <Links>
            {filteredGyms.map((gym) => {
              return (
                <LinkItem key={gym.id}>
                  <GymName onClick={() => click(gym)}>{gym.name}</GymName>
                </LinkItem>
              );
            })}
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

const CredentialsSection = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CredentialsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CredentialsTitle = styled.h3`
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  letter-spacing: 0.025em;
`;

const ToggleButton = styled.button`
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  color: #3b82f6;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.3);
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

const StatusIndicator = styled.span`
  font-size: 1.125rem;
  filter: drop-shadow(0 2px 4px rgba(74, 222, 128, 0.3));
`;

const CredentialsForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeIn} 0.3s ease-out;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const FormLabel = styled.label`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FormInput = styled.input`
  padding: 0.625rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: rgba(59, 130, 246, 0.6);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SaveCredentialsButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SavedCredentialsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.2);
  border-radius: 6px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SavedText = styled.span`
  color: #4ade80;
  font-size: 0.875rem;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ClearCredentialsButton = styled.button`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 4px;
  color: #ef4444;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(239, 68, 68, 0.3);
    border-color: rgba(239, 68, 68, 0.5);
  }
`;
