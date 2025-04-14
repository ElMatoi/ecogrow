from fastapi import FastAPI
from starlette_graphene3 import GraphQLApp
from schema import schema

app = FastAPI()


app.add_route("/graphql", GraphQLApp(schema=schema))


@app.get("/")
async def root():
    return {
        "api": "Sensores Db mongo",
        "tecnologías": ["FastAPI", "GraphQL", "MongoDB"],
        "endpoint_graphql": "/graphql"
    }

