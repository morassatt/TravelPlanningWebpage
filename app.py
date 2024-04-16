import os
from flask import Flask, make_response
from flask_restful import Api
from api.views import blueprint
from auth.views import auth_blueprint
from extensions import db, migrate, cors, jwt

app = Flask(__name__)
app.register_blueprint(blueprint=blueprint)
app.register_blueprint(blueprint=auth_blueprint)

app.config.from_object("config")
api = Api(app)
db.init_app(app)
migrate.init_app(app, db)
jwt.init_app(app)

# enable cors
cors.init_app(app, resources={r"/*": {
     "origins": ["*"]
}})

@app.route('/', methods=['get'])
def home():
     return make_response({"message": "Welcome to WH-Api"}), 200 
 
@app.route('/migrate', methods=['get'])
def dbreate():
    #db.drop_all()
    #db.create_all()
    return make_response({"message": "Migration complete"}), 200