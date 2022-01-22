from flask import Flask
from flask_migrate import Migrate
from .config import Config
from ..blueprints.coins_controller import coin_controller
from ..blueprints.user_controller import user_controller
from ..blueprints.transactions_controller import transaction_controller
from flask_cors import CORS
from ..db import database
import engine.blueprints as bp
from flask_executor import Executor
from engine.executor import executorQueue

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(user_controller)
    app.register_blueprint(transaction_controller)
    app.register_blueprint(coin_controller)
    cors = CORS(app)
    database.init_app(app)
    executorQueue.init_app(app)
    Migrate(app, database)

    from ..db.coin import Coin
    from ..db.transaction import Transaction
    from ..db.coin_user_association import CoinUserAssociation
    from ..db.account import Account
    return app

application = create_app()
bp.executor = Executor(application)

