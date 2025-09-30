import {Tx} from "cosmjs-types/cosmos/tx/v1beta1/tx";
import {parseMsgMultiSend} from "./parsers/multisend.parser";
import {parseMsgSend} from "./parsers/send.parser";
import {Response, TxAction} from "./types";
import {txDecode} from "./utils";

export function parsingFromWs(raw: any): Response {
    const {data} = raw;
    if (!data) return;

    const {TxResult} = data.value;
    const tx: Tx = txDecode(TxResult.tx);
    const events = raw.events;

    const actions = actionParsers(tx);
    const block = TxResult.height;

    return {
        height: block,
        hash: events['tx.hash'][0],
        code: 0,
        actions: actions
    };
}

export function parsingFromRpc(raw: any): Response {
    const {hash, tx_result, tx, height} = raw;
    const {code} = tx_result;

    const actions = actionParsers(txDecode(tx));

    return {
        height: height,
        hash: hash,
        code: code,
        actions: actions
    };
}

function actionParsers(tx: Tx): TxAction[] {
    const messages = tx.body.messages;
    const actions: TxAction[] = [];

    for (const message of messages) {
        const type = message.typeUrl ?? message['@type'];

        if (type === "/cosmos.bank.v1beta1.MsgMultiSend") {
            let messages = parseMsgMultiSend(message);
            actions.push(...filterFromAtom(messages));
        } else if (type === "/cosmos.bank.v1beta1.MsgSend") {
            let messages = parseMsgSend(message);
            actions.push(...filterFromAtom(messages));
        }
    }

    return actions;
}

function filterFromAtom(results: TxAction[]): TxAction[] {
    return results.filter((i) => i.amount.denom === 'uatom')
}