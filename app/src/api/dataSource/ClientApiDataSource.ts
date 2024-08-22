import {
  ApiResponse,
  Header,
  JsonRpcClient,
  RequestConfig,
  WsSubscriptionsClient,
  createAuthHeader,
} from '@calimero-is-near/calimero-p2p-sdk';
import { getRpcPath } from '../../utils/env';
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
import { getContextId } from '../../utils/node';
import {
  getStorageAppEndpointKey,
  getStorageExecutorPublicKey,
} from '../../utils/storage';

export function getJsonRpcClient() {
  return new JsonRpcClient(getStorageAppEndpointKey() ?? '', getRpcPath());
}

export function getWsSubscriptionsClient() {
  return new WsSubscriptionsClient(getStorageAppEndpointKey() ?? '', '/ws');
}

export class ClientApiDataSource implements ClientApi {
  async getCount(params: GetCountRequest): ApiResponse<GetCountResponse> {
    const authHeaders: Header | null = await createAuthHeader(
      JSON.stringify(params),
    );
    if (authHeaders === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getStorageExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
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
        executorPublicKey: Array.from(publicKey),
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

    const publicKey = getStorageExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
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
        executorPublicKey: Array.from(publicKey),
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

    const publicKey = getStorageExecutorPublicKey();
    if (publicKey === null) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
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
        executorPublicKey: Array.from(publicKey),
      },
      config,
    );
    return {
      data: response?.result?.output ?? null,
      error: null,
    };
  }
}
