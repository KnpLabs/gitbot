.PHONY: build install up start

FIG?=docker-compose
CONTAINER?=

ifneq (,$(C))
	CONTAINER=$(C)
endif

build:
	$(FIG) build

install:
	for file in apps/**/.env.dist; do (test -f $${file%.dist} || cp $$file $${file%.dist}); done
	for file in apps/**/package.json; do (npm install); done

up:
	$(FIG) up -d --no-build $(CONTAINER)

start: up

stop:
	$(FIG) stop $(CONTAINER)

restart: stop up

logs:
	$(FIG) logs -f $(CONTAINER)
