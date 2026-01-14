from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os

# 🔥 FORCE env loading on Windows
load_dotenv(override=True)

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# 🔍 Temporary debug (keep for now)
print("DEBUG DB_NAME =", DB_NAME)
print("DEBUG MONGO_URI loaded =", bool(MONGO_URI))

if not MONGO_URI or not DB_NAME:
    raise RuntimeError("Environment variables not loaded properly")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

logs_collection = db["logs"]
users_collection = db["users"]
