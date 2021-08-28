from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import date, datetime
from app.forms.image_create_form import ImageCreateForm
from app.forms.image_edit_form import ImageEditForm
from app.models import Image, db

from app.config import Config
from app.aws_s3 import upload_file_to_s3

image_routes = Blueprint('images', __name__)


@image_routes.route("/")
def get_images():
    images = Image.query.all()
    return {image.to_dict()['id']: image.to_dict() for image in images}


@image_routes.route('/create', methods=['POST'])
@login_required
def create_image():
    form = ImageCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        file = data['image']
        file_url = upload_file_to_s3(file, Config.S3_BUCKET)
        new_image = Image(
            user_id = data['user_id'],
            image = file_url,
            caption = data['caption'],
            created_at = datetime.now(),
            updated_at = datetime.now(),
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    else:
        return {'errors': form.errors}, 500


@image_routes.route('/<int:id>', methods=['GET','PUT', 'PATCH', 'DELETE'])
@login_required
def put_and_del_image(id):
    image = Image.query.filter(Image.id == id).first()

    if request.method == 'GET':
        return image.to_dict()

    elif request.method == 'PUT':  # this is not submitting to aws
        form = ImageEditForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = form.data
            # image.image = data['image']
            image.caption = data['caption']
            db.session.commit()
            return image.to_dict()
        else:
            return {'errors':form.errors}, 500

    elif request.method == 'PATCH': # this submits to aws
        form = ImageCreateForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = form.data
            file = data['image']
            file_url = upload_file_to_s3(file, Config.S3_BUCKET)
            image.image = file_url,
            image.caption = data['caption']
            db.session.commit()
            return image.to_dict()
        else:
            return {'errors':form.errors}, 500

    elif request.method == 'DELETE':
        db.session.delete(image)
        db.session.commit()
        return {"deletion":"successful"}
