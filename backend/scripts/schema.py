import graphene
from graphene_mongo import MongoengineObjectType
from models import Sensor as SensorDocument, SensorInputModel


class SensorType(MongoengineObjectType): ## molde de graph del documento mongo sensor
    class Meta:
        model = SensorDocument

# dto crear sensores
class SensorInput(graphene.InputObjectType):
    temperatura = graphene.Float(required=True)
    humedad = graphene.Float(required=True)

# mutacion para crear sensor
class CreateSensor(graphene.Mutation):
    class Arguments:
        input = SensorInput(required=True)

    sensor = graphene.Field(SensorType)

    def mutate(self, info, input):
      
        data = SensorInputModel(**input)
        sensor_doc = SensorDocument(
            temperatura=data.temperatura,
            humedad=data.humedad
        )
        sensor_doc.save()
        return CreateSensor(sensor=sensor_doc)

# get obtener sensores
class Query(graphene.ObjectType):
    sensors = graphene.List(SensorType)

    def resolve_sensors(self, info):
        return list(SensorDocument.objects.all())


class Mutation(graphene.ObjectType):
    create_sensor = CreateSensor.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
