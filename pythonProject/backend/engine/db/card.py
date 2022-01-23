import datetime

from . import database as db
from werkzeug.security import check_password_hash, generate_password_hash


class Card(db.Model):
    def __init__(self, expiration_date, card_number, pin_code, user_name, user_id):
        self.expiring_date = expiration_date
        self.card_number = card_number
        self.user = user_id
        self.user_name = user_name
        self.pin_code_hash = generate_password_hash(pin_code)

    id = db.Column(db.Integer(), index=True, primary_key=True)
    expiring_date = db.Column(db.DateTime(), nullable=False)
    card_number = db.Column(db.String(19), unique=False, nullable=False)
    pin_code_hash = db.Column(db.String(256), nullable=False)
    user = db.Column(db.Integer(), db.ForeignKey('user.id'))
    user_name = db.Column(db.String(20), nullable=False)

    def check_pin_code(self, pin_code):
        return check_password_hash(self.pin_code_hash, pin_code)

    def __repr__(self):
        return f'Card: {self.id} {self.user_name}'


