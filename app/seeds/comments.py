from app.models import comment, db, Comment
from datetime import datetime

def seed_comments():

    comment1 = Comment(
        image_id=1, user_id=1, description='He looks so cute sleeping!',
        created_at = datetime.now(), updated_at = datetime.now())

    comment2 = Comment(
        image_id=2, user_id=1, description='his hair so so long!',
        created_at = datetime.now(), updated_at = datetime.now())

    comment3 = Comment(
        image_id=3, user_id=1, description='they look so alike!',
        created_at = datetime.now(), updated_at = datetime.now())

    comment4 = Comment(
        image_id=4, user_id=2, description='what song is he listening to?',
        created_at = datetime.now(), updated_at = datetime.now())

    comment5 = Comment(
        image_id=5, user_id=2, description='omg i havent seen Boo in forever!',
        created_at = datetime.now(), updated_at = datetime.now())

    comment6 = Comment(
        image_id=6, user_id=2, description='I bet hes thinking about food',
        created_at = datetime.now(), updated_at = datetime.now())

    comment7 = Comment(
        image_id=7, user_id=3, description='he looks very fast!',
        created_at = datetime.now(), updated_at = datetime.now())

    comment8 = Comment(
        image_id=8, user_id=3, description='aw what a beautiful family!',
        created_at = datetime.now(), updated_at = datetime.now())

    comment9 = Comment(
        image_id=9, user_id=3, description='aw I hope everything is ok',
        created_at = datetime.now(), updated_at = datetime.now())

    comment10 = Comment(
        image_id=10, user_id=3, description='he is so WHITE!',
        created_at = datetime.now(), updated_at = datetime.now())

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
