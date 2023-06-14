import { Token_0X } from "./api_token_keys"
import { tradingTokens } from "./api_links"
import axios from "axios"
export const getOrderBook=async()=>{
    // const response = await axi
}


export const getTokenList=()=>{
    return axios.get(tradingTokens)
}