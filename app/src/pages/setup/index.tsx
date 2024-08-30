import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupModal } from '@calimero-is-near/calimero-p2p-sdk';
import ContentWrapper from '../../components/login/ContentWrapper';
import { getNodeUrl, getStorageApplicationId } from '../../utils/node';
import {
  setStorageAppEndpointKey,
  setStorageApplicationId,
} from '../../utils/storage';

export default function SetupPage() {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <SetupModal
        successRoute={() => navigate('/auth')}
        getNodeUrl={getNodeUrl}
        setNodeUrl={setStorageAppEndpointKey}
        setApplicationId={setStorageApplicationId}
        getApplicationId={getStorageApplicationId}
      />
    </ContentWrapper>
  );
}
