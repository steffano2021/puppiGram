from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import date, datetime
from app.forms.comment_create_form import CommentCreateForm
from app.models import Image, db, Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/')
def get_comments():
    comments = Comment.query.all()
    return {comment.to_dict()['id']: comment.to_dict() for comment in comments}


@comment_routes.route('/create', methods=['POST'])
def create_comment():
    form = CommentCreateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            user_id = data['user_id'],
            image_id = data['image_id'],
            description = data['description'],
            created_at = datetime.now(),
            updated_at = datetime.now(),
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    else:
        print(form.errors)
        return {'errors': form.errors}, 500


@comment_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
def put_and_del_comment(id):
    comment = Comment.query.filter(Comment.id == id).first()

    if request.method == 'PUT':
        form = CommentCreateForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            data = form.data
            comment.description = data['description']
            db.session.commit()
            return comment.to_dict()
        else:
            return {'errors':form.errors}, 500

    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return {"deletion":"successful"}
