# Flux-Chat

## Install

    npm i
    gulp
    npm start

## Architecture

    .
    ├── /src/                       # The source code of the application
    │   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
    |   ├── /assets/                # Static files which are copied to ./build on compile
    │   ├── /components/            # React components
    │   ├── /constants/             # Enumerations used in action creators and stores
    │   ├── /content/               # Website content (plain HTML or Markdown, Jade, you name it)
    │   ├── /core/                  # Core components (Flux dispatcher, base classes, utilities)
    │   ├── /dispatcher/            # Dispatcher
    │   ├── /stores/                # Stores contain the application state and logic
    │   ├── /templates/             # HTML templates for server-side rendering, emails etc.
    │   ├── /models/                # Mongoose models
    │   |   ├── /user.js
    │   |   ├── /message.js
    │   |   └── /chatroom.js
    │   ├── /app.js                 # Client-side startup script
    │   ├── /server.js              # Server-side startup script
    │   └── /routes.js              # Routing Server
    ├── .gitignore                  # A gitignore file specifies untracked files
    ├── package.json                # The list of 3rd party libraries and utilities
    ├── gulpfile.js                 # Configuration file for automated builds
    └── README.md                   # README
