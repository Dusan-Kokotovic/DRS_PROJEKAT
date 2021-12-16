from . import database as db


class Card(db.Model):
    id = db.Column(db.Integer(), index=True, primary_key=True)
    expiring_date = db.Column(db.DateTime(), nullable=False)
    card_number = db.Column(db.String(16), unique=True, nullable=False)
    pin_code_hash = db.Column(db.String(256), nullable=False)
    user = db.Column(db.Integer(), db.ForeignKey('user.id'))
    user_name = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f'Card: {self.id} {self.user_name}'



