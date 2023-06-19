'use client'
import { useEffect, useState } from "react"
import { OrderBookWebsocket } from "../../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../../components/contexts"
import { generalModal } from "../../components/cssStyles"



export default function LiveOB() {
    const { currentTokens, setCurrentTokens }: any = useContext(TokenContext)
    const [orderBookData, setOrderBookData] = useState<Array<any>>([])

    useEffect(() => {
        //websocket param details
        const webSocketData = {
            "type": "subscribe",
            "channel": "orders",
            "requestId": "123e4567-e89b-12d3-a456-426655440000",
            "makerToken": currentTokens.token_1.address,
            "takerToken": currentTokens.token_2.address,
        }
        const webSocketOB = OrderBookWebsocket()

        //open websocket connection
        webSocketOB.onopen = (res) => {
            //request data
            webSocketOB.send(JSON.stringify(webSocketData))
        }
        const webSocketResData = [...orderBookData]

        //get data
        webSocketOB.onmessage = (res) => {
            const resData = JSON.parse(res.data)
            webSocketResData.push(resData.payload[0].order)
            setOrderBookData(webSocketResData)
        }
        // webSocketOB.onerror=(err)=>{
        //     console.log(err)
        // }
    }, [currentTokens, orderBookData])


    return (
        <div className={`${generalModal} bg-dark`}>
            <h1 className="text-white">Live Order Book</h1>
            <table className="table table-striped table-responsive table-dark">
                <thead>
                    <tr>
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Taker Fees</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orderBookData?.slice(0, 10).map((item: any, index: number) => {

                            return (
                                <tr key={index}>
                                    <td><small>{item.makerAmount}</small></td>
                                    <td><small>{item.takerAmount}</small></td>
                                    <td><small>{item.takerTokenFeeAmount}</small></td>
                                </tr>
                            )
                        }).reverse() //reverse array to get latest results
                    }
                </tbody>
            </table>
        </div>
    )
}