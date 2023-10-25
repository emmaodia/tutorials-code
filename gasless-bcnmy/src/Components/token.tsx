import React, { useState } from "react";
import { BiconomySmartAccount} from "@biconomy/account"
import {  IHybridPaymaster,SponsorUserOperationDto, PaymasterMode,} from '@biconomy/paymaster'
import { ethers } from "ethers";

interface Props {
  smartAccount: BiconomySmartAccount
}

export const TokenContract: React.FC<Props> = ({ smartAccount }) => {

const [amount, setAmount] = useState<number>(0);

const tokenAddress = "0x317E4C04C7fDf44fa72bC997AeCe1b691159F95F";

const mintTokens = async () => {
    try {
const mintTx = new ethers.utils.Interface([
   "function mint(uint256 amount)",
 ]);
 
const data = mintTx.encodeFunctionData("mint", [amount]);

const tx1 = {
        to: tokenAddress,
        data: data,
      };

const partialUserOp = await smartAccount.buildUserOp([tx1]);
console.log(partialUserOp)

const biconomyPaymaster =
        smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;

        const paymasterServiceData: SponsorUserOperationDto = {
        mode: PaymasterMode.SPONSORED,
         smartAccountInfo: {
          name: 'BICONOMY',
          version: '2.0.0'
        },
        // optional params...
      };
try {
          const paymasterAndDataResponse =
          await biconomyPaymaster.getPaymasterAndData(
            partialUserOp,
            paymasterServiceData
          );

        partialUserOp.paymasterAndData =
          paymasterAndDataResponse.paymasterAndData;

        const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
        const transactionDetails = await userOpResponse.wait();

        console.log("Transaction Details:", transactionDetails);
        console.log("Transaction Hash:", userOpResponse.userOpHash);

        } catch (e) {
        console.error("Error executing transaction:", e);
        }


 } catch (error) {
      console.log({ error });
    }

   
}
 const handleAmount = (event: React.ChangeEvent<HTMLElement>) => {
    const { value } = event.target as unknown as { value: number };
    setAmount(value);}

    return(
      <>
        <div className="w- rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-600 sm:max-w-md">
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  autoComplete="amount"
                  onChange={handleAmount}
                  className="block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-700 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="$"
                />
              </div>

              <div className="mt-6 gap-x-6">
                <button
                  type="submit"
                  onClick={mintTokens}
                  className="mb-28 rounded-md w-40 bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                >
                  Mint Token
                </button>
              </div>
              </>
    )
};
