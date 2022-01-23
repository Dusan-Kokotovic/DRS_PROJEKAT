import json


class CoinsQueryMapper(object):
    def __map_coin(self, coin):
        print(json.dumps(coin,indent=4))
        return {
            "externApiId": coin["externApiId"],
            "name": coin["name"],
            "price": coin["usd_price"],
            "percent24hChange": coin["percentChange24h"],
            "symbol": coin["symbol"]
        }

    def __map_coin_user_association(self, coin_user_assoc, coin):
        return {
            "coinId": coin_user_assoc.coin.id,
            "externApiId": coin_user_assoc.coin.extern_api_id,
            "userId": coin_user_assoc.owner_id,
            "amountHeld": coin_user_assoc.amount,
            "coinName": coin["name"],
            "price": coin["usd_price"],
            "percentChange24h": coin["percentChange24h"],
            "symbol": coin["symbol"]
        }

    def map_coins(self, coins):
        return [self.__map_coin(coin) for coin in coins]

    def map_user_coin_associations(self,  associations, prices):

        return [self.__map_coin_user_association(assoc, prices[assoc.coin.extern_api_id]) for assoc in associations]