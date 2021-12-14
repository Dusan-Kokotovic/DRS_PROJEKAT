from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = '2e9c84f951360f6a674007c6'

app.config.from_object(Config)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category="info"
database = SQLAlchemy(app)
migrate = Migrate(app, database)

from app import routes