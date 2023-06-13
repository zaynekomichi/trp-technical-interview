"use client"
import { useState } from "react"
import { generalBtn, generalInput } from "../components/cssStyles"
import {swapVertical} from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { Tooltip } from 'react-tooltip'

export default function TradingPairView(){
    const [keyPairs,setKeyPairs] = useState({
        token_1:"",
        token_2:""
    })
    return(
        <div className="container">
            <div className="shadow border-2 bg-white m-5 rounded-2xl p-5 flex flex-wrap mb-5">
            <div className="" >
                <div className="mb-5">
                    <h1 className="text-xl">Trading Pairs</h1>
                </div>
                <div className="mb-5">
                    <div>
                        <input className={generalInput}placeholder="You Pay"/>
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