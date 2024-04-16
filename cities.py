from extensions import db

class City(db.Model):
    __tablename__ = "cities"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False, unique=True)
    country = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    region = db.Column(db.String(20), nullable=False)
    
    # relationships
    property_types = db.relationship('PropertyType', back_populates='city', lazy='dynamic')
    accommodations = db.relationship('Accommodation', back_populates='city', lazy='dynamic')
    activities = db.relationship('Activity', back_populates='city', lazy='dynamic')
    flights = db.relationship('Flight', back_populates='city', lazy='dynamic')
    activities = db.relationship('Activity', back_populates='city', lazy='dynamic')
    travel_plans = db.relationship('TravelPlan', back_populates='city', lazy='dynamic')

    def __repr__(self):
        return f'<City "{self.name}">'

