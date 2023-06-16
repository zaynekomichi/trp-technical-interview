"use client"
import { useState, useEffect } from "react"
import { generalBtn, generalInput, generalInputSideDisplay, generalModal, searchTokenDropdown, searchTokenDropdownItems } from "../components/cssStyles"
import { Tooltip } from 'react-tooltip'
import { search } from "ss-search"
import { getTokenList } from "../api/api_functions"
import { useContext } from "react"
import { TokenContext } from "../components/contexts"

interface tokensDataType {
    name: string,
    symbol: string,
    logoURI: string,
    address: string
}

export default function TradingPairView() {
    const { currentTokens, setCurrentTokens }: any = useContext(TokenContext)
    const [token_1, setToken_1] = useState<string>("")
    const [token_2, setToken_2] = useState<string>("")
    const [hide, setHide] = useState({
        token_1: true,
        token_2: true
    })
    const [allTokens, setAllTokesns] = useState<Array<any>>([])
    const [tokens, setTokens] = useState<Array<tokensDataType>>()

    const searchTokens = (value: string, display: boolean) => {
        console.log(allTokens)
        //display parameter used to choose where to show token search results
        value = value.trim()
        const search_data: any = search(allTokens, ["name", "symbol"], value)
        console.log(search_data)
        if (value.length > 2 && display === true && search_data.length > 0) {
            setTokens(search_data)
            setHide({ ...hide, token_1: false })
        } else if (value.length > 3 && display === false && search_data.length > 0) {
            setTokens(search_data)
            setHide({ ...hide, token_2: false })
        } else {
            setHide({ ...hide, token_1: true, token_2: true })
        }
    }

    const swapTokens = () => {
        const copyCurrentTokens = { token_1, token_2 }
        setToken_1(copyCurrentTokens.token_2)
        setToken_2(copyCurrentTokens.token_1)

    }


    useEffect(() => {
        getTokenList().then((res: any) => {
            console.log(res)
            if (res.status == 200) {
                setAllTokesns(res.data.tokens)
            } else {
                console.log(res.status)
            }
        }).catch((err) => {
            console.log(err)
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
                        <input className={generalInput} placeholder="Paying Token" onChange={(e) => { setToken_1(e.target.value); searchTokens(e.target.value, true); }} value={token_1} />
                    </div>
                    <div hidden={hide.token_1} className={searchTokenDropdown}>
                        {
                            tokens?.map((item: tokensDataType, index: number) => {
                                return (
                                    <div key={index} className={searchTokenDropdownItems} onClick={() => {
                                        setToken_1(item.symbol);
                                        setCurrentTokens({ ...currentTokens, token_1: { symbol: item.symbol, address: item.address, logoURI: item.logoURI } });
                                        setHide({ ...hide, token_1: true });
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
                        <input className={generalInput} placeholder="Receiving Token" onChange={(e) => { setToken_2(e.target.value); searchTokens(e.target.value, false) }} value={token_2} />
                    </div>
                    <div hidden={hide.token_2} className={searchTokenDropdown}>
                        {
                            tokens?.map((item: tokensDataType, index: number) => {
                                return (
                                    <div key={index} className={searchTokenDropdownItems} onClick={() => {
                                        setToken_2(item.symbol);
                                        setCurrentTokens({ ...currentTokens, token_2: { symbol: item.symbol, address: item.address, logoURI: item.logoURI } });
                                        setHide({ ...hide, token_2: true });
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

                <button data-tip-content="Swap Tokens" data-tip-id="tokens" data-tooltip-place="top" className={generalBtn} onClick={() => swapTokens()}>Swap Tokens</button>

            </div>
            <div>
                <button  className={generalBtn}>Current State</button>
                <button className={generalBtn}>Live Changes</button>
            </div>
        </div>
    )
}