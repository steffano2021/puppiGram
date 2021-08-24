from .db import db

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image = db.Column(db.Text, nullable=False)
    caption = db.Column(db.String(50))
    created_at = db.Column(db.Date , nullable=False)
    updated_at = db.Column(db.Date , nullable=False)

    comments = db.relationship("Comment", backref=db.backref("images"), lazy=True )
    users = db.relationship("User", secondary='likes', backref=db.backref("images"), lazy=True)

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'image': self.image,
        'caption':self.caption,
        'created_at': self.created_at,
        'updated_at': self.updated_at
        }
