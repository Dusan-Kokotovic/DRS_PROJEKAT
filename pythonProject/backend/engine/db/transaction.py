from . import database as db
from enum import Enum


class TransactionState(Enum):
    DENIED = 0,
    DONE = 1,
    MINING = 2


class Transaction(db.Model):

    def __init__(self, amount, sender_id, receiver_id, date, transaction_state: TransactionState):
        self.amount = amount
        self.receiver_id = receiver_id
        self.sender_id = sender_id
        self.datetime = date
        self.transaction_state = transaction_state.name

    base_id = db.Column(db.Integer(), index=True, primary_key=True)
    id = db.Column(db.String(256), index=True, nullable=True)
    amount = db.Column(db.Float(), nullable=False)
    sender_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    datetime = db.Column(db.DateTime(), nullable=False)
    transaction_state = db.Column(db.String(7), nullable=False)

    def __repr__(self):
        return f'Transaction: {self.id}'
