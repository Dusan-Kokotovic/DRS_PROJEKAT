import configparser
import json

from flask import Blueprint, request, jsonify
from ..db.access.user_access import UserAccess, User
from ..config import Config
from email_validator import validate_email
from ..blueprints.helpers import check_logged_in

user_controller = Blueprint('user_controller', __name__, url_prefix='/api/user')
repo = UserAccess()


@user_controller.route('/', methods=['GET'])
def user():

    user = check_logged_in(repo)

    if user is False:
        return jsonify({"msg": "Unauthorized"}), 401

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
        return jsonify({"msg": "User doesn't exist"}), 404

    if not user.check_password_correction(password):
        return jsonify({"msg": "Bad password"}), 401

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

    return jsonify({"msg": "Success"}), 200


