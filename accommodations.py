from extensions import db

class Accommodation(db.Model):
    __tablename__ = "accommodations"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    accommodation_name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    
    # relationships
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), unique=False, nullable=False)
    city = db.relationship("City", back_populates="accommodations")
    travel_plans = db.relationship('TravelPlan', back_populates='accommodation', lazy='dynamic')
