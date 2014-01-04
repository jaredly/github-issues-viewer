
build: components index.js twitter-audition.css
	@component build --dev -s twitterAudition -o web -n build

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
