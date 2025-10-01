"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMsgMultiSend = parseMsgMultiSend;
const tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
function parseMsgMultiSend(message) {
    const { inputs, outputs } = tx_1.MsgMultiSend.decode(message.value);
    if (outputs.length === 0)
        return [];
    const from = inputs[0];
    const result = [];
    for (const output of outputs) {
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
//# sourceMappingURL=multisend.parser.js.map