import { marshalPublicKey } from '@libp2p/crypto/keys';
import bs58 from 'bs58';

export const CLIENT_KEY = 'client-key';
export const APP_URL = 'app-url';

export interface ClientKey {
  privateKey: string;
  publicKey: string;
}

export const getAppEndpointKey = (): string | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let storageRecord: string | null = localStorage.getItem(APP_URL);
      if (storageRecord) {
        let url: string = JSON.parse(storageRecord);
        if (url && url.length > 0) {
          return url;
        }
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const getExecutorPublicKey = (): Uint8Array | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let clientKeystore: ClientKey = JSON.parse(
        localStorage.getItem(CLIENT_KEY) ?? '',
      );
      const decodedPk = bs58.decode(clientKeystore.publicKey);

      const publicKey = marshalPublicKey(
        { bytes: decodedPk.slice(0, 32) },
        'ed25519',
      );
      if (publicKey) {
        return publicKey;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const setAppEndpointKey = (url: string) => {
  localStorage.setItem(APP_URL, JSON.stringify(url));
};

export const clearAppEndpoint = () => {
  localStorage.removeItem(APP_URL);
};
