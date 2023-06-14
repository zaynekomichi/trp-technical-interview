"use client"
import { useState, useEffect } from "react"
import { generalBtn, generalInput,searchTokenDropdown } from "../components/cssStyles"
import { Tooltip } from 'react-tooltip'
import { search } from "ss-search"
import { getTokenList } from "../api/api_functions"

interface tokensDataType{
    name:string,
    symbol:string,
    logoURI:string
}

export default function TradingPairView(){
    const [token_1,setToken_1]=useState<string>("")
    const [token_2,setToken_2]=useState<string>("")
    // const [keyPairs,setKeyPairs] = useState({
    //     token_1:"",
    //     token_2:""
    // })
    const [hide,setHide] = useState({
        token_1:true,
        token_2:true
    })
    const [allTokens,setAllTokesns] = useState<Array<any>>([])
    const [tokens,setTokens] = useState<Array<tokensDataType>>()

    const searchTokens=(value:string,display:boolean)=>{
        console.log(allTokens)
        //display parameter used to choose where to show token search results
        value = value.trim()
        const search_data:any = search(allTokens,["name","symbol"],value)
        console.log(search_data)
        if(value.length>3 && display === true && search_data.length>0){
        setTokens(search_data)
        setHide({...hide,token_1:false})
        }else if(value.length>3 && display === false && search_data.length>0){
            setTokens(search_data)
            setHide({...hide,token_2:false})
        }else{
            setHide({...hide,token_1:true,token_2:true})
        }
    }

    const swapTokens=()=>{
        const copyCurrentTokens = {token_1,token_2}
        setToken_1(copyCurrentTokens.token_2)
        setToken_2(copyCurrentTokens.token_1)
    }

    const ViewResults=()=>{
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

    useEffect(()=>{
        getTokenList().then((res:any)=>{
            console.log(res)
            if(res.status == 200){
                setAllTokesns(res.data.tokens)
            }else{
                console.log(res.status)
            }
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <div className="container">
            <div className="shadow border-2 bg-white m-5 rounded-2xl p-5 flex flex-wrap mb-5">
            <div className="" >
                <div className="mb-5">
                    <h1 className="text-xl">Trading Pairs</h1>
                </div>
                <div className="mb-5">
                    <div>
                        <input className={generalInput}placeholder="Paying Token" onChange={(e)=>{setToken_1(e.target.value);searchTokens(e.target.value,true)}} value={token_1}/>
                    </div>
                    <div hidden={hide.token_1} className={searchTokenDropdown}>
                        {
                            tokens?.map((item:tokensDataType,index:number)=>{
                                return(
                                    <div key={index} className="flex flex-row m-4 justify-between cursor-pointer" onClick={()=>{setToken_1(item.symbol);setHide({...hide,token_1:true})}}>
                                        <div >
                                            <img src={item.logoURI} width="20px" className="rounded" alt={`image of ${item.name} logo`}/>
                                        </div>
                                      
                                        <div>
                                        <p>{item.symbol}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="m-2 text-center">
                   
                    <button data-tip-content="Swap Tokens"  data-tip-id="tokens"  data-tooltip-place="top" className={generalBtn} onClick={()=>swapTokens()}>Swap Tokens</button>
                    <Tooltip id="tokens"/>
                </div>
                <div className="mb-5">
                 
                    <div className="mb-5">
                        <input className={generalInput} placeholder="Receiving Token" onChange={(e)=>{setToken_2(e.target.value);searchTokens(e.target.value,false)}} value={token_2}/>
                    </div>
                    <div hidden={hide.token_2} className={searchTokenDropdown}>
                        {
                            tokens?.map((item:tokensDataType,index:number)=>{
                                return(
                                    <div key={index} className="flex flex-row m-4 justify-between " onClick={()=>{setToken_2(item.symbol);setHide({...hide,token_2:true})}}>
                                        <div>
                                            <img src={item.logoURI} width="20px" className="rounded" alt={`image of ${item.name} logo`}/>
                                        </div>
                                      
                                        <div>
                                        <p>{item.symbol}</p>
                                        </div>
                                         
                               
                                    </div>
                                )
                            })
                        }
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