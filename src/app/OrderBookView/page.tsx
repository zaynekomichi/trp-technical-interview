'use client'
import { useEffect,useState } from "react"
import { getOrderBook } from "../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../components/contexts"

export default function OrderBookView(){
    const {currentTokens,setCurrentTokens}:any = useContext(TokenContext)
    const [orderBookData,setOrderBookData] =useState<Array<any>>()

    useEffect(()=>{
        getOrderBook(currentTokens.token_1.address,currentTokens.token_2.address).then(res=>{
            if(res.status==200){
                console.log(res.data)
            }else{

            }
        }).catch((err)=>{
            console.log(err)
        })
    },[])


    return(
        <div className="shadow">
            <div>
                <h1>Order Book- {currentTokens.token_1.symbol}|{currentTokens.token_2.symbol}</h1>
            </div>
            <div>
                
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
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
            </div>
        </div>
    )
}