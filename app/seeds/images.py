from app.models import db, Image
from datetime import datetime

def seed_images():
    image1 = Image( user_id=1, caption='sleeping dog',
                    image='https://i.imgur.com/YrWXG5g.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image2 = Image( user_id=1, caption='long hair dog',
                    image='https://i.imgur.com/f6UY8y1.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image3 = Image( user_id=1, caption='brown pair of poms',
                    image='https://i.imgur.com/5htJW0D.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())

    image4 = Image( user_id=2, caption='dog listening to music',
                    image='https://i.imgur.com/GfEJNo8.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image5 = Image( user_id=2, caption='its BOO!',
                    image='https://i.imgur.com/fw29zD4.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image6 = Image( user_id=2, caption='what is my dog thinking',
                    image='https://i.imgur.com/jxXrIs0.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())

    image7 = Image( user_id=3, caption='my dog is running',
                    image='https://i.imgur.com/pOT9xDs.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image8 = Image( user_id=3, caption='our family of dogs',
                    image='https://i.imgur.com/oPmbxlg.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image9 = Image( user_id=3, caption='he was angry at me :(',
                    image='https://i.imgur.com/6znHI07.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())
    image10 = Image( user_id=3, caption='Looks just like Nova!',
                    image='https://i.imgur.com/IRMU7A1.jpg',
                    created_at = datetime.now(), updated_at = datetime.now())

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
