# Way too due

## First thing to do :
Please before anything:
  - Run the following commands:
    1)$ npm install --save
    2)$ npm install node-sass
    3)$ npm node-pre-gyp install
    4)$ npm install bcrypt

  - Add credentials to .env_pub (DB_PASS and DB_USER are undefined upon cloning)
    1) DB_USER= "-DO YOUR THING-"
    2) DB_PASS= "-DO YOUR OTHER THING-"

  - migrate and Seed db:
    1)$ knex migrate:latest
    2)$ knex migrate:rollback
    3)$ knex migrate:latest
    4)$ knex seed:run

  - Finally, you can:
    $ npm run local  

## Getting Started

  - Visit localhost:8080

  - Signup! A user may signup with multiple emails but only the username must be unique.

  - Type a task in the input field:
    The following keyword will categorize the task if they initialize the input:
      "Watch" - Movies
      "Read"  - Books
      "Try"   - Eat
      "Buy"   - Products

  - Log back in to view your too due items !

##Known issues

  - You cannot edit items that aren't categorized

  - Categories navbar doesn't appear after login before page is refreshed

  - Cannot delete items from to do list (missing delete button)

  - Images don't look good

  - Positioning of items isn't awesome

  - Registration isn't strict enough

  - Dependencies dont install properly



## Dependencies
- psql

- dotenv

- nodemon

- bcrypt

- cookie-session

- Node 5.10.x or above

- NPM 3.8.x or above
