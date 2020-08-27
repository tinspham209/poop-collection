# Mini Project: 💩 Poop Collection 💩

## Date: 27 - Aug - 2020

### Description

A collaborative multiple player online game where YOU can be a 💩 hero by collecting all the dung created by the animals

### Deploy

### Screenshot

<img src="https://media0.giphy.com/media/LmCpTjqdvqiLLcU7LB/giphy.gif"/>

### Tech-Stack

Server:

- Dependencies

  - ExpressJS
  - Socket.io
  - morgan

- DevDependencies

  - nodemon

Client:

- HTML/CSS
- Javascript

### Plan Of Action

- Set up project with express
- First layout
- Connect Socket to server
- Connect Socket to client
- Create array of emoji
- Update location of Emoji with random function
- update logic of poop location
- remove poop onClick function
- update score function
- Send ID to server by socket when onClick poop
- Logger connected clients
- Render score when poop Click
- Update Logic for Poop is not re-render many times when users click many times
- Rate Limiting for onClick - 1 second
- Refactor:
  - createAnimal function
  - createPoop function
- Move Animals function in server
- Refactor:
  - collectPoop function
  - removePoop function
- Styling for animal move
- Move Animals function in client
- Style grow & shrink animation poops

### After this project

I have improve my knowledge about

- Socket.IO
- animation styles with css

I have understand about

- Javascript ES6
- VanillaJS
- OOP with JS

Next Steps:

- Deploy to GCloud App Engine

### Directory Structure

```
.
├──
└──
```

### Set up

- `git clone`
- `npm install`
- `npm start`
