from app import app, database
from flask import render_template,flash,redirect,url_for
from app.forms import RegisterForm,LoginForm
from app.db.user import User
from flask_login import login_user,logout_user


@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')


@app.route('/register',methods=['GET','POST'])
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
        flash(f"Account created successfully!",category='success')
        return redirect(url_for('home_page'))

    if register_form.errors != {}: # ako ima erora tokom validacije,ako je errors nije {}
        for err_msg in register_form.errors.values():
            flash(f"There was an error with creating a user: {err_msg}",category='danger')
    return render_template('register.html',register_form=register_form)

@app.route('/login',methods=['POST','GET'])
def login_page():
    login_form = LoginForm()

    if login_form.validate_on_submit():
        attempted_user = User.query.filter_by(email=login_form.email.data).first()
        if attempted_user and attempted_user.check_password_correction(attempted_password=login_form.password.data):
            login_user(attempted_user)
            flash(f"You are logged in as {attempted_user.name}",category='success')
            return redirect(url_for('home_page'))
        else:
            flash(f"Email and password are not valid! Please try again!")

    return render_template('login.html',login_form=login_form)

@app.route('/logout')
def logout_page():
    logout_user()
    flash(f"You have been logged out!",category="info")
    return redirect(url_for('home_page'))
