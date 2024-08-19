import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletSelectorContextProvider } from '@calimero-is-near/calimero-p2p-sdk/lib/wallets/NearLogin/WalletSelectorContext';
import { NearLogin } from '@calimero-is-near/calimero-p2p-sdk';

import '@near-wallet-selector/modal-ui/styles.css';
import ContentWrapper from '../../components/login/ContentWrapper';
import { getContextId } from '../../utils/env';
import { getNearEnvironment, getNodeUrl } from '../../utils/node';

export default function NearPage() {
  const navigate = useNavigate();

  return (
    <ContentWrapper>
      <WalletSelectorContextProvider network={getNearEnvironment()}>
        <NearLogin
          contextId={getContextId()}
          rpcBaseUrl={getNodeUrl() ?? ''}
          successRedirect={() => navigate('/home')}
          navigateBack={() => navigate('/')}
          cardBackgroundColor={'#1c1c1c'}
          nearTitleColor={'white'}
        />
      </WalletSelectorContextProvider>
    </ContentWrapper>
  );
}
