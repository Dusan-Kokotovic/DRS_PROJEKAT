import datetime

from flask import Blueprint, request, jsonify
from engine.data_mappers import TransactionQueryMapper
from .helpers import check_logged_in
from engine.db.access.user_access import UserAccess, TransactionAccess
from engine.transactionMiner import thread_spawner
from multiprocessing import Process, Queue
from engine.executor import executorQueue

user_repo = UserAccess()
transaction_repo = TransactionAccess()
transaction_controller = Blueprint('transaction_controller', __name__, url_prefix='/api/transactions')
transactionsMapper = TransactionQueryMapper()


@transaction_controller.route('/sent', methods=['GET', 'POST'])
def sent():

    user = check_logged_in(user_repo)

    if user is False:
        return 404

    if request.method == 'POST' and request.is_json:
        req_json = request.get_json()
        name = req_json['name']
        amount_to = req_json['amountTo']
        amount_from = req_json['amountFrom']
        date_to = req_json['dateTo']
        date_from = req_json['dateFrom']

        transactions = transaction_repo.filter_sent_transactions(user.id, name, amount_to, amount_from, date_from, date_to)
        retval = transactionsMapper.map_transaction_user_array(transactions, False)
        return jsonify({'data': retval}), 200
    elif request.method == 'GET':
        transactions = transaction_repo.get_sent_transactions(user.id)
        retval = transactionsMapper.map_transaction_user_array(transactions, False)
        return jsonify({'data': retval}), 200


@transaction_controller.route('/received', methods=['GET', 'POST'])
def received():

    user = check_logged_in(user_repo)

    if user is False:
        return 404

    if request.method == 'POST' and request.is_json:
        req_json = request.get_json()

        name = req_json['name']
        amount_to = req_json['amountTo']
        amount_from = req_json['amountFrom']
        date_to = req_json['dateTo']
        date_from = req_json['dateFrom']

        transactions = transaction_repo.filter_received_transactions(user.id, name, amount_to, amount_from, date_from, date_to)
        print(transactions)
        retval = transactionsMapper.map_transaction_user_array(transactions, True)
        return jsonify({'data': retval}), 200
    elif request.method == 'GET':
        transactions = transaction_repo.get_received_transactions(user.id)
        retval = transactionsMapper.map_transaction_user_array(transactions, True)
        return jsonify({'data': retval}), 200


def do_transaction(transaction_data):
    sender = transaction_data["sender"]
    receiver_email = transaction_data["receiver"]
    amount = transaction_data["amount"]
    coin = transaction_data["coin"]

    q = Queue()
    id = transaction_repo.start_transaction(sender, receiver_email, amount,datetime.datetime.now())
    process = Process(target=thread_spawner, args=[transaction_data, q],daemon=True)
    process.start()
    process.join()
    hash = q.get()
    transaction_repo.commit_transaction(id, hash)
    transaction_repo.change_user_balances(sender, receiver_email, coin, amount)

@transaction_controller.route("/send", methods=['POST'])
def send_transaction():

    user = check_logged_in(user_repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

    if not request.is_json:
        return jsonify({"msg": "Bad request"}), 400

    data = request.get_json()

    try:
        amount = data["amount"]
        receiver_email = data["receiver"]
        sender = user.email
        coin = data["coinId"]
    except KeyError:
        return jsonify({"msg": "Bad request"}), 400

    coin_data = user.coins.filter_by(coin_id=coin).first()

    if coin_data is None or coin_data.amount < amount:
        return jsonify({"msg": "Not enough funds"}), 400

    transaction_data = {"sender": sender, "receiver": receiver_email, "amount": amount, "coin": coin}
    executorQueue.submit(do_transaction, transaction_data)
    return jsonify({"data": "Successfully started a transaction"}), 200


