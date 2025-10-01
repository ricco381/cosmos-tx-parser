import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
export type Response = {
    height: number;
    hash: string;
    code: number;
    actions: TxAction[];
};
export type TxAction = {
    from: string;
    to: string;
    amount: Coin;
};
