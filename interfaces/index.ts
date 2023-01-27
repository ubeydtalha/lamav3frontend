import {PublicKey} from '@solana/web3.js'
import * as anchor from '@project-serum/anchor'

export type UserState = {
    owner : PublicKey,
    is_initialized : boolean,
    joined_communities : Array<PublicKey>,
    moderated_communities : Array<PublicKey>,
    owned_communities : Array<PublicKey>,
    bump : anchor.BN,
}


export type Community = {
    name: String,
    id: anchor.BN,
    owner: PublicKey,
    is_initialized: boolean,
    token_mint: PublicKey,
    token_account: PublicKey, 
    bump: anchor.BN,
    users: Array<PublicKey>,
    moderators: Array<PublicKey>
    wallet: PublicKey,
    products: Array<PublicKey>,
    is_public: boolean,
}   

export type Product = {
    title: String,
    description: String,
    image_url: String,
    value: number,
    price: number,
    old_price: number,
    id: anchor.BN,
    bump: anchor.BN,
    community: PublicKey,
    is_initialized: boolean,
}

export type CommunityMember = {
    name: String,
    id: anchor.BN,
    owner: PublicKey,
    is_initialized: boolean,
    token_mint: PublicKey,
    token_account: PublicKey, 
    bump: anchor.BN,
    profile_picture_url: String,
}