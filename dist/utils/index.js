"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.txDecode = txDecode;
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
function txDecode(tx) {
    const bytes = Buffer.from(tx, 'base64');
    return tx_1.Tx.decode(bytes);
}
//# sourceMappingURL=index.js.map