from extensions import db

class Activity(db.Model):
    __tablename__ = "activities"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    activity_name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text(), nullable=False)
    
    # relationships
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), unique=False, nullable=False)
    city = db.relationship("City", back_populates="activities")
    
    travel_plans = db.relationship('TravelPlan', back_populates='activity', lazy='dynamic')

