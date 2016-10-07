.PHONY: build install up start

FIG=docker-compose

build:
	$(FIG) build

install:
	for file in apps/**/.env.dist; do (test -f $${file%.dist} || cp $$file $${file%.dist}); done
	for file in apps/**/package.json; do (npm install); done

up:
	$(FIG) up -d --no-build

start: up

logs:
	$(FIG) logs
