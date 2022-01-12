

class Task(object):
    def __init__(self, action: str, data: dict, user_token: str):
        self.action = action
        self.data = data
        self.user_token = user_token

    def __repr__(self):
        return f'Action:{self.action}\nData:{self.data}\nUser_token:{self.user_token}'
