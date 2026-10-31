# Really Good TRMNL Calendar

---

This is a calendar plugin for the self-hosted [TRMNL](https://trmnl.com)
ecosystem that aims to be really good.

It offers a variety of views and configuration options and tries to go the extra
mile to handle the tricky edge cases while keeping everything legible.

## Screenshots

TODO

## Features

- Hourly and list views
- Configurable number of days
- Full dark mode support
- Support for full and half vertical views

## Caveats

As of right now I have only tested it with [Larapaper](https://github.com/usetrmnl/larapaper).
It's possible that it works with other self-hosted TRMNL servers, but the data
model for ICS data URLs may be different.

The data backend is flexible enough it should be possible to support more
servers in the future, so open an issue with more information if you want
support for this.

## Roadmap

- Configuration options for the time window shown, e.g. "all events from
  tomorrow on"
- Additional display options for event text
- Support for half horizontal and quadrant views
  (do you have strong feelings about what this should look like? Open an issue
  and let's chat)
- Ability to handle more than 3 calendars
- Better localization!
- There will always be more fiddly edge cases to support

## Development

Unlike most TRMNL plugins, this one has a build step and development server that
needs to run:

```sh
bin/dev
```

This will serve up the JSON in `examples/`, update the dates to make working
with test data easier, and start the JS bundler.

Building a calendar solely in a templating language sucks (I've done it before),
and it made more sense to work with a fully JS-rendered approach to do all of
the necessary pixel and date math required to build this properly.
Using a bundler and splitting things up makes the process much easier!

All templates and stylesheets in `shared/` get compiled into `shared.liquid` in
the actual served plugin.

## Contributing

Contributions are welcome and encouraged!

Drive-by PRs without understanding from the author are better left as issues, though.
