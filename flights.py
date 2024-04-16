from extensions import db

class Flight(db.Model):
    __tablename__ = "flights"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flight_company = db.Column(db.String(20), nullable=False)
    flight_cost = db.Column(db.String(10), nullable=False)
    flight_date = db.Column(db.DateTime(), nullable=False)
    
    # relationships
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), unique=False, nullable=False)
    city = db.relationship("City", back_populates="flights")
    
    travel_plans = db.relationship('TravelPlan', back_populates='flight', lazy='dynamic')

    