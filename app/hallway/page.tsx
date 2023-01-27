'use client';
import React, { useEffect, useMemo, useState } from 'react'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { Container, Typography , Box } from '@mui/material'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, web3, AnchorProvider } from '@project-serum/anchor';

import * as anchor from '@project-serum/anchor';
import idl from '@/idl/community.json';
import type { UserState } from '@/interfaces';
type Props = {}

function Hallway({ }: Props) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
   
    return (
        <div>
            {publicKey && connection ? (
                <Container disableGutters={true} maxWidth={"xl"}>
                    <Typography variant="h2" component="div" gutterBottom >
                        You should join a community or create one for use LamaV3!
                    </Typography>



                </Container>) : (
                <Container disableGutters={true} maxWidth={"xl"}>
                    <Typography variant="h2" component="div" gutterBottom >
                        You should connect your wallet to use LamaV3!
                    </Typography>
                </Container>)
            }
        </div>
    )
}

export default Hallway