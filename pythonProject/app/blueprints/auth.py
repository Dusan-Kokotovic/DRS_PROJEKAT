
import functools
from flask import Blueprint,render_template,redirect,url_for,flash,request

from app.forms import RegisterForm, LoginForm,FilterForm
from flask_login import login_user, logout_user,current_user
from app.db.user import User
from app.db.access.user_access import UserAccess


auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

user_repo = UserAccess()


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
        user_repo.save_user(new_user)
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
        attempted_user = user_repo.get_by_email(login_form.email.data)
        if attempted_user and attempted_user.check_password_correction(attempted_password=login_form.password.data):
            login_user(attempted_user)
            flash(f"You are logged in as {attempted_user.name}",category='success')
            return redirect(url_for('home.index'))
        else:
            flash(f"Email and password are not valid! Please try again!",category='danger')

    return render_template('login.html', login_form=login_form)


@auth_bp.route('/logout_page')
def logout_page():
    logout_user()
    flash(f"You have been logged out!",category="info")
    return redirect(url_for('home.index'))


@auth_bp.route('/history',methods=['GET','POST'])
def history_page():
    filter_form = FilterForm()
    transactions = user_repo.get_all_transactions(current_user.id)

    return render_template('history.html', filter_form=filter_form,transactions=transactions)
