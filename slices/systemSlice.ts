import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Program }  from "@project-serum/anchor";
import {idl,idlJSON} from "@/idl/idl";
import { Connection } from '@solana/web3.js';
import { Wallet , WalletContext } from "@solana/wallet-adapter-react";
import { ConnectionConfig , Commitment} from "@solana/web3.js";
import { HYDRATE } from "next-redux-wrapper";



interface initialState  {
    program : Program | null ,
    provider : Provider | null,
    walletContext : WalletContext | null,
    wallet : Wallet | null,
    network : String | null,
    connection : Connection | null,
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    connectionStatus: 'idle' | 'pending' | 'succeeded' | 'failed',
    providerStatus: 'idle' | 'pending' | 'succeeded' | 'failed',
    walletstatus : 'idle' | 'pending' | 'succeeded' | 'failed',
    connectionOpts : ConnectionConfig | Commitment,
    error: null | any,
    transactionHistory : []
};


const initialState = {
    program : null ,
    provider : null,
    walletContext : null,
    wallet : null,
    network : "https://api.devnet.solana.com",
    connection : null,
    status: 'idle',
    connectionStatus: 'idle',
    providerStatus: 'idle',
    walletstatus : 'idle',
    connectionOpts : {
        commitment : "confirmed",
        preflightCommitment : "processed",
        skipPreflight : false,
    },
    error: null,
    transactionHistory : []
};

export const createConnection = createAsyncThunk(
    'system/createConnection',
    async (network : String = "",thunkAPI) => {
        if (network === "") {
            network = thunkAPI.getState().system.network;
        }
        const connection = new Connection(network, "confirmed");
        return connection;
    })

export const createProvider = createAsyncThunk(
    'system/createProvider',
    async (data,thunkAPI) => {
        const {network} = thunkAPI.getState().system;
        const {connection } = thunkAPI.getState().system;
        const {wallet} = thunkAPI.getState().system;
        const provider = new Provider(connection, wallet, {
            preflightCommitment: "processed",
        });
        return provider;
    }
)


export const createProgram = createAsyncThunk(
    'system/createProgram',
    async (data,thunkAPI) => {
        const {provider} = thunkAPI.getState().system;
        const program = new Program(idlJSON, idl.metadata.address, provider);
        return program;
    }
)


export const systemSlice = createSlice({
    name: 'system',
    initialState,
    reducers: {
        [HYDRATE]: (state, action) =>  {
            return {...state,
            ...action.payload.auth};
          },
        setWallet: (state, action) => {
            state.wallet = action.payload;
        },
        setNetwork: (state, action) => {
            state.network = action.payload;
        },
        setWalletContext: (state, action) => {
            state.walletContext = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createConnection.pending, (state) => {
                state.connectionStatus = 'pending';
            })
            .addCase(createConnection.fulfilled, (state, action) => {
                state.connectionStatus = 'succeeded';
                state.connection = action.payload;
            })
            .addCase(createConnection.rejected, (state, action) => {
                state.connectionStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(createProvider.pending, (state) => {
                state.providerStatus = 'pending';
            })
            .addCase(createProvider.fulfilled, (state, action) => {
                state.providerStatus = 'succeeded';
                state.provider = action.payload;
            })
            .addCase(createProvider.rejected, (state, action) => {
                state.providerStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(createProgram.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createProgram.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.program = action.payload;
            })
            .addCase(createProgram.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }

})

export const { hydrate, setWallet, setNetwork, setWalletContext } = systemSlice.actions;

export default systemSlice.reducer;