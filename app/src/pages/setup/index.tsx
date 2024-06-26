import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNodeUrl } from '../../utils/node';
import { setAppEndpointKey } from '../../utils/storage';
import ContentWrapper from '../../components/login/ContentWrapper';
import { SetupModal } from '@calimero-is-near/calimero-p2p-sdk';

export default function SetupPage() {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <SetupModal
        successRoute={() => navigate('/auth')}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setAppEndpointKey}
      />
    </ContentWrapper>
  );
}
