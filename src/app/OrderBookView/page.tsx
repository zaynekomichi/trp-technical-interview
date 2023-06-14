'use client'
import { useEffect,useState } from "react"
import { getOrderBook } from "../api/api_functions"

export default function OrderBookView(){
    const [orderBookData,setOrderBookData] =useState<Array<any>>()

    useEffect(()=>{
        getOrderBook("0x20775d300BdE943Ac260995E977fb915fB01f399","0x20775d300BdE943Ac260995E977fb915fB01f399").then(res=>{
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
                <h1>Order Book</h1>
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