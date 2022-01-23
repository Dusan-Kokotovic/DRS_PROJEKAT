import datetime

from flask import Blueprint, request, jsonify
from engine.db.access.user_access import UserAccess, User, Card, Coin
from engine.db.acces.coin_user_association import CoinUserAssociation
from engine.app.config import Config
from email_validator import validate_email
from .helpers import check_logged_in


user_controller = Blueprint('user_controller', __name__, url_prefix='/api/user')
repo = UserAccess()

def get_user_data(user: User):
    is_verified = True if repo.get_card(user.id) is not None else False
    account = repo.get_user_account(user.id)
    return jsonify(
        {
            'name': user.name,
            'lastName': user.last_name,
            'address': user.address,
            'city': user.city,
            'country': user.country,
            'phone': user.phone,
            'email': user.email,
            'isVerified': is_verified,
            'money': account.amount if account is not None else 0
        })



def validate_card(card_number, expiration_date, security_code):
    valid_number = "4242 4242 4242 4242"
    valid_date = datetime.date(2023, 2, 15)
    valid_code = "123"

    current_date = datetime.datetime.now()

    if valid_code != security_code or valid_date.year != expiration_date.year or valid_date.month != expiration_date.month or card_number != valid_number or \
            current_date.date() > expiration_date:
        return False

    return True

@user_controller.route('/verify', methods=['POST'])
def verify():

    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

    if not request.is_json:
        return jsonify({"msg": "Bad request"}), 400

    data = request.get_json()
    try:
        card_number = data['cardNumber']
        name = user.name
        expiration_date = data['expirationDate']
        security_code = data['pinCode']
    except KeyError:
        return jsonify({"msg": "Bad request"}), 400

    existing_card = repo.get_card(user.id)

    if existing_card is not None:
        return jsonify({"msg": "Conflict"}), 409

    date_info = expiration_date.split('-')
    date = datetime.date(int(date_info[0]), int(date_info[1]), int(date_info[2]))

    if not validate_card(card_number, date, security_code):
        return jsonify({"msg": "Bad request"}), 400

    new_card = Card(date, card_number, security_code, name, user.id)
    repo.add_card(new_card, user.id)

    return get_user_data(user), 200


@user_controller.route('/', methods=['GET'])
def user():

    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

    return get_user_data(user), 200


@user_controller.route('/login', methods=['POST'])
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
        return jsonify({"msg": "User doesn't exist"}), 400

    if not user.check_password_correction(password):
        return 401

    token = user.encode_jwt(Config.SECRET_KEY)

    return jsonify({"token": token}), 200


@user_controller.route('/register', methods=['POST'])
def register():

    if not request.json:
        return jsonify({"msg": "Bad request"}), 400

    data = request.get_json()
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

    return 200

@user_controller.route('/deposit', methods=['POST'])
def withdraw():
    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

    if not request.json:
        return jsonify({"msg": "Bad request"}), 400

    data = request.get_json()

    try:
        amount = data['amount']

    except KeyError:
        return jsonify({"msg": "Bad request"}), 400

    repo.add_money(user.id ,float(amount))
    return  jsonify({"data": "Success"}), 200

@user_controller.route('/exchange', methods=['POST'])
def exchange():
    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

    if not request.json:
        return jsonify({"msg": "Bad request"}), 400

    data = request.get_json()

    try:
        amount = data['amount']
        coin = data['coin']

    except KeyError:
        return jsonify({"msg": "Bad request"}), 400

    print(amount)
    print(coin)

    dbCoin =  repo.get_coin_by_externId(coin)

    if dbCoin is None:
        repo.add_coin(Coin(coin))


    return 200
