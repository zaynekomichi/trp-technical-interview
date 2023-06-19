"use client"
import { useState, useEffect,useRef } from "react"
import { generalBtn, generalBtnNav, generalInput, generalInputSideDisplay, generalModal, searchTokenDropdown, searchTokenDropdownItems } from "../components/cssStyles"
import { search } from "ss-search"
import { getTokenList } from "../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../components/contexts"
import Link from "next/link"
import { error_msg } from "../components/messages"

interface tokensDataType {
    name: string,
    symbol: string,
    logoURI: string,
    address: string
}

export default function TradingPairView() {
    const { currentTokens, setCurrentTokens }: any = useContext(TokenContext)
    const [token_1, setToken_1] = useState<tokensDataType>({
        name: "",
        symbol: "",
        logoURI: "",
        address: ""
    })
    const [token_2, setToken_2] = useState<tokensDataType>({
        name: "",
        symbol: "",
        logoURI: "",
        address: ""
    })
    const [hide, setHide] = useState({
        token_1: true,
        token_2: true
    })
    const [allTokens, setAllTokens] = useState<Array<any>>([])
    const [tokens, setTokens] = useState<Array<tokensDataType>>()

    //use to clear input values
    //any type to defer erros
    const token_search_1:any = useRef(null)
    const token_search_2:any = useRef(null)

    const searchTokens = (value: string, display: boolean) => {
        console.log(allTokens)
        //display parameter used to choose where to show token search results
        value = value.trim()
        const search_data: any = search(allTokens, ["name", "symbol"], value)
        console.log(search_data)
        if (value.length > 2 && display === true && search_data.length > 0) {
            setTokens(search_data)
            setHide({ ...hide, token_1: false })
        } else if (value.length > 2 && display === false && search_data.length > 0) {
            setTokens(search_data)
            setHide({ ...hide, token_2: false })
        } else {
            setHide({ ...hide, token_1: true, token_2: true })
        }
    }

    //switch token positions paying->receiving vice versa
    const SwitchTokens = () => {
        const copyCurrentTokens = { token_1, token_2 }
        setCurrentTokens({
            token_1: copyCurrentTokens.token_2,
            token_2: copyCurrentTokens.token_1
        })

    }


    useEffect(() => {
        setToken_1(currentTokens.token_1)
        setToken_2(currentTokens.token_2)
        getTokenList().then((res: any) => {
            console.log(res)
            if (res.status == 200) {
                setAllTokens(res.data.tokens)
            } else {
                console.log(res.status)
            }
        }).catch((err) => {
            alert(error_msg)
        })
    }, [])
    return (
        <div className={generalModal}>
            <div className="mb-3">
                <h4 >Trade Tokens - {currentTokens.token_1.symbol} | {currentTokens.token_2.symbol}</h4>
            </div>
            <div className="row">
                <div className="col-sm mb-2">
                    <div className="input-group">
                        <div className={generalInputSideDisplay}>
                            <img className="rounded" width="20px" src={currentTokens.token_1.logoURI} />
                        </div>
                        <input className={generalInput} ref={token_search_1} placeholder="Paying Token" onChange={(e) => {  searchTokens(e.target.value, true); }} />
                    </div>
                    <div hidden={hide.token_1} className={searchTokenDropdown}>
                        {
                            tokens?.map((item: tokensDataType, index: number) => {
                                return (
                                    <div key={index} className={searchTokenDropdownItems} onClick={() => {
                                        setToken_1({
                                            ...token_1,
                                            name: item.name,
                                            symbol: item.symbol,
                                            logoURI: item.logoURI,
                                            address: item.address
                                        });

                                        setCurrentTokens({ ...currentTokens, token_1: { symbol: item.symbol, address: item.address, logoURI: item.logoURI } });
                                        setHide({ ...hide, token_1: true });
                                        token_search_1.current.value = ""
                                    }}>
                                        <div >
                                            <img src={item.logoURI} width="20px" className="rounded" alt={`image of ${item.name} logo`} />
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

                <div className="col-sm">
                    <div className="input-group">
                        <div className={generalInputSideDisplay}>
                            <img className="rounded" width="20px" src={currentTokens.token_2.logoURI} />
                        </div>
                        <input className={generalInput} ref={token_search_2} placeholder="Receiving Token" onChange={(e) => {  searchTokens(e.target.value, false) }} />
                    </div>
                    <div hidden={hide.token_2} className={searchTokenDropdown}>
                        {
                            tokens?.map((item: tokensDataType, index: number) => {
                                return (
                                    <div key={index} className={searchTokenDropdownItems} onClick={() => {
                                        setToken_2({
                                            ...token_2,
                                            name: item.name,
                                            symbol: item.symbol,
                                            logoURI: item.logoURI,
                                            address: item.address
                                        });
                                        setCurrentTokens({ ...currentTokens, token_2: { symbol: item.symbol, address: item.address, logoURI: item.logoURI } });
                                        setHide({ ...hide, token_2: true });
                                        token_search_2.current.value=""
                                    }}>
                                        <div>
                                            <img src={item.logoURI} width="20px" className="rounded" alt={`image of ${item.name} logo`} />
                                        </div>

                                        <div>
                                            <p className="mt-3">{item.symbol}</p>
                                        </div>


                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <div className="mb-3 text-center">

                <button className={generalBtn} onClick={() => SwitchTokens()}>Switch Tokens</button>

            </div>
            <div>
                <Link href="../OrderBookView/CurrentStateOB"><button className={generalBtnNav} role="button" data-bs-toggle="button" aria-pressed="true">Current State</button></Link>
                <Link href="../OrderBookView/LiveOB" ><button className={generalBtnNav} role="button" data-bs-toggle="button" aria-pressed="true">Live Changes</button></Link>
            </div>
        </div>
    )
}