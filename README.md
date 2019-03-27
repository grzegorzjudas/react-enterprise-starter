![](https://circleci.com/gh/grzegorzjudas/react-enterprise-starter.svg?style=shield&circle-token=a9dadb1ee032d563de95da043e65b3be69049463)

# React Enterprise Starter
React application ready to work in enterprise environment

## Description
This is a starter project for enterprise-grade React applications. Feel free to use it.

![](https://user-images.githubusercontent.com/3832059/55101982-b19ac380-50c5-11e9-9a53-8e1332f91f13.png)

#### Ok, but what does it mean "enterprise"?
It means that it's set up in specific way, so it's easy to use across multiple environments with different configurations, using tooling specific to full-fledged system based on React that needs to be running 24/7. In detail, it includes:

<img src="https://user-images.githubusercontent.com/3832059/55103352-8a91c100-50c8-11e9-9ecd-4b433921e6c7.png" width="15" height="15" />Server-side rendering<br />

<img src="https://user-images.githubusercontent.com/3832059/55103352-8a91c100-50c8-11e9-9ecd-4b433921e6c7.png" width="15" height="15" />Docker image building<br />

<img src="https://user-images.githubusercontent.com/3832059/55103352-8a91c100-50c8-11e9-9ecd-4b433921e6c7.png" width="15" height="15" />Configuration suites different across your environments<br />

<img src="https://user-images.githubusercontent.com/3832059/55103352-8a91c100-50c8-11e9-9ecd-4b433921e6c7.png" width="15" height="15" />Selected configuration options available to React<br />

<img src="https://user-images.githubusercontent.com/3832059/55103352-8a91c100-50c8-11e9-9ecd-4b433921e6c7.png" width="15" height="15" />Code compressed and minified to increase the performance to maximum<br />

#### Don't you have anything else?
Well, regarding the technologies used, it's:
* React 16
* TypeScript 3 over ECMAScript 2018
* Redux/Thunk
* Webpack 4
* CSS Modules
* Linter
* Nodemon for development

Want to find out more? Have a look at the dependencies listed in *package.json* file.

## Usage

#### Before you start
The project has been generally prepared to work best (and has been tested) in VSCode, but nothing prevents you from using a different one - it may just need some configuration tweaks or plugins. As for the list of plugins that we used for VSCode, here:
* Debugger for Chrome
* EditorConfig for VS Code
* TSLint
* Jest

#### Dependency installation
You need to install the dependencies, of course.
```bash
npm install
```
or, if you prefer *yarn*:
```bash
yarn install
```
That's about it. You're ready to start the basic application.
> Note: From now on, for simplicity we'll use npm commands, but feel free to use yarn if you'd like.

#### Starting up
It's as simple as:
```bash
npm start
```
This will run the application the way it'll be ran in the target environment - but with the configuration based on environment set in your NODE_ENV environment variable. If it's not set, it'll default to "development".

#### That's nice, but it's not really suited for development, is it?
True. The code is minified, you don't get any sugar that helps with debugging. So if you're feeling like doing some coding, use this one instead:
```bash
npm run dev
```
It does more or less the same as the "start" command above, but gives you all the things necessary to develop (debug server, sourcemaps, file watching, etc).

#### It's enterprise, so there's bound to be some test framework.
Of course there is. In fact, there're two - for unit testing (Jest) and for automated tests (Puppeteer/Jest).
```bash
npm run test:unit
```
that one runs the unit tests only. If you want to run the automated ones, use this instead:
```bash
npm run test:automated
```
These are separate for compatibility reasons (if you're running in environment not supporting Puppeteer, i.e. in some oldish corporate environment). Nothing prevents you from running both of them (even in parallel, using unix's "&" operator). Or just "npm test", which runs both (not in parallel).

A note for the automated test: it runs headless on environments other than "development" (or none set) - but locally it will run the actual browser so you can see what it does. Remember to have the application running!

#### Ok, my app is ready for release. What now?
Then you most likely want to build it, package and deploy to some remote server.
```
NODE_ENV=production npm build
npm run package
```
These two commands to exactly what they say they do. First one builds two bundles - one with server AND client logic, so you can server-side render it and send to user's browser already rendered. Second is client only, that will be injected to user's browser to make already rendered applicaation "alive" (hydrate it).

Second command gets the whole thing and puts into "artifact.tar.gz" package in the `build/` folder that you can then proceed to do whatever you want with.

Notice we prefixed the build command with `NODE_ENV` variable set to `production`. This will build the bundle in production mode - meaning there will be no sourcemaps, everything will be compressed and minified, etc.

#### I'm using docker...
Good for you! We love containers! In this case, after building it (see above), run:
```
npm run docker:build
```
This is going to build the docker image with the application code already bundled in (listening on container's port 80). Remember to have a look at the package.json file and replace your image name before you use it!

## Troubleshooting
Having some troubles setting up/running? Let me know, I'll be glad to help/fix/add a note here for other souls in need in the future.
