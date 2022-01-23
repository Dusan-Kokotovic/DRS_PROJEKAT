from flask import Blueprint, jsonify, request
from .helpers import check_logged_in
from engine.db.access.user_access import UserAccess, CoinAccess
from engine.data_mappers import CoinsQueryMapper
from engine.externApis import CoinApi
from requests.exceptions import Timeout, ConnectionError, TooManyRedirects

coin_controller = Blueprint('coin_market_controller', __name__, url_prefix='/api/coins')
repo = UserAccess()
coin_repo = CoinAccess()
coinMapper = CoinsQueryMapper()
coinApi = CoinApi()


@coin_controller.route('/values', methods=['GET'])
def values():

    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": 'Unauthorized'}), 401

    try:
        return jsonify({"data": coinMapper.map_coins(coinApi.get_coins_data(False))}), 200
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        return jsonify({"msg": str(e)})


@coin_controller.route("/user", methods=['GET'])
def get_user_coins():

    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

    try:
        coins = coinApi.get_coins_data(asDict=True)
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        return jsonify({"msg": "Extern Api Error"}), 503

    coin_user_associations = user.coins.all()
    return jsonify({"data": coinMapper.map_user_coin_associations(coin_user_associations, coins)}), 200