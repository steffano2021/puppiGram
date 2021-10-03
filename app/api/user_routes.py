from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from app.forms.profile_edit import EditProfileForm

from app.config import Config
from app.aws_s3 import upload_file_to_s3

user_routes = Blueprint('users', __name__)

# returns all needed to populate a profile page
@user_routes.route('/profile/<int:id>')
def user_profile(id):
    user = User.query.get(id)
    result = user.to_dict()
    images = user.images
    images = { image.for_profile()['id']: image.for_profile() for image in images }
    result['images'] = images
    return result

@user_routes.route('/profile/edit/<int:id>', methods=['PUT', 'PATCH'])
def user_profile_edit(id):
    user = User.query.get(id)

    if request.method == 'PUT': # does not submit to AWS
        form = EditProfileForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print('-----------------------------------------')
        print(form.data)
        print('-----------------------------------------')
        if form.validate_on_submit():
            data = form.data
            user.username = data['username']
            user.email = data['email']
            user.bio = data['bio']
            db.session.commit()
            return
        else:
            return {'errors':form.errors}, 500

    elif request.method == 'PATCH': # this submits to aws
        form = EditProfileForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        print('-----------------------------------------')
        print(form.data)
        print('-----------------------------------------')
        if form.validate_on_submit():
            data = form.data
            file = data['avatar']
            file_url = upload_file_to_s3(file, Config.S3_BUCKET)
            user.avatar = file_url
            user.username = data['username']
            user.email = data['email']
            user.bio = data['bio']
            db.session.commit()
            return
        else:
            return {'errors':form.errors}, 500
