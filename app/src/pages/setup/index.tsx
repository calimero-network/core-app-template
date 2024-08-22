import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getContextId, getNodeUrl } from '../../utils/node';
import {
  setStorageAppEndpointKey,
  setStorageContextId,
} from '../../utils/storage';
import ContentWrapper from '../../components/login/ContentWrapper';
import { SetupModal } from '@calimero-is-near/calimero-p2p-sdk';

export default function SetupPage() {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <SetupModal
        successRoute={() => navigate('/auth')}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setStorageAppEndpointKey}
        setContextId={setStorageContextId}
        getContextId={getContextId}
      />
    </ContentWrapper>
  );
}
