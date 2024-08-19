import {
  ApiResponse,
  Header,
  JsonRpcClient,
  RequestConfig,
  WsSubscriptionsClient,
  createAuthHeader,
} from '@calimero-is-near/calimero-p2p-sdk';
import { getContextId, getRpcPath } from '../../utils/env';
import { getAppEndpointKey, getExecutorPublicKey } from '../../utils/storage';
import {
  ClientApi,
  ClientMethod,
  GetCountRequest,
  GetCountResponse,
  IncreaseCountRequest,
  IncreaseCountResponse,
  ResetRequest,
  ResetResponse,
} from '../clientApi';

export function getJsonRpcClient() {
  return new JsonRpcClient(getAppEndpointKey() ?? '', getRpcPath());
}

export function getWsSubscriptionsClient() {
  return new WsSubscriptionsClient(getAppEndpointKey() ?? '', '/ws');
}

export class ClientApiDataSource implements ClientApi {
  async getCount(params: GetCountRequest): ApiResponse<GetCountResponse> {
    const authHeaders: Header | null = await createAuthHeader(
      JSON.stringify(params),
    );
    if (authHeaders === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      throw new Error('Failed to get public key');
    }

    const config: RequestConfig = {
      headers: authHeaders,
      timeout: 10000,
    };

    const response = await getJsonRpcClient().query<
      GetCountRequest,
      GetCountResponse
    >(
      {
        contextId: getContextId(),
        method: ClientMethod.GET_COUNT,
        argsJson: params,
        exectorPublicKey: Array.from(publicKey),
      },
      config,
    );

    return {
      data: { count: response?.result?.output ?? 0 },
      error: null,
    };
  }

  async increaseCount(
    params: IncreaseCountRequest,
  ): ApiResponse<IncreaseCountResponse> {
    const authHeaders: Header | null = await createAuthHeader(
      JSON.stringify(params),
    );
    if (authHeaders === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      throw new Error('Failed to get public key');
    }

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<
      IncreaseCountRequest,
      IncreaseCountResponse
    >(
      {
        contextId: getContextId(),
        method: ClientMethod.INCREASE_COUNT,
        argsJson: params,
        exectorPublicKey: Array.from(publicKey),
      },
      config,
    );
    return {
      data: response?.result?.output ?? null,
      error: null,
    };
  }

  async reset(params: ResetRequest): ApiResponse<ResetResponse> {
    const authHeaders: Header | null = await createAuthHeader(
      JSON.stringify(params),
    );
    if (authHeaders === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getExecutorPublicKey();
    if (publicKey === null) {
      throw new Error('Failed to get public key');
    }

    const config: RequestConfig = {
      headers: authHeaders,
    };

    const response = await getJsonRpcClient().mutate<
      ResetRequest,
      ResetResponse
    >(
      {
        contextId: getContextId(),
        method: ClientMethod.RESET,
        argsJson: params,
        exectorPublicKey: Array.from(publicKey),
      },
      config,
    );
    return {
      data: response?.result?.output ?? null,
      error: null,
    };
  }
}
