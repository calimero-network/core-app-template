import { ResponseData } from '@calimero-is-near/calimero-p2p-sdk';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ClientApiDataSource } from '../../api/dataSource/ClientApiDataSource';
import {
  GetCountRequest,
  GetCountResponse,
  IncreaseCountRequest,
  IncreaseCountResponse,
} from '../../api/clientApi';

const FullPageCenter = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #111111;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TextStyle = styled.div`
  color: white;
  margin-bottom: 2em;
  font-size: 2em;
`;

const Button = styled.div`
  color: white;
  padding: 0.25em 1em;
  border-radius: 8px;
  font-size: 2em;
  background: #5dbb63;
  cursor: pointer;
  justify-content: center;
  display: flex;
`;

const StatusTitle = styled.div`
  color: white;
  justify-content: center;
  display: flex;
`;

const StatusValue = styled.div`
  color: white;
  font-size: 60px;
  justify-content: center;
  display: flex;
`;

export default function HomePage() {
  const [count, setCount] = useState<number | null>(null);

  async function increaseCounter() {
    const params: IncreaseCountRequest = {
      count: 1,
    };
    const result: ResponseData<IncreaseCountResponse> =
      await new ClientApiDataSource().increaseCount(params);
    if (result.error) {
      console.log('Error:', result.error);
      return;
    }
    if (result.data) {
      setCount(result.data);
    }
  }

  async function getCount() {
    const params: GetCountRequest = {};
    const result: ResponseData<GetCountResponse> =
      await new ClientApiDataSource().getCount(params);
    if (result.error) {
      console.log('Error:', result.error);
      return;
    }
    if (result.data) {
      console.log('Count:', result.data);
      setCount(result.data.count);
    } else {
      console.log('Error:', result.error);
    }
  }

  useEffect(() => {
    getCount();
  }, []);

  return (
    <FullPageCenter>
      <TextStyle>
        <span> Welcome to home page!</span>
      </TextStyle>

      <StatusTitle> Current count is:</StatusTitle>
      <StatusValue> {count ?? '-'}</StatusValue>
      <Button onClick={increaseCounter}> + 1</Button>
    </FullPageCenter>
  );
}
