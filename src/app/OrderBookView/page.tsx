'use client'
import { useEffect,useState } from "react"
import { OrderBookWebsocket, getOrderBook} from "../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../components/contexts"
import { generalModal } from "../components/cssStyles"


export default function OrderBookView(){
    const {currentTokens,setCurrentTokens}:any = useContext(TokenContext)
    const [orderBookData,setOrderBookData] =useState<Array<any>>([])

    useEffect(()=>{
        getOrderBook(currentTokens).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        const webSocketData = {
            "type": "subscribe",
            "channel": "orders",  
            "requestId": "123e4567-e89b-12d3-a456-426655440000", 
            "makerToken":currentTokens.token_1.address,
            "takerToken":currentTokens.token_2.address,
        }
        const webSocketOB = OrderBookWebsocket()
        webSocketOB.onopen=(res)=>{
            console.log(res)
            webSocketOB.send(JSON.stringify(webSocketData))
         }
       const webSocketResData = [...orderBookData]
        webSocketOB.onmessage=(res)=>{
        const resData = JSON.parse(res.data)
        webSocketResData.push(resData.payload[0].order)
            setOrderBookData(webSocketResData)
        }
    },[currentTokens])


    return(
        <div>
            <div>
                <h1>Order Book State- {currentTokens.token_1.symbol}|{currentTokens.token_2.symbol}</h1>
            </div>
            <div className="d-flex flex-wrap justify-content-between">
            <div className={generalModal}>
                <h1>Current State</h1>
                
            <table className="table table-striped tableProp">
                <thead>
                    <tr>
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Total - USD</th>
                    </tr>
                </thead>
           
            <tbody>
                {
                    orderBookData?.map((item:any,index:number)=>{
                       
                        return(
                            <tr key={index}>
                                <td><small>{item.makerAmount}</small></td>
                                <td><small>{item.takerAmount}</small></td>
                                <td><small>{item.takerTokenFeeAmount}</small></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            </div>
            
            <div className={generalModal}>
                <h1>Live Orders</h1>
                
            <table className="table table-striped tableProp overflow">
                <thead>
                    <tr>
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Total - USD</th>
                    </tr>
                </thead>
           
            <tbody>
                {
                    orderBookData?.map((item:any,index:number)=>{
                       
                        return(
                            <tr key={index}>
                                <td><small>{item.makerAmount}</small></td>
                                <td><small>{item.takerAmount}</small></td>
                                <td><small>{item.takerTokenFeeAmount}</small></td>
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