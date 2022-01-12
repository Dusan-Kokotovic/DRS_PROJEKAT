from app import create_app


def main():
    application = create_app()
    application.run()


if __name__ == '__main__':
    main()
