import React from 'react';
import styled from 'styled-components';

const FullPageCenter = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #111111;
  justify-content: center;
  align-items: center;
`;

export default function HomePage() {
  return (
    <FullPageCenter>
      <span> Welcome to home page </span>
    </FullPageCenter>
  );
}
