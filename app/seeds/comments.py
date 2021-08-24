from app.models import comment, db, Comment
from datetime import datetime

def seed_images():

    comment1 = Comment(

    )



    db.session.add()

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
