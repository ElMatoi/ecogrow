import uuid
import strawberry
from models import Sensor as SensorDocument
from typing import List, Optional
from mongoengine import Document, FloatField, StringField
from typing import Union

@strawberry.type
class SensorType:
    id: str
    temperatura: float
    humedad: float
    nivel_agua: Optional[float] = None
    type: str


@strawberry.input
class SensorInput:
    temperatura: float
    humedad: float
    nivel_agua: Optional[float] = None
    



@strawberry.type
class Query:
    @strawberry.field
    def sensors(self) -> List[SensorType]:
        sensores = SensorDocument.objects.all()
        return [
            SensorType(
                id=sensor.id,  
                temperatura=sensor.temperatura,
                humedad=sensor.humedad,
                nivel_agua=sensor.nivel_agua,
                type=sensor.type
            )
            for sensor in sensores
        ]


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_sensor(self, input: SensorInput) -> SensorType:
        
        if input.nivel_agua is not None:
            sensor_type = "agua"  
        else:
            sensor_type = "temperatura"  

        sensor = SensorDocument(
            id=str(uuid.uuid4()),
            temperatura=input.temperatura,
            humedad=input.humedad,
            nivel_agua=input.nivel_agua if input.nivel_agua is not None else None,
            type=sensor_type  
        )
        sensor.save()

        return SensorType(
            id=sensor.id,
            temperatura=sensor.temperatura,
            humedad=sensor.humedad,
            nivel_agua=sensor.nivel_agua,
            type=sensor.type 
        )


schema = strawberry.Schema(query=Query, mutation=Mutation)
