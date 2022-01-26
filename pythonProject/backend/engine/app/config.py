
class Config(object):
    SQLALCHEMY_DATABASE_URI = "mysql://dbuser:test@db/test_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = '1928y3eiduhsad9u8192uoadoi'
    EXECUTOR_TYPE = 'thread'
    EXECUTOR_MAX_WORKERS = 5