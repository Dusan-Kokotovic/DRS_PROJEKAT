from flask import Blueprint, request, jsonify
from ..data_mappers import TransactionQueryMapper
from ..blueprints.helpers import check_logged_in
from ..db.access.user_access import UserAccess, TransactionAccess

user_repo = UserAccess()
transaction_repo = TransactionAccess()
transaction_controller = Blueprint('transaction_controller', __name__, url_prefix='/api/transactions')


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
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, False)
        return jsonify({'data': retval}), 200
    elif request.method == 'GET':
        transactions = transaction_repo.get_sent_transactions(user.id)
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, False)
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
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, True)
        return jsonify({'data': retval}), 200
    elif request.method == 'GET':
        transactions = transaction_repo.get_received_transactions(user.id)
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, True)
        return jsonify({'data': retval}), 200



