# SItCOM / LLiW

License : MIT.

## Development

```sh
bundle install
bundle exec rails db:migrate:reset
bundle exec rails db:seed
bundle exec rake environment elasticsearch:import:all FORCE=true
bundle exec rails server
```

## Production

See `DEPLOY.md` on how to deploy on a Ubuntu server.
