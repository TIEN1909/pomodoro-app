# JavaScript Practice

## Overview

- Build a Pomodoro Web Application (ref [Pomofocus.io](https://pomofocus.io/)).

## Target

- Apply knowledge of HTML5/CSS3/JavaScript (with ES6 syntax).
- Apply mobile-first development
- Apply MVC concept
- DOM manipulation, form validation.
- Understand and apply localStorage
- Understand how asynchronous code works & apply in practice (API call or any place we can json server in code).
- Use DevTools for debugging issues
- Deploy the app

- Editor: Visual Studio Code

- Support cross browser:

  - Chrome (114.0.5735.199)
  - Edge (114.0.1823.79)

- Screens ([refer here](https://getbootstrap.com/docs/5.0/layout/breakpoints/))
  - X-Small devices (portrait phones, 375px to 576px)
  - Small devices (landscape phones, 576px and up)
  - Large devices (desktops, 992px and up)

## Requirement

- For detailed requirements see [here](https://docs.google.com/document/d/10yRBBJ1IkSwQ1gEcmzaP-dvAXv8JOk8S9dgFN_5K740/edit)

## Team size

- 1 developer: Tien Vo Thanh

## Develop Environment

- [Visual Studio Code](https://code.visualstudio.com/)
- [Github](https://github.com/thanhnguyen-agilityio/tien-vo-thanh-internship)

## Project convention:
### Branch name format
`<prefix>/short-desc
`

- ex: feat/header-section

- ex: fix/header-section

### Commit format:

`<type>[optional scope]: <description>
`

- ex: feat: allow provided config object to extend other configs
- ex: fix: prevent racing of requests

### PR format:

 `Title: #<issue-id> <prefix> / short-desc`

- ex: #123 Feat/ Do header section

- ex: #123 Fix/ Fix header section

## Environments:

- Node: v18.16.0
- Parcel: v2.9.3

## Run app:

- git clone https://github.com/thanhnguyen-agilityio/tien-vo-thanh-internship.git

Step 1:
- cd javascript-training/big-practice/json-server
- pnpm install
- pnpm start

Step 2:
- cd javascript-training/big-practice/pomodoro-app
- pnpm install
- pnpm run dev
- Open http://localhost:1234 to see the local website.

## Folder structure big practice

```
big-practice
│
├── json-server/
|   │── db.json
│   │── package.json
│   │── pnpm-lock.yaml
├── pomodoro-app/
│   │── src/
│   │   ├── assets/
│   │   │    ├── fonts/
│   │   │    ├── icons/
│   │   ├── scripts/
│   │   │    ├── constants/
│   │   │    ├── controllers/
│   │   │    ├── helpers/
│   │   │    ├── models/
│   │   │    ├── services/
│   │   │    ├── templates/
│   │   │    ├── views/
│   │   │    └── main.js
│   │   │    └── index.js
│   │   ├── styles/
│   │   │    ├── base/
│   │   │    ├── components/
│   │   │    ├── layout/
│   │   │    ├── pages/
│   │   │    ├── utils/
│   │   │    └── index.css
│   │   └── index.html
│   │── .editorconfig
│   │── .eslintignore
│   │── .eslintrc.js
│   │── .prettierignore
│   │── .prettierrc
│   │── package.json
│   └── pnpm-lock.yaml
│── .gitignore
└── README.md
```
