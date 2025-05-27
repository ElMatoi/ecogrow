from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter
from schema import schema  
from mongoengine import connect
from models import Sensor as SensorDocument
import strawberry
from typing import List


connect(db="sensores_db", host="mongodb://mongo:27017")


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")


@app.get("/")
async def root():
    return {
        "api": "sensores Db mongo",
        "yarbis": ["FastAPI", "Strawberry GraphQL", "MongoDB"],
        "endpoint_graphql": "/graphql"
    }


def convert_id_to_str(sensor_id):
    return str(sensor_id)
