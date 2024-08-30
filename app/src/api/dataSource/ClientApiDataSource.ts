import {
  ApiResponse,
  JsonRpcClient,
  RequestConfig,
  WsSubscriptionsClient,
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
import { getContextId } from '../../utils/node';
import {
  getExecutorPkByteArray,
  getJWTObject,
  getStorageAppEndpointKey,
  JsonWebToken,
} from '../../utils/storage';
import { AxiosHeader, createJwtHeader } from '../../utils/jwtHeaders';

export function getJsonRpcClient() {
  const jwt: JsonWebToken | null = getJWTObject();
  return new JsonRpcClient(
    getStorageAppEndpointKey() ?? '',
    jwt?.context_id ?? '',
  );
}

export function getWsSubscriptionsClient() {
  return new WsSubscriptionsClient(getStorageAppEndpointKey() ?? '', '/ws');
}

export class ClientApiDataSource implements ClientApi {
  async getCount(params: GetCountRequest): ApiResponse<GetCountResponse> {
    const jwtObject: JsonWebToken | null = getJWTObject();
    const headers: AxiosHeader | null = createJwtHeader();

    if (headers === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getExecutorPkByteArray(
      jwtObject?.executor_public_key ?? '',
    );
    if (!publicKey) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
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
    const jwtObject: JsonWebToken | null = getJWTObject();
    const headers: AxiosHeader | null = createJwtHeader();

    if (headers === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getExecutorPkByteArray(
      jwtObject?.executor_public_key ?? '',
    );
    if (!publicKey) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
      timeout: 10000,
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
    const jwtObject: JsonWebToken | null = getJWTObject();
    const headers: AxiosHeader | null = createJwtHeader();

    if (headers === null) {
      throw new Error('Failed to create auth headers');
    }

    const publicKey = getExecutorPkByteArray(
      jwtObject?.executor_public_key ?? '',
    );
    if (!publicKey) {
      return {
        error: { message: 'Failed to get executor public key', code: 500 },
      };
    }

    const config: RequestConfig = {
      headers: headers,
      timeout: 10000,
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
