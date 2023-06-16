'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Inter } from 'next/font/google'
import TradingPairView from './TradingPairView/TradePairView';
import { useContext,useState } from 'react';
import { TokenContext } from './components/contexts';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Risk Protocol',
  description: 'Trade View',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [currentTokens,setCurrentTokens] = useState({
    token_1:{
      symbol:"ZRX",
      address:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      logoURI:""
    },
    token_2:{
      symbol:"WETH",
      address:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      logoURI:""
    }
  })
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenContext.Provider value={{currentTokens,setCurrentTokens}}>
        <TradingPairView/>
        {children}
        </TokenContext.Provider>
      </body>
    </html>
  )
}
