from extensions import db

class PropertyType(db.Model):
    __tablename__ = "property_types"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(), nullable=False, unique=True)
    description = db.Column(db.Text(), nullable=False)
    
    # relationships
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), unique=False, nullable=False)
    city = db.relationship("City", back_populates="property_types")