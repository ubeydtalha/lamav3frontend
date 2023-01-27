import './globals.css'
import Navbar from '@/components/Navbar'
import Wallet from '@/components/MyBody'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*;
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      
      <body>
        <div className='bg'>
          <div className="blur">
            
          </div>
        </div>
        <Wallet>
          <Navbar/>
            {children}
        </Wallet>
      </body>
    </html>
  )
}
