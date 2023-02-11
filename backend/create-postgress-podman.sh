POSTGRES_SERVER=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=changeme
POSTGRES_DB=app


podman pod create --name ${POSTGRES_SERVER} -p 9876:80 -p 5432:5432

podman run --name postgress-db --pod=${POSTGRES_SERVER} -d \
  -e POSTGRES_DB=${POSTGRES_DB} \
  -e POSTGRES_USER=${POSTGRES_USER} \
  -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
  docker.io/library/postgres:14

podman run --pod ${POSTGRES_SERVER} \
-e 'PGADMIN_DEFAULT_EMAIL=admin@example.com' \
-e 'PGADMIN_DEFAULT_PASSWORD=Passw0rd'  \
--name pgadmin \
-d docker.io/dpage/pgadmin4:latest  