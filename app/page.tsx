
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

import Main from '@/main/Main'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Main/>

    </div>
  )
}
