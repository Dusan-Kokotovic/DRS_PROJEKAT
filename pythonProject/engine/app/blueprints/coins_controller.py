from flask import Blueprint, jsonify
from ..blueprints.helpers import check_logged_in
from ..db.access.user_access import UserAccess

import json
from requests import Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

coin_controller = Blueprint('coin_market_controller', __name__, url_prefix='/api/coins')
repo = UserAccess()
coin_market_api_key = 'dc52d444-f196-4160-bc17-eb7a0d4ef248'

coin_market_url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'


def make_headers():
    return {'Accepts': 'application/json', 'X-CMC_PRO_API_KEY': coin_market_api_key }


def get_coin_data(coin):
    print(json.dumps(coin, indent=10))

    return {
        "id": coin["id"],
        "name": coin["name"],
        "slug": coin["slug"],
        "circulating_supply": coin["circulating_supply"],
        "usd_price": coin["quote"]["USD"]["price"]}


def parse_values_data(coins):

    return [get_coin_data(coin) for coin in coins]


@coin_controller.route('/values', methods=['GET'])
def values():

    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": 'Unauthorized'}), 401

    session = Session()
    session.headers.update(make_headers())

    try:
        response = session.get(url=coin_market_url)
        data = json.loads(response.text)
        return jsonify({"data": parse_values_data(data["data"])}), 200
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        return jsonify({"msg": str(e)})

