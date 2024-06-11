import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetamaskWrapper from '@calimero-is-near/calimero-p2p-sdk/lib/wallets/MetamaskWrapper';
import { getNodeUrl } from '../../utils/node';
import ContentWrapper from 'src/components/login/ContentWrapper';
import { getApplicationId } from 'src/utils/application';

export default function MetamaskPage() {
  const navigate = useNavigate();
  return (
    <ContentWrapper>
      <MetamaskWrapper
        applicationId={getApplicationId()}
        rpcBaseUrl={getNodeUrl()}
        successRedirect={() => navigate('/home')}
        navigateBack={() => navigate('/')}
        clientLogin={true}
      />
    </ContentWrapper>
  );
}
