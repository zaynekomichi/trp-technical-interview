'use client'

import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Inter } from 'next/font/google'
import TradingPairView from './TradingPairView/TradePairView';
import { useState } from 'react';
import { TokenContext } from './components/contexts';


const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'The Risk Protocol',
  description: 'Trade View',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //create global state for switching tokens
  const [currentTokens,setCurrentTokens] = useState({
    token_1:{
      symbol:"ZRX",
      address:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      logoURI:"https://assets.coingecko.com/coins/images/863/thumb/0x.png?1547034672"
    },
    token_2:{
      symbol:"WETH",
      address:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      logoURI:"https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295"
    }
  })
  return (
    <html lang="en">
      <body className={inter.className}  suppressHydrationWarning={true}>
        <TokenContext.Provider value={{currentTokens,setCurrentTokens}} className="container">
        <TradingPairView/>
        {children}
        </TokenContext.Provider>
      </body>
    </html>
  )
}
