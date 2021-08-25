from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, TextField
from wtforms.validators import InputRequired ,DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Image





class ImageCreateForm(FlaskForm):
    user_id = IntegerField()
    caption = StringField('caption')
    image = TextField('image', validators=[DataRequired(message='please enter a image link')])
