from flask_wtf import FlaskForm
from wtforms import StringField,PasswordField,SubmitField,IntegerField,DateTimeField
from wtforms.validators import DataRequired,Length,EqualTo,Email


class RegisterForm(FlaskForm):
    name = StringField(label="Name",validators=[Length(min=2,max=20),DataRequired()])
    last_name = StringField(label="Lastname",validators=[Length(min=2,max=30),DataRequired()])
    address = StringField(label="Address",validators=[Length(min=2,max=35),DataRequired()])
    city = StringField(label="City",validators=[Length(min=2,max=20),DataRequired()])
    country = StringField(label="Country",validators=[Length(min=2,max=20),DataRequired()])
    phone = StringField(label="Phone",validators=[Length(min=2,max=12),DataRequired()])
    email = StringField(label="Email",validators=[Email(),DataRequired()])
    password1 = PasswordField(label="Password",validators=[Length(min=6),DataRequired()])
    password2 = PasswordField(label="Confirm password",validators=[EqualTo('password1'),DataRequired()])
    submit = SubmitField(label="Create account")


class LoginForm(FlaskForm):
    email = StringField(label="Email",validators=[Email(),DataRequired()])
    password = PasswordField(label="Password",validators=[DataRequired()])
    submit = SubmitField(label="Login")


class FilterForm(FlaskForm):
    name = StringField(label="Name")
    amount_from = IntegerField(label="Amount from")
    amount_to = IntegerField(label="Amount to")
    datetime_from = DateTimeField(label="Time from")
    datetime_to = DateTimeField(label="Time to")
    submit = SubmitField(label="Filter")

