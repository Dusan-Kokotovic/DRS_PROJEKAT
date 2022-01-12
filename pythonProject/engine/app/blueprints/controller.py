import json

from flask import Blueprint, request, jsonify
from ..db.access.user_access import UserAccess, User
from ..config import Config
from email_validator import validate_email
from ..data_mappers import TransactionQueryMapper

controller_bp = Blueprint('controller', __name__, url_prefix='/api')
repo = UserAccess()


@controller_bp.route('/user', methods=['GET'])
def user():

    if 'Authorization' not in request.headers:
        return jsonify({"msg": "Unauthorized"}), 401

    token = request.headers.get('Authorization')
    user_id = User.decode_jwt(Config.SECRET_KEY, token)
    user = repo.get_by_id(user_id)

    if user is None:
        return jsonify({"msg": "User doesn't exist"}), 404

    return jsonify(
        {
         'name': user.name,
         'lastName': user.last_name,
         'address': user.address,
         'city': user.city,
         'country': user.country,
         'phone': user.phone,
         'email': user.email
         }), 200


@controller_bp.route('/login', methods=['POST'])
def login():

    if not request.is_json:
        return jsonify({'msg': "Bad request"}), 400

    data = request.get_json()

    try:
        email = data['email']
        password = data['password']
    except KeyError as e:
        return jsonify({'msg': "Bad request"}), 400

    user = repo.get_by_email(email)

    if user is None:
        return jsonify({"msg": "User doesn't exist"}), 404

    if not user.check_password_correction(password):
        return jsonify({"msg": "Bad password"}), 401

    token = user.encode_jwt(Config.SECRET_KEY)

    return jsonify({"token": token}), 200


@controller_bp.route('/register', methods=['POST'])
def register():

    if not request.json:
        return jsonify({"msg": "Bad request"}), 400

    data = request.get_json()
    print(data)
    try:
        email = data['email']
        password = data['password']
        address = data['address']
        city = data['city']
        country = data['country']
        phone = data['phone']
        name = data['name']
        last_name = data['lastName']
    except KeyError:
        return jsonify({"msg": "Bad request"}), 400

    if email is None or email == '' or not validate_email(email):
        return jsonify({"msg": "Bad request"}), 400

    if password is None or password == '' or len(password) < 6:
        return jsonify({"msg": "Bad request"}), 400

    if address is None or address == '':
        return jsonify({"msg": "Bad request"}), 400

    if city is None or city == '':
        return jsonify({"msg": "Bad request"}), 400

    if country is None or country == '':
        return jsonify({"msg": "Bad request"}), 400

    if phone is None or phone == '':
        return jsonify({"msg": "Bad request"}), 400

    if name is None or name == '':
        return jsonify({"msg": "Bad request"}), 400

    if last_name is None or last_name == '':
        return jsonify({"msg": "Bad request"}), 400

    does_exist = repo.get_by_email(email)

    if does_exist is not None:
        return jsonify({"msg": "Email is already taken"}), 409

    new_user = User(name, last_name, password, address, city, country, email, phone)

    repo.save_user(new_user)
    repo.add_account(new_user.id)

    return jsonify({"msg": "Success"}), 200


@controller_bp.route('/sent', methods=['GET', 'POST'])
def sent():

    req_json = request.get_json()
    token = request.headers.get('Authorization')
    if token is None or token == '':
        return 401

    user_id = User.decode_jwt(Config.SECRET_KEY, token)

    if user_id == 'Expired' or user_id == 'Invalid':
        return 401

    user = repo.get_by_id(user_id)

    if user is None:
        return 404

    if request.method == 'POST':
        name = req_json['name']
        amount_to = req_json['amountTo']
        amount_from = req_json['amountFrom']
        date_to = req_json['dateTo']
        date_from = req_json['dateFrom']

        transactions = repo.filter_sent_transactions(user_id, name, amount_to, amount_from, date_from, date_to)
        retval = TransactionQueryMapper.map_transaction_user_array(transactions,False)
        return jsonify({'data': retval}), 200
    elif request.method == 'GET':
        transactions = repo.get_sent_transactions(user_id)
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, False)
        return jsonify({'data': retval}), 200


@controller_bp.route('/received', methods=['GET', 'POST'])
def received():

    req_json = request.get_json()
    token = request.headers.get('Authorization')

    if token is None or token == '':
        return 401

    user_id = User.decode_jwt(Config.SECRET_KEY, token)

    if user_id == 'Expired' or user_id == 'Invalid':
        return 401

    user = repo.get_by_id(user_id)

    if user is None:
        return 404

    if request.method == 'POST':
        print(req_json)
        name = req_json['name']
        amount_to = req_json['amountTo']
        amount_from = req_json['amountFrom']
        date_to = req_json['dateTo']
        date_from = req_json['dateFrom']

        transactions = repo.filter_received_transactions(user_id, name, amount_to, amount_from, date_from, date_to)
        print(transactions)
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, True)
        return jsonify({'data': retval}), 200
    elif request.method == 'GET':
        transactions = repo.get_received_transactions(user_id)
        retval = TransactionQueryMapper.map_transaction_user_array(transactions, True)
        return jsonify({'data': retval}), 200
