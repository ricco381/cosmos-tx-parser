"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsingFromWs = parsingFromWs;
exports.parsingFromRpc = parsingFromRpc;
const multisend_parser_1 = require("./parsers/multisend.parser");
const send_parser_1 = require("./parsers/send.parser");
const utils_1 = require("./utils");
function parsingFromWs(raw) {
    const { data } = raw;
    if (!data)
        return;
    const { TxResult } = data.value;
    const tx = (0, utils_1.txDecode)(TxResult.tx);
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
function parsingFromRpc(raw) {
    const { hash, tx_result, tx, height } = raw;
    const { code } = tx_result;
    const actions = actionParsers((0, utils_1.txDecode)(tx));
    return {
        height: height,
        hash: hash,
        code: code,
        actions: actions
    };
}
function actionParsers(tx) {
    const messages = tx.body.messages;
    const actions = [];
    for (const message of messages) {
        const type = message.typeUrl ?? message['@type'];
        if (type === "/cosmos.bank.v1beta1.MsgMultiSend") {
            let messages = (0, multisend_parser_1.parseMsgMultiSend)(message);
            actions.push(...filterFromAtom(messages));
        }
        else if (type === "/cosmos.bank.v1beta1.MsgSend") {
            let messages = (0, send_parser_1.parseMsgSend)(message);
            actions.push(...filterFromAtom(messages));
        }
    }
    return actions;
}
function filterFromAtom(results) {
    return results.filter((i) => i.amount.denom === 'uatom');
}
//# sourceMappingURL=index.js.map