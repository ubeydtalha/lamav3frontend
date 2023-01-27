import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection, PublicKey } from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from '@/idl/community.json';


export default function userHandler(
    req: NextApiRequest,
    res: NextApiResponse<User>
  ) {
    const { query, method } = req
    const id = query.id as string
    const name = query.name as string
  
    switch (method) {
      case 'GET':
        // Get data from your database
        res.status(200).json({ id, name: `User ${id}` })
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({ id, name: name || `User ${id}` })
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }