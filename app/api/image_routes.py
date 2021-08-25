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


@image_routes.route('/<int:id>', methods=['GET','PUT', 'DELETE'])
def put_and_del_image():

    image = Image.query.filter(Image.id == id).first()

    if request.method == 'GET':
        return image.to_dict()

    elif request.method == 'PUT':
        form = ImageCreateForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = form.data
            image.image = data['image']
            image.caption = data['caption']
            db.session.commit()
            return image.to_dict()
        else:
            return {'errors':form.errors}, 500

    elif request.method == 'DELETE':
        db.session.delete(image)
        db.session.commit()
        return {"deletion":"successful"}
