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
      return axios.get(`https://api.0x.org/orderbook/v1?quoteToken=6218b36c0xa0b86991c1d19d4a2e9eb0ce3606eb48&baseToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`)
    // return axios.get(`https://api.0x.org/orderbook/v1?quoteToken=${token_1}&baseToken=${token_2}`)
}




export const getTokenList=()=>{
    return axios.get(tradingTokens)
}

export const OrderBookWebsocket=()=>{
  return new WebSocket(	"wss://api.0x.org/orderbook/v1")
}
