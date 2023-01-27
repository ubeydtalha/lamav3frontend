'use client';
import { Container } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles';

import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletDialogProvider} from '@solana/wallet-adapter-material-ui';
import { clusterApiUrl } from '@solana/web3.js';

import {WalletModalProvider } from '@solana/wallet-adapter-react-ui'

type Props = {}
require('@solana/wallet-adapter-react-ui/styles.css');
const Wallet: FC = ({children}) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletDialogProvider>
                    <StyledEngineProvider injectFirst >
                        <Container disableGutters={true}>
                            {children}
                        </Container>
                    </StyledEngineProvider>
                </WalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}


export default Wallet