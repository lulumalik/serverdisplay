git pull &&
docker service rm APPS_dee-platform &&
docker build -t bmkg/server-display --no-cache . &&
docker stack deploy -c docker-compose.yml APPS
