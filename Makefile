.PHONY: build install up start

FIG=docker-compose

build:
	$(FIG) build

install: build
	for file in apps/**/.env.dist; do (test -f $${file%.dist} || cp $$file $${file%.dist}); done

up:
	$(FIG) up -d --no-build

start: up

logs:
	$(FIG) logs
