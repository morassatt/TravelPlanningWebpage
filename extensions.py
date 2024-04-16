from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from passlib.context import CryptContext

db = SQLAlchemy()
migrate = Migrate()
ma = Marshmallow()
cors = CORS()
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
jwt = JWTManager()