import {Any} from "cosmjs-types/google/protobuf/any";
import {MsgMultiSend} from "cosmjs-types/cosmos/bank/v1beta1/tx";
import {TxAction} from "../types";

export function parseMsgMultiSend(message: Any): TxAction[] {
    const {inputs, outputs} = MsgMultiSend.decode(message.value);

    if (outputs.length === 0) return [];

    const from = inputs[0];
    const result: TxAction[] = [];

    for (const  output of outputs) {
        for (const coin of output.coins) {
            result.push({
                from: from.address,
                to: output.address,
                amount: coin,
            });
        }
    }

    return result;
}