install: install-deps

start:
	heroku local -f Procfile.dev

start-backend:
	npm start --watch --verbose-watch

start-frontend:
	npx webpack serve

install-deps:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

lintfix:
	npx eslint --fix ./src

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test

start-all:
	npx react-scripts start & npm run start