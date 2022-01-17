from ..db.access.user_access import UserAccess, User
from ..config import Config
from flask import request


def check_logged_in(repo: UserAccess) -> bool:

    token = request.headers.get('Authorization')

    if token is None or token == "":
        return False

    user_id = User.decode_jwt(Config.SECRET_KEY, token)

    if user_id == 'Expired' or user_id == 'Invalid':
        return False

    user = repo.get_by_id(user_id)
    if user is None:
        return False

    return user
