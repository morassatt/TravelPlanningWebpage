import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

ENV = os.environ.get("ENV")
FLASK_DEBUG = os.environ.get("FLASK_DEBUG")
APP_SECRET = os.environ.get("APP_SECRET")
JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
SQLALCHEMY_DATABASE_URI = os.environ.get("SQLALCHEMY_DATABASE_URI")
JWT_TOKEN_LOCATION = ["headers"]
JWT_IDENTITY_CLAIM = "user_id"
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=300)