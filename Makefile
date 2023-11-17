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
	npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml src

lintfix:
	npx eslint --ext js,jsx --no-eslintrc --fix --config .eslintrc.yml src

publish:
	npm publish

deploy:
	git push heroku

test:
	npm test -s

.PHONY: test

start-all:
	npx react-scripts start & npm run start