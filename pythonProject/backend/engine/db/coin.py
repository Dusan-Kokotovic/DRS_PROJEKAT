from . import database as db


class Coin(db.Model):

    def __init__(self, extern_api_id):
        self.extern_api_id = extern_api_id

    id = db.Column(db.Integer(), index=True, primary_key=True)
    extern_api_id = db.Column(db.Integer(), nullable=False, index=True)

    associated_users = db.relationship('CoinUserAssociation', backref='coin', lazy='dynamic')
