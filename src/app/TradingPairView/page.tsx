"use client"
import { useState } from "react"
import { generalBtn, generalInput } from "../components/cssStyles"
import {swapVertical} from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { Tooltip } from 'react-tooltip'
import { search } from "ss-search"
import data from "../db/tokensDb.json"

interface tokensDataType{
    name:string,
    symbol:string,
    logoURI:string
}

export default function TradingPairView(){
    const [keyPairs,setKeyPairs] = useState({
        token_1:"",
        token_2:""
    })
    const [hide,setHide] = useState({
        token_1:true,
        token_2:true
    })
    const [tokens,setTokens] = useState<Array<tokensDataType>>()

    const searchTokens=(value:string,display:boolean)=>{
        value = value.trim()
        const search_data:any = search(data,["name","symbol"],value)
        if(value.length>3 && display === true && search_data.length>0){
        setTokens(search_data)
        setHide({...hide,token_1:false})
        }else{
            setHide({...hide,token_1:true,token_2:true})
        }
    }
    return(
        <div className="container">
            <div className="shadow border-2 bg-white m-5 rounded-2xl p-5 flex flex-wrap mb-5">
            <div className="" >
                <div className="mb-5">
                    <h1 className="text-xl">Trading Pairs</h1>
                </div>
                <div className="mb-5">
                    <div>
                        <input className={generalInput}placeholder="You Pay" onChange={(e)=>searchTokens(e.target.value,true)}/>
                    </div>
                    <div hidden={hide.token_1} className="absolute max-h-52 min-w-[30%] bg-white shadow-lg overflow-y-auto p-5 ">
                        {
                            tokens?.map((item:tokensDataType,index:number)=>{
                                return(
                                    <div key={index} className="flex flex-row m-4 justify-between ">
                                        <div>
                                            <img src={item.logoURI} width="20px" className="rounded" alt={`image of ${item.name} logo`}/>
                                        </div>
                                      
                                        <div>
                                        <p>{item.symbol}</p>
                                        </div>
                                          <div>
                                        <p>{item.name}</p>
                                        </div>
                                        
                                      
                                        
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="m-2 text-center">
                   
                    <button data-tip-content="Swap Tokens"  data-tip-id="tokens"  data-tooltip-place="top" className={generalBtn}><IonIcon icon={swapVertical}/></button>
                    <Tooltip id="tokens"/>
                </div>
                <div className="mb-5">
                 
                    <div>
                        <input className={generalInput} placeholder="You receive"/>
                    </div>
                </div>
            </div>
            <div>
                <button className={generalBtn}>Order Book</button>
            </div>
            </div>
           
        </div>
    )
}