from app import app
from app.db.models import User,Account,Transaction,Card


@app.shell_context_processor
def create_shell_context():
    return {'User': User, 'Account': Account, 'Transaction': Transaction, 'Card': Card}




if __name__ == "__main__":
    app.run(debug=True)
