import { Token_0X } from "./api_token_keys"
import { tradingTokens, websocketLink,orderBookLink } from "./api_links"
import axios from "axios"

//get Order Book Current State
export const getOrderBook=async(tokenData:any)=>{
    const config = {
        headers:{
          "0x-api-key":Token_0X
        },
        params:{
          "quoteToken":tokenData.token_1.address,
          "baseToken":tokenData.token_2.address
        }
      };
      return axios.get(orderBookLink,config)
}



//get List of Tokens on Gecko exchange
export const getTokenList=()=>{
    return axios.get(tradingTokens)
}


//create websocket link
export const OrderBookWebsocket=()=>{
  return new WebSocket(websocketLink)
}
