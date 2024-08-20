import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58"

export const generate_mnemonic_phrase = () => {
    return generateMnemonic()
}


export const create_new_wallet = (mnemonic:string, wallet_number:number) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const derivationPath = `m/44'/501'/${wallet_number}'/0'`;
    const { key } = derivePath(derivationPath, seed.toString('hex'));
    const keypair = nacl.sign.keyPair.fromSeed(key);
    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
}


export const get_wallets_from_mnemonic = (mnemonic:string, number_of_wallets:number) : null | { public_key:string, private_key:string }[] => {
    const seed = mnemonicToSeedSync(mnemonic);
    const output: { public_key:string, private_key:string }[] = [];
    if(number_of_wallets < 1) {
        return null
    } else {
        for(let i = 0; i < number_of_wallets; i++) {
            const derivationPath = `m/44'/501'/${i}'/0'`;
            const { key } = derivePath(derivationPath, seed.toString('hex'));
            const keypair = nacl.sign.keyPair.fromSeed(key);
            const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
            output.push({public_key: solanaKeypair.publicKey.toBase58(), private_key:bs58.encode(solanaKeypair.secretKey)})
        }
        return output
    }
}