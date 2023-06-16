'use client'
import { useState } from "react"
// import LiveOB from "./OrderBookView/LiveOB/page"
import CurrentStateOB from "./OrderBookView/CurrentStateOB/page"
import TradingPairView from "./TradingPairView/TradePairView"
import { TokenContext } from "./components/contexts"

export default function Home() {
  // const [currentTokens,setCurrentTokens] = useState({
  //   token_1:{
  //     symbol:"ZRX",
  //     address:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  //     logoURI:""
  //   },
  //   token_2:{
  //     symbol:"WETH",
  //     address:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  //     logoURI:""
  //   }
  // })
  return (
    // <TokenContext.Provider value={{currentTokens,setCurrentTokens}}>
   <div className="container-full">
    
      <div className="flex flex-row">
        {/* <div className="col-sm">
          <TradingPairView/>
        </div> */}
        <div className="col-sm">
          <CurrentStateOB/>
        </div>
      </div>
      {/* <div>
        <LiveOB/>
      </div> */}

   </div>
  //  </TokenContext.Provider>
  )
}
