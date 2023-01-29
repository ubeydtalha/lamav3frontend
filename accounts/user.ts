import * as anchor from "@project-serum/anchor";
import { Program, Provider } from "@project-serum/anchor";
import { Wallet } from "@solana/wallet-adapter-react";


export async function createUserStatePDA(
    program: Program,
    provider: Provider,
    wallet: Wallet,
) {
    const userState = anchor.web3.PublicKey.findProgramAddressSync(
        [
            anchor.utils.bytes.utf8.encode('user_state'),
            wallet.adapter.publicKey.toBuffer(),
        ],
        program.programId
    )[0]
    return userState;
}


export  async function getUserStateInfoFromProgram(
    program: Program,
    provider: Provider,
    wallet: Wallet,
    userState: anchor.web3.PublicKey
) {
    const userInfo = await program.account.userState.fetch(userState);
    return userInfo;
}

export  async function createUserStateFromProgram(
    program: Program,
    provider: Provider,
    wallet: Wallet,
    userStatePDA: anchor.web3.PublicKey
) {

    if (!wallet.adapter.publicKey) {
        throw new Error("Wallet not connected");
    }
    
    let userBalance = await provider.connection.getBalance(wallet.adapter.publicKey);

    let minFee = await provider.connection.getMinimumBalanceForRentExemption(
        1001 + 256 // !!!dont Change if u don't know; this 1001 for userState and 256 for sure guartienteed
    );

    if (userBalance < minFee) {
        throw new Error("Insufficient balance");
    }

    let response : any;
    try {
        response = await program.methods.createUserState().accounts(
            {
                owner: wallet.adapter.publicKey,
                userState: userStatePDA,
                systemProgram: anchor.web3.SystemProgram.programId,
            }
        )
        .rpc();
    } catch (error) {
        if (!error.message.includes("UserStateAlreadyInitialized")) {
            throw error;
        }
    }
    return response;
}