# TogetherBus - Service

## Description

Service for TogetherBus Application.

## Installation (for development)

- MySQL
  - Install MySQL.
  - Create database and user with setting in `src/config/config.yaml`.
  - Grant all privileges for created user in created database.
  - Import sample database from `db/tobus_db.sql`
- Project depedencies

```bash
yarn install
```

## Running the app (development)

```bash
# development
yarn run start

# watch mode
yarn run start:dev
```

## Installation (for production)

- In `docker-compose.yml`, please replace `nbtt/tobus:latest` to your docker hub image.
- Build the docker image:

```sh
docker compose build
docker push <your_image_name>
```

- Prepare a server and install docker engine
- Create data folder in server: `mkdir ~/tobus-data`
- Prepare settings:
  - Create new branch: `git checkout -b deploy-local`
  - Edit `src/config/config.prod.yaml` and `docker-compose.yml` with new value for any password field.
  - In `docker-compose.yml`, replace this value: `./src/config/config.prod.yaml`, to new value `./config.prod.yaml`
  - Commit the edited files to save the settings.

- Push settings to server:
  - Create folder to store settings in server: `mkdir ~/tobus-service`
  - Copy necessary files to server

```sh
scp -r db src/config/config.prod.yaml docker-compose.yml nginx.conf  <your_username>@<your_server_ip>:~/tobus-service/
```

- Pull docker image to server:

```sh
cd ~/tobus-service
docker compose pull
```

## Running the app (production)

```bash
docker compose up -d --scale api=4
```

## License

TogetherBus-Service is [MIT licensed](LICENSE).
