from ..user import User
from ..transaction import Transaction
from .. import database


class UserAccess(object):

    def get_by_email(self, email: str) -> User:
        return database.session.query(User).filter_by(email=email).first()

    def get_by_id(self, id: int) -> User:
        return database.session(User).query.filter_by(id=id).first()

    def get_sent_transactions(self, id: int):
        return Transaction.query.filter_by(sender_id=id).all()

    def get_received_transactions(self, id: int):
        return Transaction.query.filter_by(receiver_id=id).all()

    def get_all_transactions(self, id: int):
        sent = self.get_sent_transactions(id)
        received = self.get_received_transactions(id)

        return sent + received

    def save_user(self, user: User):

        if database.session.query(User).filter_by(email=user.email).count() > 0:
            return False

        database.session.add(user)
        database.session.commit()

        return True

    def delete_user(self, user: User):

        if database.session.query(User).filter_by(email=user.email).count() > 0:
            return False

        database.session.remove(user)
        database.session.commit()
        return True


