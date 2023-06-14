'use client'
import { useState } from "react"
import OrderBookView from "./OrderBookView/page"
import TradingPairView from "./TradingPairView/page"
import { TokenContext } from "./components/contexts"

export default function Home() {
  const [currentTokens,setCurrentTokens] = useState({
    token_1:{
      symbol:"SRM",
      address:"0x20775d300BdE943Ac260995E977fb915fB01f399"
    },
    token_2:{
      symbol:"SRM",
      address:"0x20775d300BdE943Ac260995E977fb915fB01f399"
    }
  })
  return (
   <div className="m-5">
    <TokenContext.Provider value={{currentTokens,setCurrentTokens}}>
      <TradingPairView/>
      <OrderBookView/>
    </TokenContext.Provider>
   </div>
  )
}
