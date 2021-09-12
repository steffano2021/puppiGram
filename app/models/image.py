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

    comments = db.relationship("Comment", backref="images", lazy=True, cascade="all, delete")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'image': self.image,
        'caption':self.caption,
        'username': self.img.username,
        'avatar': self.img.avatar,
        'created_at': self.created_at,
        'updated_at': self.updated_at
        }

    def for_profile(self):
        return {
            'id': self.id,
            'image': self.image,
        }
