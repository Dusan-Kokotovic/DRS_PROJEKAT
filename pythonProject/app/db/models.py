from app import database as db


class User(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String(35), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(12), nullable=False)
    card = db.relationship('Card', backref='user_owns')
    account = db.relationship('Account', backref='user', uselist='False')

    sent_transactions = db.relationship('Transaction', backref='sender', lazy='dynamic',
                                        foreign_keys='Transaction.sender_id')
    received_transactions = db.relationship('Transaction', backref='receiver', lazy='dynamic',
                                            foreign_keys='Transaction.receiver_id')

    def __repr__(self):
        return f'User:{self.Name} {self.last_name}'


class Card(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    expiring_date = db.Column(db.DateTime(), nullable=False)
    card_number = db.Column(db.String(16), unique=True, nullable=False)
    pin_code_hash = db.Column(db.String(256), nullable=False)
    user = db.Column(db.Integer(), db.ForeignKey('user.id'))
    user_name = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'Card: {self.id} {self.user_name}'


class Transaction(db.Model):
    id = db.Column(db.String(256), index=True, primary_key=True)
    amount = db.Column(db.Float(), nullable=False)

    sender_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    receiver_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    datetime = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f'Transaction: {self.id}'


class Account(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    owner_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    amount = db.Column(db.Float(), nullable=False)

    def __repr(self):
        return f'Account: {self.id} Amount:{self.amount}'


