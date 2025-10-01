"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMsgSend = parseMsgSend;
const tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
function parseMsgSend(message) {
    const value = tx_1.MsgSend.decode(message.value);
    return value.amount.map((item) => ({
        from: value.fromAddress,
        to: value.toAddress,
        amount: item,
    }));
}
//# sourceMappingURL=send.parser.js.map