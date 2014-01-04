
# Github issues viewer

Technologies used:

- React
- Backbone (mostly for routing... not mutable models here)
- Bootstrap for some styling
- LessCSS
- FontAwesome

## Known Issues

On the main page, the teaser of the issue body can break markdown sytax,
resulting in awkward-looking `\`\`\`some code here` or `**bold but not` at the
end of the teaser.

I thought about (and started implementing) an ad-hoc fix but then stopped,
because it was dirtly and incomplete. The real solution would be to translate
the raw text into a markdown syntax tree, and then grab the first x chunks
from there. A project for another time. I couldn't find a lib on npm to do it,
but if you know of one, please open an issue or pr.

