.PHONY: build install

FIG=docker-compose

build:
  $(FIG) build

install: build
	for file in apps/**/.env.dist; do (test -f $${file%.dist} || cp $$file $${file%.dist}); done
