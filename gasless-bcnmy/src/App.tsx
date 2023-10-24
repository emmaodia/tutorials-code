import "./App.css";
import "@Biconomy/web3-auth/dist/src/style.css";
import SocialLogin from "@biconomy/web3-auth";
import { ChainId } from "@biconomy/core-types";
import { ethers } from 'ethers'
import { IBundler, Bundler } from '@biconomy/bundler'
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account"
import { IPaymaster, BiconomyPaymaster,} from '@biconomy/paymaster'
import { useState, useEffect, useRef } from "react";
import {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";


function App() {
  const bundler: IBundler = new Bundler({
bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    	chainId: ChainId.POLYGON_MUMBAI,
    	entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster: IPaymaster = new BiconomyPaymaster({
paymasterUrl: "https://paymaster.biconomy.io/api/v1/80001/<Your-API-Key>",
});

const [smartAccount, setSmartAccount] = useState<any>(null);
const [interval, enableInterval] = useState(false);
const sdkRef = useRef<SocialLogin | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [provider, setProvider] = useState<any>(null);

useEffect(() => {
    let configureLogin: any;
    if (interval) {
        configureLogin = setInterval(() => {
            if (!!sdkRef.current?.provider) {
                setupSmartAccount();
                clearInterval(configureLogin);
            }
        }, 1000);
    }
}, [interval]);


  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">DEMO</span>
        </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Welcome
              </a>
            </div>
            <div>
              <button
                // onClick={login}
                className="inline-block bg-teal-500 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Log in
              </button>
            </div>
          </div>
      </nav>
      <div className={`flex min-h-screen flex-col items-start p-24`}>
          <div>
            <div className="text-gray-900">
              Click the Button above to Connect your Wallet
            </div>
          </div>
      </div>
    </>
  );
}

export default App;
