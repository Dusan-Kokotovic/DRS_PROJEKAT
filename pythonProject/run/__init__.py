import app

application = app.create_app()


def main():
    application.run(debug=True)

