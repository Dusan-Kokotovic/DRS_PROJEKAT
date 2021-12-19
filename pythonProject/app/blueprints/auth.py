
import functools
from flask import Blueprint,render_template,redirect,url_for,flash,request

from app.forms import RegisterForm, LoginForm,FilterForm
from flask_login import login_user, logout_user,current_user
from app.db import database
from app.db.user import User
from app.db.transaction import Transaction


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
    filter_form1 = FilterForm()
    users = User.query.all()  # da bih mogao tamo u history.html da dobavim sve informacije o useru


    sent_transactions = Transaction.query.filter_by(sender_id=current_user.id)

    received_transactions = Transaction.query.filter_by(receiver_id=current_user.id)


    # filtriranje ...


    if request.args.get('type') == 'RA': # Receiver A-Z
        sent_transactions = Transaction.query.filter_by(sender_id=current_user.id).order_by(Transaction.receiver_id)
        # nema trika da napravim po imenu sortiranje
    if request.args.get('type') == 'RZ': # Receiver Z-A
        sent_transactions = Transaction.query.filter_by(sender_id=current_user.id).order_by(Transaction.receiver_id.desc())
    if request.args.get('type') == 'AG1': # Amount growing
        sent_transactions = Transaction.query.filter_by(sender_id=current_user.id).order_by(Transaction.amount)
    if request.args.get('type') == 'AD1': #Amount descending
        sent_transactions = Transaction.query.filter_by(sender_id=current_user.id).order_by(Transaction.amount.desc())
    if request.args.get('type') == 'TG1': #Time growing
        sent_transactions = Transaction.query.filter_by(sender_id=current_user.id).order_by(Transaction.datetime)
    if request.args.get('type') == 'TD1': #Time descending
        sent_transactions = Transaction.query.filter_by(sender_id=current_user.id).order_by(Transaction.datetime.desc())
    if request.args.get('type') == 'SA': #Sender A-Z
        received_transactions = Transaction.query.filter_by(receiver_id=current_user.id).order_by(Transaction.sender_id)
    if request.args.get('type') == 'SZ': #Sender Z-A
        received_transactions = Transaction.query.filter_by(receiver_id=current_user.id).order_by(Transaction.sender_id.desc())
    if request.args.get('type') == 'AG2': #Amount growing
        received_transactions = Transaction.query.filter_by(receiver_id=current_user.id).order_by(Transaction.amount)
    if request.args.get('type') == 'AD2': #Amount descending
        received_transactions = Transaction.query.filter_by(receiver_id=current_user.id).order_by(Transaction.amount.desc())
    if request.args.get('type') == 'TG2': #Time growing
        received_transactions = Transaction.query.filter_by(receiver_id=current_user.id).order_by(Transaction.datetime)
    if request.args.get('type') == 'TD2': #Time descending
        received_transactions = Transaction.query.filter_by(receiver_id=current_user.id).order_by(Transaction.datetime.desc())




    return render_template('history.html',received_transactions=received_transactions,
                           sent_transactions=sent_transactions,users=users,
                           filter_form=filter_form,filter_form1=filter_form1)

    flash(f"You have been logged out!", category="info")
    return redirect(url_for('home.index'))
