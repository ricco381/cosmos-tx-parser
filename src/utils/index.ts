import {Tx} from "cosmjs-types/cosmos/tx/v1beta1/tx";

export function txDecode(tx: string): Tx {
    const bytes = Buffer.from(tx, 'base64');
    return Tx.decode(bytes);
}