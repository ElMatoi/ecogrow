from mongoengine import Document, StringField, FloatField, connect
from pydantic import BaseModel, Field


connect(db="sensores_db", host="mongodb://localhost:27017")


class Sensor(Document):
    temperatura = FloatField(required=True)
    humedad = FloatField(required=True)



class SensorInputModel(BaseModel):
    temperatura: float = Field(..., example=23.5)
    humedad: float = Field(..., example=60.0)