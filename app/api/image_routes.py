from flask import Blueprint, jsonify, request
# from flask_login import login_required
from datetime import date, datetime
from app.forms.image_create_form import ImageCreateForm
from app.models import Image, db

image_routes = Blueprint('images', __name__)


@image_routes.route("/")
def get_images():
    images = Image.query.all()
    return {image.to_dict()['id']: image.to_dict() for image in images}


@image_routes.route('/create', methods=['POST'])
def create_image():
    form = ImageCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_image = Image(
            user_id = data['user_id'],
            image = data['image'],
            caption = data['caption'],
            created_at = datetime.now(),
            updated_at = datetime.now(),
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    else:
        return {'errors':form.errors}, 500
