import {
    coinsMarketPath,
  } from "./urls";


export const getCoinsMarket = async () =>{
    
    let token = localStorage.getItem("user");
  
    if(token === null || token === "")return;
  
    let reqOptions = {
      method : "get",
      headers: {
        Authorization: token,
      }
    }

    return fetch(coinsMarketPath, reqOptions)
    .then((response) => {
      response.json();
    })
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.log(error);
    });

}