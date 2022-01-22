from engine.db.access.user_access import UserAccess, User
from engine.app.config import Config
from flask import request


def check_logged_in(repo: UserAccess) -> bool:

    token = request.headers.get('Authorization')

    if token is None or token == "":
        return False

    try:
        user_id = User.decode_jwt(Config.SECRET_KEY, token)
    except:
        return False

    user = repo.get_by_id(user_id)
    if user is None:
        return False

    return user
