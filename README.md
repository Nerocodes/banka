# Banka
[![Coverage Status](https://coveralls.io/repos/github/Nerocodes/banka/badge.svg?branch=develop)](https://coveralls.io/github/Nerocodes/banka?branch=develop)
[![Build Status](https://travis-ci.org/Nerocodes/banka.svg?branch=develop)](https://travis-ci.org/Nerocodes/banka)

Banka is a simple web banking application that allows users to create bank accounts and have cashiers perform debit and credit transactions.

## Built With
- Nodejs
- PostgreSQL

## Features
- Users can
    - Sign up
    - Sign in
    - Create bank account and view account details
    - View transaction and transaction history
- Staff/Cashier can
    - View bank accounts
    - Perform debit and credit transactions on bank accounts
    - Delete bank accounts
- Admin can
    - View bank accounts
    - Delete bank accounts
    - Create staff or admin

## Getting Started
To run banka locally simply follow the instructions below:

#### Prerequisites
You need to have or install the following:
1. Git bash
2. Npm
3. Postman

#### Installation
- clone repo
    ```
    git clone https://github.com/Nerocodes/banka.git
    ```
- navigate to api folder
- run installation
    ```
    npm install
    ```
- create a `.env` file with this template
    ```
    NODE_ENV=DEV
    DEVPG='Your postgres database url'
    TESTPG='Your postgres test database url'
    ```
- start app
    ```
    npm run dev-start
    ```
- you can now make requests using postman to `localhost:9000/api/v1/`

## Running Tests
To run tests simply run the following command in your git bash or command line
``` 
npm run test
```
### API
Heroku: [Banka-Web-App](https://banka-web-app.herokuapp.com/)
Documentation: [Banka-Docs](https://documenter.getpostman.com/view/6692772/S1ENyyf9#0d24455e-8a99-4123-8990-b008622679d9)

| Endpoints | Functionality |
| --- | --- |
| POST /auth/signup | Create user account |
| POST /auth/signin | Login a user |
| POST /accounts | Create a bank account |
| PATCH  /account/<account-number> | Activate or deactivate an account |
| DELETE  /accounts/<account-number> | Delete a specific bank account |
| POST  /transactions/<account-number>/debit | Debit a bank account |
| POST  /transactions/<account-number>/credit | Credit a bank account |

#### UI
You can view the user interface here [Banka](https://nerocodes.github.io/banka/ui/)

## Author
Oghenero Paul-Ejukorlem 
[@nerocodes](https://twitter.com/nerocodes)