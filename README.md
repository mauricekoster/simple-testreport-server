# simple-testreport-server
Simpel Testreport Server


## generate password

```
openssl rand -hex 32
```


### Project based on

Based on: https://github.com/tiangolo/full-stack-fastapi-postgresql


## Backend

### Create and start Postgres DB

See article: https://techviewleo.com/how-to-run-postgresql-in-podman-container/

``` 
podman pod create --name postgre-sql -p 9876:80 -p 5432:5432
podman pod ps

podman run --pod postgre-sql \
-e 'PGADMIN_DEFAULT_EMAIL=admin@example.com' \
-e 'PGADMIN_DEFAULT_PASSWORD=Passw0rd'  \
--name pgadmin \
-d docker.io/dpage/pgadmin4:latest

podman pull docker.io/library/postgres:14
podman images

podman run --name db --pod=postgre-sql -d \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=Passw0rd \
  docker.io/library/postgres:14
```

In the code, you can add
```
-v ~/your/data/volume:/var/lib/postgresql/data
```

```
podman pod ps
podman pod stats postgre-sql
```

Access the pgAdmin web UI with the URL http://localhost:9876
