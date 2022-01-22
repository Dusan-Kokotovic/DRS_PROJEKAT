from . import database as db


class Coin(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    extern_api_id = db.Column(db.Integer(), nullable=False, index=True)
    name = db.Column(db.String(20), nullable=False)

    associated_users = db.relationship('CoinUserAssociation', backref='coin', lazy='dynamic')
