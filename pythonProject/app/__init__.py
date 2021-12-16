from flask_login import LoginManager
from flask import Flask
from flask_migrate import Migrate
from .config import Config
from .db import database
from .blueprints import auth_bp, home_bp
from .db.user import User


login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    database.init_app(app)
    Migrate(app, database)

    login_manager.init_app(app)
    login_manager.login_view = "login_page"
    login_manager.login_message_category = "info"

    app.register_blueprint(auth_bp)
    app.register_blueprint(home_bp)

    from app.db.user import User
    from app.db.card import Card
    from app.db.transaction import Transaction
    from app.db.account import Account

    return app

