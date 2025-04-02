import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupModal } from '@calimero-network/calimero-client';
import ContentWrapper from '../../components/login/ContentWrapper';

export default function SetupPage() {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <SetupModal successRoute={() => navigate('/auth')} />
    </ContentWrapper>
  );
}
