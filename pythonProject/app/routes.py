from app import app


@app.route('/index')
@app.route('/')
def index():
    return "Hello on Index"


