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

import { TokenContract } from "./Components/token"
import { GiveTips } from "./Components/giveTips";

const bundler: IBundler = new Bundler({
bundlerUrl: "https://bundler.biconomy.io/api/v2/80001/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    	chainId: ChainId.POLYGON_MUMBAI,
    	entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
});

const paymaster: IPaymaster = new BiconomyPaymaster({
paymasterUrl: `https://paymaster.biconomy.io/api/v1/80001/${import.meta.env.VITE_API_KEY}`,
});

function App() {
  

const [smartAccount, setSmartAccount] = useState<any>(null);
const [interval, enableInterval] = useState(false);
const sdkRef = useRef<SocialLogin | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [provider, setProvider] = useState<any>(null);

async function login() {
    if (!sdkRef.current) {
        const socialLoginSDK = new SocialLogin();
        const signature1 = await socialLoginSDK.whitelistUrl(
            "http://127.0.0.1:5173/"
        );
        await socialLoginSDK.init({
            chainId: ethers.utils.hexValue(ChainId.POLYGON_MUMBAI).toString(),
            network: "testnet",
            whitelistUrls: {
                "http://127.0.0.1:5173/": signature1,
            },
        });
        sdkRef.current = socialLoginSDK;
    }
    if (!sdkRef.current.provider) {
        sdkRef.current.showWallet();
        enableInterval(true);
    } else {
        setupSmartAccount();
    }
}

async function setupSmartAccount() {
    if (!sdkRef?.current?.provider) return;
    sdkRef.current.hideWallet();
    setLoading(true);
    const web3Provider = new ethers.providers.Web3Provider(
        sdkRef.current.provider
    );
    setProvider(web3Provider);

    const module = await ECDSAOwnershipValidationModule.create({
      signer: web3Provider.getSigner(),
      moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
    });

    try {
      const biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: ChainId.POLYGON_MUMBAI,
        bundler: bundler,
        paymaster: paymaster, 
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: module,
        activeValidationModule: module
    })

    
      console.log(`address: , ${await biconomySmartAccount.getAccountAddress()}`)
      
      console.log(`deployed: , ${await biconomySmartAccount.isAccountDeployed(biconomySmartAccount.accountAddress)}`)

      setSmartAccount(biconomySmartAccount)
      setLoading(false)
    } catch (err) {
        console.log("error setting up smart account... ", err);
    }
}

const logout = async () => {
    if (!sdkRef.current) {
        console.error("Web3Modal not initialized.");
        return;
    }
    await sdkRef.current.logout();
    sdkRef.current.hideWallet();
    setSmartAccount(null);
    enableInterval(false);
};



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
         {!smartAccount && !loading && (

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
                onClick={login}
                className="inline-block bg-teal-500 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Log in
              </button>
            </div>
          </div>
          )}
        {loading && <p>Loading account details...</p>}
        {smartAccount && (
 <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                {smartAccount.accountAddress}
              </a>
            </div>
            <div>
              <button
                onClick={logout}
                className="inline-block bg-teal-500 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Log out
              </button>
            </div>
          </div>
        )}

      </nav>
      <div className={`flex min-h-screen flex-col items-start p-24`}>
         {!smartAccount ? (

            <div className="text-gray-900">
              Click the Button above to Connect your Wallet
            </div>
             ) : (
              
        <div className={`grid gap-48 grid-cols-2 grid-rows-2 m-6`}>
          <div>
               {/*  */}

<TokenContract smartAccount={smartAccount} />
<GiveTips smartAccount={smartAccount}  />

              
            </div>
            <div>
              <p className="mb-2 block text-lg font-medium leading-6 text-gray-900">
                To test the DEMO, mint MTK Tokens
              </p>
              <p className="mb-2 block text-sm font-medium leading-6 text-gray-900">
                The MTK Token is 18 decimal places. 
              </p>
              <p className="block text-sm font-medium leading-6 text-gray-900">
                Calling the Give Tip will also approve the amount you wish to
                Tip.
              </p>
            </div>
          </div> 
          
        )}

</div>
     
    </>
  );
}

export default App;
