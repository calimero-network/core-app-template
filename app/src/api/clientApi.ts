import { ApiResponse } from '@calimero-is-near/calimero-p2p-sdk';

export interface GetCountRequest {}

export interface GetCountResponse {
  count: number;
}

export interface IncreaseCountRequest {
  count: number;
}

export interface IncreaseCountResponse {}

export interface ResetRequest {}

export interface ResetResponse {}

export enum ClientMethod {
  GET_COUNT = 'get_count',
  INCREASE_COUNT = 'increase_count',
  RESET = 'reset',
}

export interface ClientApi {
  getCount(params: GetCountRequest): ApiResponse<GetCountResponse>;
  increaseCount(
    params: IncreaseCountRequest,
  ): ApiResponse<IncreaseCountResponse>;
  reset(params: ResetRequest): ApiResponse<ResetResponse>;
}
