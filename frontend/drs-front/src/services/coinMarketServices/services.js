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
     return response.json();
    })
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

}