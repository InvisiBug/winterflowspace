"use client";
import { FC, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { login } from "@/lib/api";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCredentialsSaved, setIsCredentialsSaved] = useState(false);
  const [showCredentialsForm, setShowCredentialsForm] = useState(false);

  // Check for saved credentials on component mount
  useEffect(() => {
    const accessToken = Cookies.get("accessToken") || "";
    const userName = Cookies.get("username") || "";

    if (accessToken) {
      const username = JSON.parse(decodeURIComponent(userName));

      setUsername(username);
      setIsCredentialsSaved(true);
    }
  }, []);

  const handleSaveCredentials = useCallback(async () => {
    if (username.trim() && password.trim()) {
      try {
        const token = await login(username.trim(), password.trim());

        Cookies.set(
          "accessToken",
          encodeURIComponent(JSON.stringify({ token })),
        );
        Cookies.set(
          "username",
          encodeURIComponent(JSON.stringify(username.trim())),
        );

        setIsCredentialsSaved(true);
        setShowCredentialsForm(false);

        // Small delay to ensure state is updated before reload
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } catch (error) {
        console.error("Login failed:", error);
        // Handle error appropriately - could show error message to user
      }
    }
  }, [username, password]);

  const handleClearCredentials = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("username");

    setUsername("");
    setPassword("");
    setIsCredentialsSaved(false);
    setShowCredentialsForm(false);
  }, []);

  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [],
  );

  const toggleCredentialsForm = useCallback(() => {
    setShowCredentialsForm(!showCredentialsForm);
  }, [showCredentialsForm]);

  return (
    <CredentialsSection>
      <CredentialsHeader>
        <CredentialsTitle>🔑 Pure Gym Credentials</CredentialsTitle>
        {!isCredentialsSaved ? (
          <ToggleButton onClick={toggleCredentialsForm}>
            {showCredentialsForm ? "➖" : "➕"}
          </ToggleButton>
        ) : (
          <StatusIndicator>✅</StatusIndicator>
        )}
      </CredentialsHeader>

      {showCredentialsForm && !isCredentialsSaved && (
        <CredentialsForm>
          <FormGroup>
            <FormLabel>Username/Email</FormLabel>
            <FormInput
              type="email"
              placeholder="your.email@example.com"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormInput
              type="password"
              placeholder="Your Pin"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>

          <FormButtons>
            <SaveCredentialsButton
              onClick={handleSaveCredentials}
              disabled={!username.trim() || !password.trim()}
            >
              💾 Save
            </SaveCredentialsButton>
          </FormButtons>
        </CredentialsForm>
      )}

      {isCredentialsSaved && (
        <SavedCredentialsInfo>
          <SavedText>Saved: {username}</SavedText>
          <ClearCredentialsButton onClick={handleClearCredentials}>
            🗑️ Clear
          </ClearCredentialsButton>
        </SavedCredentialsInfo>
      )}
    </CredentialsSection>
  );
};

export default Login;

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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
