import functools
from flask import Blueprint,render_template,redirect,url_for,flash

from app.forms import RegisterForm, LoginForm
from flask_login import login_user, logout_user
from app.db import database
from app.db.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')


@auth_bp.route('/register_page', methods=['GET', 'POST'])
def register_page():
    register_form = RegisterForm()

    if register_form.validate_on_submit():
        new_user = User(name=register_form.name.data,
                        last_name=register_form.last_name.data,
                        password_hash=register_form.password1.data,
                        address=register_form.address.data,
                        city=register_form.city.data,
                        country=register_form.country.data,
                        email=register_form.email.data,
                        phone=register_form.phone.data,
                        )
        database.session.add(new_user)
        database.session.commit()
        login_user(new_user)
        flash(f"Account created successfully!", category='success')
        return redirect(url_for('home.index'))

    if register_form.errors != {}: # ako ima erora tokom validacije,ako je errors nije {}
        for err_msg in register_form.errors.values():
            flash(f"There was an error with creating a user: {err_msg}",category='danger')
    return render_template('register.html', register_form=register_form)


@auth_bp.route('/login_page', methods=['POST', 'GET'])
def login_page():
    login_form = LoginForm()

    if login_form.validate_on_submit():
        attempted_user = User.query.filter_by(email=login_form.email.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=login_form.password.data):
            login_user(attempted_user)
            flash(f"You are logged in as {attempted_user.name}",category='success')
            return redirect(url_for('home.index'))
        else:
            flash(f"Email and password are not valid! Please try again!")

    return render_template('login.html', login_form=login_form)


@auth_bp.route('/logout_page')
def logout_page():
    logout_user()
    flash(f"You have been logged out!", category="info")
    return redirect(url_for('home.index'))
