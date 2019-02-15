# Snip code sharer

Jsfiddle/codepen-inspired code sharing tool made because I wanted a couple of features they didn't have:  
The ability to save over existing snippets without changing the url or adding versioning,
and an optional fullscreen preview with tabbed editors.

It's simple and meant for personal use, and currently has no way to create or manage users except through CLI.

The database is SQLite3, which is not currently abstracted in any way, so it is not easy to change.

In short, if you don't know exactly what you are doing, this isn't for you. But if you can use any part for
inspiration or building upon, feel free.

Please report any bugs or security issues via the contact form on kilolima.dk

## Setup

Project requires external web server to serve static files - or that functionality added in Node.

### Production

```
npm install --production
npm run reset
npm run adduser <username>
```

Then start the project with `npm start`, preferably with something like pm2.

### Development

```
npm install
npm run reset
npm run adduser <username>
npm run dev-start
```

This assumes you have webpack and nodemon installed globally, as well as an installation of PHP.
Of those only webpack is required, but can be installed locally if you prefer.

In that case, leave out `dev-start` and manually run webpack and set up a server to serve static files.

### License

[MIT](https://opensource.org/licenses/MIT)