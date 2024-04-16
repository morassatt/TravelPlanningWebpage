from extensions import db

class TravelPlan(db.Model):
    __tablename__ = "travel_plans"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.Text(), nullable=False)
    travel_date = db.Column(db.DateTime(), nullable=False)
    people_count = db.Column(db.Integer, nullable=False)
    
    # relationships
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    user = db.relationship("User", back_populates="travel_plans")
    
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), unique=False, nullable=False)
    city = db.relationship("City", back_populates="travel_plans")
    
    accommodation_id = db.Column(db.Integer, db.ForeignKey('accommodations.id'), unique=False, nullable=False)
    accommodation = db.relationship("Accommodation", back_populates="travel_plans")
    
    flight_id = db.Column(db.Integer, db.ForeignKey('flights.id'), unique=False, nullable=False)
    flight = db.relationship("Flight", back_populates="travel_plans")
    
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), unique=False, nullable=False)
    activity = db.relationship("Activity", back_populates="travel_plans")
