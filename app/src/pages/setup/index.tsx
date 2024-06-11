import SetupModal from '@calimero-is-near/calimero-p2p-sdk/lib/setup/SetupModal';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getNodeUrl } from 'src/utils/node';
import { setAppEndpointKey } from 'src/utils/storage';
import styled from 'styled-components';

const FullPageCenter = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #111111;
  justify-content: center;
  align-items: center;
`;

export default function SetupPage() {
  const navigate = useNavigate();

  return (
    <FullPageCenter>
      <SetupModal
        successRoute={() => navigate('/auth')}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setAppEndpointKey}
      />
    </FullPageCenter>
  );
}
