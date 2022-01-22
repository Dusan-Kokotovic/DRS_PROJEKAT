from . import database as db
from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash
import datetime
import jwt


class User(db.Model, UserMixin):

    def __init__(self, name, last_name, password, address, city, country, email, phone):
        self.name = name
        self.last_name = last_name
        self.password_hash = generate_password_hash(password)
        self.address = address
        self.city = city
        self.country = country
        self.email = email
        self.phone = phone

    id = db.Column(db.Integer(), index=True, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(35), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    phone = db.Column(db.String(12), nullable=False)
    card = db.relationship('Card', backref='user_owns', uselist='False', lazy='dynamic')
    account = db.relationship('Account', backref='user', uselist='False')

    sent_transactions = db.relationship('Transaction', backref='sender', lazy='dynamic',
                                        foreign_keys='Transaction.sender_id')
    received_transactions = db.relationship('Transaction', backref='receiver', lazy='dynamic',
                                            foreign_keys='Transaction.receiver_id')

    coins = db.relationship('CoinUserAssociation', backref='owner', lazy='dynamic')

    def check_password_correction(self, attempted_password):
        return check_password_hash(self.password_hash, attempted_password)

    def encode_jwt(self, secret_key):
        """
        Generates jwt token with provided secret key
        :param secret_key:
        :return:
        """

        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=3),
                'iat': datetime.datetime.utcnow(),
                'sub': self.id
            }

            return jwt.encode(payload, secret_key, algorithm='HS256')
        except Exception as e:
            return e

    @staticmethod
    def decode_jwt(secret_key, token):
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload['sub']

    def __repr__(self):
        return f'User:{self.name} {self.last_name}'


