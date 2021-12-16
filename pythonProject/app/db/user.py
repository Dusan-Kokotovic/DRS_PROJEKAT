from . import database as db
from flask_login import UserMixin


class User(db.Model, UserMixin):
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

    def check_password_correction(self,attempted_password):
        return self.password_hash == attempted_password

    def __repr__(self):
        return f'User:{self.Name} {self.last_name}'


