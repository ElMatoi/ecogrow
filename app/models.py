from typing import Optional, Union
from mongoengine import Document, FloatField, StringField
from pydantic import BaseModel, Field




class Sensor(Document):
    id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    temperatura = FloatField(required=True)
    humedad = FloatField(required=True)
    nivel_agua = FloatField(null=True) 
    type = StringField(required=False)



class SensorBaseModel(BaseModel):
    temperatura: float = Field(..., example=23.5)
    humedad: float = Field(..., example=60.0)



class SensorAguaModel(SensorBaseModel):
    nivel_agua: float = Field(..., example=1.2)



class SensorTemperaturaModel(SensorBaseModel):
    nivel_agua: Optional[None] = None



SensorInputModel = Union[SensorAguaModel, SensorTemperaturaModel]
