import datetime

from ..user import User
from ..card import Card
from ..transaction import Transaction
from ..account import Account
from .. import database


class TransactionAccess(object):
    def get_sent_transactions(self, id: int):
        return Transaction.query.filter_by(sender_id=id).all()

    def get_received_transactions(self, id: int):
        return Transaction.query.filter_by(receiver_id=id).all()

    def get_all_transactions(self, id: int):
        sent = self.get_sent_transactions(id)
        received = self.get_received_transactions(id)

        return sent + received

    def __filter_transactions(self, name, amount_to, amount_from, time_from, time_to, query, join_condition):
        if name != '':
            if join_condition == 'sender':
                query = query.join(User, User.id == Transaction.receiver_id).filter_by(name=name)
            else:
                query = query.join(User, User.id == Transaction.sender_id).filter_by(name=name)

        if amount_to is not None and amount_to != '':
            query = query.filter(Transaction.amount <= amount_to)

        if amount_from is not None and amount_from != '':
            query = query.filter(Transaction.amount >= amount_from)

        if time_to is not None and time_to != '':
            time_to = datetime.datetime(time_to)
            query = query.filter(Transaction.datetime <= time_to)

        if time_from is not None and time_from != '':
            time_from = datetime.datetime(time_from)
            query = query.filter(Transaction.datetime >= time_from)

        return query.all()

    def filter_sent_transactions(self, user_id, name, amount_to, amount_from, time_from, time_to):

        query = Transaction.query.filter_by(sender_id=user_id)
        return self.__filter_transactions(name, amount_to, amount_from, time_from, time_to, query, 'sender')

    def filter_received_transactions(self, user_id, name, amount_to, amount_from, time_from, time_to):
        query = Transaction.query.filter_by(receiver_id=user_id)
        return self.__filter_transactions(name, amount_to, amount_from, time_from, time_to, query, 'receiver')


class UserAccess(object):

    def get_by_email(self, email: str) -> User:
        return User.query.filter_by(email=email).first()

    def get_by_id(self, id: int) -> User:
        return User.query.filter_by(id=id).first()

    def save_user(self, user: User):

        if database.session.query(User).filter_by(email=user.email).count() > 0:
            return False

        database.session.add(user)
        database.session.commit()

        return True

    def edit_user(self, user: User):
        #
        database.session.query(User).filter_by(email=user.email).update(
            {
            "name": user.name,
            "last_name": user.last_name,
            "password_hash": user.password_hash,
            "address": user.address,
            "city": user.city,
            "country": user.country,
            "phone": user.phone
            },
            synchronize_session = "fetch")
        database.session.commit()

        return True

    def delete_user(self, user: User):

        if database.session.query(User).filter_by(email=user.email).count() > 0:
            return False

        database.session.remove(user)
        database.session.commit()
        return True

    def add_card(self, card: Card, user_id: int):
        if Card.query.filter_by(user=user_id).count() <= 0:
            database.session.add(card)
            database.session.commit()

    def get_card(self, user_id: int)->Card:
        return Card.query.filter_by(user=user_id).first()

    def add_account(self, user_id: int):
        account = Account(user_id, 0)

        database.session.add(account)
        database.session.commit()

    def get_user_account(self, user_id: int)->Account:
        user = self.get_by_id(user_id)

        if user is not None:
            return user.account

    def remove_card(self, user_id: int):
        card = self.get_card(user_id)
        if card is not None:
            database.session.remove(card)
            database.session.commit()





