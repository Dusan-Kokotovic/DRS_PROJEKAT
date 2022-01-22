import json
from requests import Session
from requests.exceptions import TooManyRedirects, ConnectionError, Timeout


class CoinApi(object):

    coin_market_api_key = 'dc52d444-f196-4160-bc17-eb7a0d4ef248'
    coin_market_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'

    def __get_coin_data(self, coin):
        return {
            "externApiId": coin["id"],
            "symbol": coin["symbol"],
            "name": coin["name"],
            "slug": coin["slug"],
            "circulating_supply": coin["circulating_supply"],
            "usd_price": coin["quote"]["USD"]["price"],
            "percentChange24h": coin["quote"]["USD"]["percent_change_24h"]}

    def __parse_values_data(self, coins, asDict:bool):
        if asDict:
            return {coin["id"]: self.__get_coin_data(coin) for coin in coins}
        else:
            return [self.__get_coin_data(coin) for coin in coins]

    def __make_headers(self):
        return {'Accepts': 'application/json', 'X-CMC_PRO_API_KEY': self.coin_market_api_key}

    def get_coins_data(self, asDict: bool):
        session = Session()
        session.headers.update(self.__make_headers())

        try:
            response = session.get(url=self.coin_market_url)
            data = json.loads(response.text)
            return self.__parse_values_data(data["data"], asDict)
        except (ConnectionError, Timeout, TooManyRedirects) as e:
            raise e
