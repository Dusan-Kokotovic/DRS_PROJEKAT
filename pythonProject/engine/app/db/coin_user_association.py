from . import database as db


class CoinUserAssociation(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    owner_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    coin_id = db.Column(db.Integer(), db.ForeignKey('coin.id'))
    amount = db.Column(db.Float(), nullable=False)

