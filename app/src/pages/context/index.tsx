import React from 'react';
import ContentWrapper from '../../components/login/ContentWrapper';
import { ContextModal } from '@calimero-network/calimero-client';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
`;

export default function ContextPage() {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <ContextModal />
      <ButtonWrapper>
        <div onClick={() => navigate('/auth')}>Back to Login</div>
        <div onClick={() => navigate('/home')}>Go to Home</div>
      </ButtonWrapper>
    </ContentWrapper>
  );
}
