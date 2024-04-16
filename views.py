from flask import Blueprint, jsonify
from flask_restful import Api
from api.resources import (
    UserList, 
    UserResource,
    PropertyTypeList,
    PropertyTypeResource,
    CityList,
    CityResource,
    ActivityList,
    ActivityResource,
    TravelPlanList,
    TravelPlanResource,
    FlightList,
    FlightResource,
    AccommodationList,
    AccommodationResource
)
from marshmallow import ValidationError

blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(blueprint, errors=blueprint.errorhandler)

api.add_resource(UserList, "/users")
api.add_resource(UserResource, "/users/<int:user_id>")
api.add_resource(PropertyTypeList, "/property_types")
api.add_resource(PropertyTypeResource, "/property_type/<int:property_type_id>")
api.add_resource(CityList, "/cities")
api.add_resource(CityResource, "/city/<int:city_id>")
api.add_resource(ActivityList, "/activities")
api.add_resource(ActivityResource, "/activity/<int:activity_id>")
api.add_resource(TravelPlanList, "/travel_plans")
api.add_resource(TravelPlanResource, "/travel_plan/<int:travel_plan_id>")

api.add_resource(FlightList, "/flights")
api.add_resource(FlightResource, "/flight/<int:flight_id>")

api.add_resource(AccommodationList, "/accommodations")
api.add_resource(AccommodationResource, "/accommodation/<int:accommodation_id>")

@blueprint.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
    