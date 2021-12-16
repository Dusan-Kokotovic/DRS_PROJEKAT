from . import database as db


class Account(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    owner_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    amount = db.Column(db.Float(), nullable=False)

    def __repr(self):
        return f'Account: {self.id} Amount:{self.amount}'