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
           
            <div className="row m-3">
            <div className={`${generalModal} col-sm m-2`}>
                <h4>Asks</h4>
                
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Total - USD</th>
                    </tr>
                </thead>
           
            <tbody>
                {
                    orderBookData?.asks?.map((item:any,index:number)=>{
                       
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
            
            <div className={`${generalModal} col-sm m-2`}>
                <h4>Bids</h4>
                
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Maker Amount</th>
                        <th>Taker Amount</th>
                        <th>Total - USD</th>
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