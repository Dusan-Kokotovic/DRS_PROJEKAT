from flask_login import LoginManager
from flask import Flask
from flask_migrate import Migrate
from .config import Config
from .db import database
from .db.user import User
from .blueprints import controller_bp
from flask_cors import CORS
login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.register_blueprint(controller_bp)
    cors = CORS(app)

    login_manager.init_app(app)
    database.init_app(app)
    Migrate(app, database)

    from .db.transaction import Transaction
    from .db.account import Account
    from .db.card import Card

    return app

