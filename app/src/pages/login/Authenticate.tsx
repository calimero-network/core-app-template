import React from 'react';
import { ClientLogin } from '@calimero-is-near/calimero-p2p-sdk';
import { useNavigate } from 'react-router-dom';
import { clearAppEndpoint, clearApplicationId } from '../../utils/storage';
import { getNodeUrl, getStorageApplicationId } from '../../utils/node';

export default function Authenticate() {
  const navigate = useNavigate();

  function onSetupClick() {
    clearAppEndpoint();
    clearApplicationId();
    navigate('/setup');
  }

  return (
    <>
      <div className="flex w-full h-screen bg-[#111111] relative">
        <div
          className="h-fit text-white p-4 cursor-pointer absolute"
          onClick={onSetupClick}
        >
          Return to setup
        </div>

        <div className="w-full h-full flex justify-items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="items-center bg-[#1C1C1C] p-8 gap-y-4 rounded-lg">
              <div className="flex justify-center items-center gap-3 px-14">
                <div className="text-white text-4xl font-semibold">
                  Only Peers
                </div>
              </div>
              <ClientLogin
                getNodeUrl={getNodeUrl}
                getApplicationId={getStorageApplicationId}
                sucessRedirect={() => navigate('/home')}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
