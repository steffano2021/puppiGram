from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.Date , nullable=False)
    updated_at = db.Column(db.Date , nullable=False)

    def to_dict(self):
        return {
        'id': self.id,
        'image_id': self.image_id,
        'user_id': self.user_id,
        'description':self.description,
        'created_at': self.created_at,
        'updated_at': self.updated_at
        }
