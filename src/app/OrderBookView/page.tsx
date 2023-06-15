'use client'
import { useEffect,useState } from "react"
import { OrderBookWebsocket, getOrderBook } from "../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../components/contexts"
import { generalModal } from "../components/cssStyles"


export default function OrderBookView(){
    const {currentTokens,setCurrentTokens}:any = useContext(TokenContext)
    const [orderBookData,setOrderBookData] =useState<Array<any>>([])

    useEffect(()=>{
        const webSocketData = {
            "type": "subscribe",
            "channel": "orders",  
            "requestId": "123e4567-e89b-12d3-a456-426655440000", 
            "makerToken":currentTokens.token_1.address,
            "takerToken":currentTokens.token_2.address
        }
        const webSocketOB = OrderBookWebsocket()
        webSocketOB.onopen=(res)=>{
            console.log(res)
            webSocketOB.send(JSON.stringify(webSocketData))
         }
       
        webSocketOB.onmessage=(res)=>{
            console.log(res.data.payload.order)
            // setOrderBookData([...orderBookData,JSON.parse(res.data.payload.order)])
        }
    },[])


    return(
        <div className={generalModal}>
            <div>
                <h1>Order Book- {currentTokens.token_1.symbol}|{currentTokens.token_2.symbol}</h1>
            </div>
            <div className="flex">
            <div>
                <h1>Asks</h1>
                
            <table>
                <thead>
                    <tr>
                        <th>Price - USD</th>
                        <th>Quantity - USD</th>
                        <th>Total - USD</th>
                    </tr>
                </thead>
           
            <tbody>
                {
                    orderBookData?.map((item:any,index:number)=>{
                       
                        return(
                            <tr key={index}>
                                <td>{item.order.makerAmount}</td>
                                <td>{item.order.takerAmount}</td>
                                <td>{item.order.takerTokenFeeAmount}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            </div>
            </div>
            
        </div>
    )
}