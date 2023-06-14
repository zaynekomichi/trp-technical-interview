'use client'
import OrderBookView from "./OrderBookView/page"
import TradingPairView from "./TradingPairView/page"

export default function Home() {
  return (
   <div className="m-5">
      <TradingPairView/>
      <OrderBookView/>
   </div>
  )
}
