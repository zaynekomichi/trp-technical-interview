import { Token_0X } from "./api_token_keys"
import { tradingTokens } from "./api_links"
import axios from "axios"
export const getOrderBook=async(token_1:string,token_2:string)=>{
    // const response = await axi
    const config = {
        headers:{
          "0x-api-key":"aa7e1d42-28c0-496d-bd66-5cb415916d60",
        }
      };
    return axios.get(`wss://api.0x.org/orderbook/v1?quoteToken=${token_1}&baseToken=${token_2}`, config)
}


export const getTokenList=()=>{
    return axios.get(tradingTokens)
}