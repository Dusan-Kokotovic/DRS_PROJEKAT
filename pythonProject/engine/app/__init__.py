from flask import Flask
from flask_migrate import Migrate
from .config import Config
from .db import database
from .db.user import User
from .blueprints import user_controller
from .blueprints import transaction_controller
from .blueprints import coin_controller
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(user_controller)
    app.register_blueprint(transaction_controller)
    app.register_blueprint(coin_controller)
    cors = CORS(app)

    database.init_app(app)
    Migrate(app, database)

    from .db.transaction import Transaction
    from .db.account import Account
    from .db.card import Card
    from .db.coin import Coin
    from .db.coin_user_association import CoinUserAssociation

    return app

