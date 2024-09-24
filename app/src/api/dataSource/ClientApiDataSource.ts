import {
  ApiResponse,
  JsonRpcClient,
  RequestConfig,
  WsSubscriptionsClient,
  RpcError,
  handleRpcError,
} from '@calimero-is-near/calimero-p2p-sdk';
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
import { getContextId, getNodeUrl } from '../../utils/node';
import {
  getJWTObject,
  getStorageAppEndpointKey,
  JsonWebToken,
} from '../../utils/storage';
import { AxiosHeader, createJwtHeader } from '../../utils/jwtHeaders';
import { getRpcPath } from '../../utils/env';

export function getJsonRpcClient() {
  return new JsonRpcClient(getStorageAppEndpointKey() ?? '', getRpcPath());
}

export function getWsSubscriptionsClient() {
  return new WsSubscriptionsClient(getStorageAppEndpointKey() ?? '', '/ws');
}

function getConfigAndJwt() {
  const jwtObject: JsonWebToken | null = getJWTObject();
  const headers: AxiosHeader | null = createJwtHeader();
  if (!headers) {
    return {
      error: { message: 'Failed to create auth headers', code: 500 },
    };
  }
  if (!jwtObject) {
    return {
      error: { message: 'Failed to get JWT token', code: 500 },
    };
  }
  if (jwtObject.executor_public_key === null) {
    return {
      error: { message: 'Failed to get executor public key', code: 500 },
    };
  }

  const config: RequestConfig = {
    headers: headers,
    timeout: 10000,
  };

  return { jwtObject, config };
}

export class ClientApiDataSource implements ClientApi {
  async getCount(params: GetCountRequest): ApiResponse<GetCountResponse> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().query<
      GetCountRequest,
      GetCountResponse
    >(
      {
        contextId: jwtObject?.context_id ?? getContextId(),
        method: ClientMethod.GET_COUNT,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.getCount(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: { count: Number(response?.result?.output) ?? 0 },
      error: null,
    };
  }

  async increaseCount(
    params: IncreaseCountRequest,
  ): ApiResponse<IncreaseCountResponse> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().mutate<
      IncreaseCountRequest,
      IncreaseCountResponse
    >(
      {
        contextId: jwtObject?.context_id ?? getContextId(),
        method: ClientMethod.INCREASE_COUNT,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.getCount(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: Number(response?.result?.output) ?? null,
      error: null,
    };
  }

  async reset(params: ResetRequest): ApiResponse<ResetResponse> {
    const { jwtObject, config, error } = getConfigAndJwt();
    if (error) {
      return { error };
    }

    const response = await getJsonRpcClient().mutate<
      ResetRequest,
      ResetResponse
    >(
      {
        contextId: jwtObject?.context_id ?? getContextId(),
        method: ClientMethod.RESET,
        argsJson: params,
        executorPublicKey: jwtObject.executor_public_key,
      },
      config,
    );
    const rpcError: RpcError | null = response?.error ?? null;
    if (rpcError && rpcError.code) {
      const response = await handleRpcError(rpcError, getNodeUrl);
      if (response.code === 403) {
        return await this.getCount(params);
      }
      return {
        error: await handleRpcError(rpcError, getNodeUrl),
      };
    }

    return {
      data: Number(response?.result?.output) ?? null,
      error: null,
    };
  }
}
