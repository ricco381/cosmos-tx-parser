import {Any} from "cosmjs-types/google/protobuf/any";
import {MsgSend} from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {TxAction} from "../types";

export function parseMsgSend(message: Any): TxAction[] {
    const value = MsgSend.decode(message.value);

    return value.amount.map((item) => ({
        from: value.fromAddress,
        to: value.toAddress,
        amount: item,
    }))
}