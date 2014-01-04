
PAGES = $(patsubst %.jsx, %.js, $(wildcard lib/pages/*.jsx))
COMPONENTS = $(patsubst %.jsx, %.js, $(wildcard lib/components/*.jsx))
COMPILED = $(PAGES) $(COMPONENTS)

build: components index.js twitter-audition.css lib $(COMPILED)
	@component build --dev -s twitterAudition -o web -n build

twitter-audition.css: index.less less
	@lessc index.less > $@

lib/pages/%.js: lib/pages/%.jsx
	@jsx $< > $@

lib/components/%.js: lib/components/%.jsx
	@jsx $< > $@

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

view:
	@xdg-open web/index.html

test: lint test-only

lint:
	jshint *.js lib test

test-only:
	mocha -R spec

.PHONY: clean
