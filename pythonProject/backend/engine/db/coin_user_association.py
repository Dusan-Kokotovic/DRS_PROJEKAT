from . import database as db


class CoinUserAssociation(db.Model):

    def __init__(self, owner_id,coin_id,amount):
        self.owner_id = owner_id
        self.coin_id = coin_id
        self.amount = amount

    id = db.Column(db.Integer(), index=True, primary_key=True)
    owner_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    coin_id = db.Column(db.Integer(), db.ForeignKey('coin.id'))
    amount = db.Column(db.Float(), nullable=False)

    def __repr__(self):

        return f'Coin User Association:{self.coin.name}'