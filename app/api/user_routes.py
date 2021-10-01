from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

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

@user_routes.route('/profile/edit')
def user_profile_edit():



    return
