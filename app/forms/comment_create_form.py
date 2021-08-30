from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, IntegerField, TextField, FileField
from wtforms.validators import InputRequired ,DataRequired, Email, ValidationError, Length, NumberRange
from app.models import Image



class CommentCreateForm(FlaskForm):
    user_id = IntegerField()
    image_id = IntegerField()
    description = StringField('description', validators=[Length(min=1, max=100, message="Caption must be less than %(max)d characters")])
