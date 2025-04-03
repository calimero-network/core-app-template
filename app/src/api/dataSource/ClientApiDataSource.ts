import {
  ApiResponse,
  JsonRpcClient,
  WsSubscriptionsClient,
  RpcError,
  handleRpcError,
  getAppEndpointKey,
  prepareAuthenticatedRequestConfig,
} from '@calimero-network/calimero-client';
import {
  ClientApi,
  ClientMethod,
  GetCountResponse,
  IncreaseCountRequest,
  IncreaseCountResponse,
  ResetCounterResponse,
} from '../clientApi';

export function getJsonRpcClient() {
  const appEndpointKey = getAppEndpointKey();
  if (!appEndpointKey) {
    throw new Error(
      'Application endpoint key is missing. Please check your configuration.',
    );
  }
  return new JsonRpcClient(appEndpointKey, '/jsonrpc');
}

export function getWsSubscriptionsClient() {
  const appEndpointKey = getAppEndpointKey();
  if (!appEndpointKey) {
    throw new Error(
      'Application endpoint key is missing. Please check your configuration.',
    );
  }
  return new WsSubscriptionsClient(appEndpointKey, '/ws');
}

export class ClientApiDataSource implements ClientApi {
  private async handleError(
    error: RpcError,
    params: any,
    callbackFunction: any,
  ) {
    if (error && error.code) {
      const response = await handleRpcError(error, getAppEndpointKey);
      if (response.code === 403) {
        return await callbackFunction(params);
      }
      return {
        error: await handleRpcError(error, getAppEndpointKey),
      };
    }
  }

  async getCount(): ApiResponse<GetCountResponse> {
    try {
      const { publicKey, contextId, config, error } =
        prepareAuthenticatedRequestConfig();
      if (error) {
        return { error };
      }

      const response = await getJsonRpcClient().execute<any, GetCountResponse>(
        {
          contextId: contextId,
          method: ClientMethod.GET_COUNT,
          argsJson: {},
          executorPublicKey: publicKey,
        },
        config,
      );
      if (response?.error) {
        return await this.handleError(response.error, {}, this.getCount);
      }

      return {
        data: { count: Number(response?.result?.output) ?? 0 },
        error: null,
      };
    } catch (error) {
      console.error('getCount failed:', error);
      let errorMessage = 'An unexpected error occurred during getCount';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }

  async increaseCount(
    params: IncreaseCountRequest,
  ): ApiResponse<IncreaseCountResponse> {
    try {
      const { publicKey, contextId, config, error } =
        prepareAuthenticatedRequestConfig();

      if (error) {
        return { error };
      }
      const response = await getJsonRpcClient().execute<
        IncreaseCountRequest,
        IncreaseCountResponse
      >(
        {
          contextId: contextId,
          method: ClientMethod.INCREASE_COUNT,
          argsJson: params,
          executorPublicKey: publicKey,
        },
        config,
      );
      if (response?.error) {
        return await this.handleError(response.error, {}, this.increaseCount);
      }

      return {
        data: Number(response?.result?.output) ?? null,
        error: null,
      };
    } catch (error) {
      console.error('increaseCount failed:', error);
      let errorMessage = 'An unexpected error occurred during increaseCount';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }

  async reset(): ApiResponse<ResetCounterResponse> {
    try {
      const { publicKey, contextId, config, error } =
        prepareAuthenticatedRequestConfig();
      if (error) {
        return { error };
      }

      const response = await getJsonRpcClient().execute<
        any,
        ResetCounterResponse
      >(
        {
          contextId: contextId,
          method: ClientMethod.RESET,
          argsJson: {},
          executorPublicKey: publicKey,
        },
        config,
      );
      if (response?.error) {
        return await this.handleError(response.error, {}, this.reset);
      }

      return {
        data: Number(response?.result?.output) ?? null,
        error: null,
      };
    } catch (error) {
      console.error('reset failed:', error);
      let errorMessage = 'An unexpected error occurred during reset';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      return {
        error: {
          code: 500,
          message: errorMessage,
        },
      };
    }
  }
}
