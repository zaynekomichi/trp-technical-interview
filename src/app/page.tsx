'use client'
import { useState } from "react"
import OrderBookView from "./OrderBookView/page"
import TradingPairView from "./TradingPairView/page"
import { TokenContext } from "./components/contexts"

export default function Home() {
  const [currentTokens,setCurrentTokens] = useState({
    token_1:{
      symbol:"ZRX",
      address:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
    token_2:{
      symbol:"WETH",
      address:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    }
  })
  return (
   <div className="m-5">
    <TokenContext.Provider value={{currentTokens,setCurrentTokens}}>
      <div className="d-flex flex-wrap justify-content-evenly">
      <OrderBookView />
      <TradingPairView/>
      </div>
    </TokenContext.Provider>
   </div>
  )
}
