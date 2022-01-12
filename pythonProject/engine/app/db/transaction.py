from . import database as db


class Transaction(db.Model):
    id = db.Column(db.String(256), index=True, primary_key=True)
    amount = db.Column(db.Float(), nullable=False)

    sender_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    datetime = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f'Transaction: {self.id}'

