import { createUserStateFromProgram , getUserStateInfoFromProgram , createUserStatePDA } from '@/accounts/user';
import { PublicKey } from '@solana/web3.js';
import  idl  from '@/idl/community.json';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {UserState} from '@/interfaces';
import { Program, Provider,PublicKey } from "@project-serum/anchor";
import { HYDRATE } from "next-redux-wrapper";

interface initialState  {
    user_state_PDA: PublicKey | null,
    user_state: UserState,
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: null | any,
    errorMessage: null | any,
};

const initialState  = {
    user_state: {},
    status: 'idle',
    error: null,
    errorMessage: null,
};

export const createUserState = createAsyncThunk(
    'user/createUserState',
    async (data,thunkAPI) => {
        const {program} = thunkAPI.getState().system;
        const {wallet} = thunkAPI.getState().system;
        const {provider} = thunkAPI.getState().system;
        const user_state_PDA = thunkAPI.getState().user.user_state_PDA || await createUserStatePDA(program, provider, wallet);
        const reponse = await createUserStateFromProgram(program, wallet,);
        return reponse, user_state_PDA;
    }
)


export const getUserStateInfo = createAsyncThunk(
    'user/getUserStateInfo',
    async (data,thunkAPI) => {
        const {program} = thunkAPI.getState().system;
        const {wallet} = thunkAPI.getState().system;
        const {user_state_PDA} = thunkAPI.getState().user;
        const user_state = await getUserStateInfoFromProgram(program, wallet, user_state_PDA);
        return user_state;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        [HYDRATE]: (state, action) =>  {
            return {...state,
                ...action.payload.auth};
          },
        setUserState: (state, action) => {
            state.user_state = action.payload;
        },
        resetErrorMessage: (state) => {
            state.errorMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserState.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createUserState.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user_state_PDA = action.payload[1];
                state.system.transactionHistory.push(action.payload[0]);
            })
            .addCase(createUserState.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
                state.errorMessage = action.error.message;
            })
            .addCase(getUserStateInfo.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(getUserStateInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user_state = action.payload;
            })
            .addCase(getUserStateInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
                state.errorMessage = action.error.message;
            })
    }
});


export const { hydrate, setUserState, resetErrorMessage } = userSlice.actions;

export default userSlice.reducer;