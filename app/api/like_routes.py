from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Image, db, User

like_routes = Blueprint('likes', __name__)

@like_routes.route('/<int:id>')
def get_likes_list(id):
    image = Image.query.get(id)
    users = image.image_like
    # { user.id: user for user in users }
    return { user.id: user.username for user in users }


@like_routes.route('/<int:id>', methods=['POST'])
def create_like(id):
    try:
        request_data = request.get_json()
        user_id = request_data['user_id']
        image = Image.query.get(id)
        user = User.query.get(user_id)
        image.image_like.append(user)
        db.session.commit()
    except:
        return {'errors': "error liking this image"}, 500
    else:
        return {'success':'yes'}


@like_routes.route('/<int:id>', methods=['PUT','DELETE'])
def delete_like(id):
    image = Image.query.get(id)

    if request.method == 'PUT':
        request_data = request.get_json()
        user_id = request_data['user_id']
        user = User.query.get(user_id)
        image.image_like.remove(user)
        db.session.commit()
        return {"deletion": "successful"}

    elif request.method == 'DELETE':
        image.image_like = []
        db.session.commit()
        return {"deletion":"successful"}

    else:
        return {"errors": "method does not exist"}, 500
