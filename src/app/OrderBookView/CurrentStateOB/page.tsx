'use client'
import { useEffect,useState } from "react"
import { OrderBookWebsocket, getOrderBook} from "../../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../../components/contexts"
import { generalModal } from "../../components/cssStyles"
interface orderType{
    order:{
        makerAmount:string,
        takerAmount:string,

    }
}
interface OrderBookDataType{
    asks:orderType[],
    bids:orderType[]
}
export default function CurrentStateOB(){
    const {currentTokens,setCurrentTokens}:any = useContext(TokenContext)
    const [orderBookData,setOrderBookData] =useState<OrderBookDataType>()

    useEffect(()=>{
        getOrderBook(currentTokens).then(res=>{
           console.log(res)
           setOrderBookData({...CurrentStateOB, asks:[...res.data.asks.records], bids:[...res.data.bids.records]})
        }).catch(err=>{
            console.log(err)
        },)
    },[currentTokens])


    return(
        <div className="">
           
            <div className="d-flex flex-wrap justify-content-between">
            <div className={`${generalModal} col-sm bg-dark`}>
                <h4 className="text-white">Asks</h4>
                
            <table className="table table-striped table-dark">
                <thead>
                    <tr >
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Taker Fees</th>
                    </tr>
                </thead>
           
            <tbody>
                {
                    orderBookData?.asks?.map((item:any,index:number)=>{
                       
                        return(
                            <tr key={index} className="tr">
                                <td><small>{item.order.makerAmount}</small></td>
                                <td><small>{item.order.takerAmount}</small></td>
                                <td><small>{item.order.takerTokenFeeAmount}</small></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            </div>
            
            <div className={`${generalModal} col-sm bg-dark`}>
                <h4 className="text-white">Bids</h4>
                
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Taker Fees</th>
                    </tr>
                </thead>
           
            <tbody>
                {
                    orderBookData?.bids?.map((item:any,index:number)=>{
                       
                        return(
                            <tr key={index}>
                                <td><small>{item.order.makerAmount}</small></td>
                                <td><small>{item.order.takerAmount}</small></td>
                                <td><small>{item.order.takerTokenFeeAmount}</small></td>
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