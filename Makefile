init: init-folders init-default-files

init-folders:
	cd ./scripts && sh init-folders.sh

init-default-files:
	cd ./scripts && sh init-default-files.sh

up:
	docker compose --profile full watch

down:
	docker compose down

up-xray:
	docker-compose --profile xray up
