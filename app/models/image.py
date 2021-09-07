from .db import db

likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('image_id', db.Integer, db.ForeignKey('images.id'), primary_key=True)
)

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(50))
    created_at = db.Column(db.Date , nullable=False)
    updated_at = db.Column(db.Date , nullable=False)

    users = db.relationship("User", backref="image", lazy=True)
    comments = db.relationship("Comment", backref="image", lazy=True, cascade="all, delete")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'image': self.image,
        'caption':self.caption,
        'created_at': self.created_at,
        'updated_at': self.updated_at
        }
