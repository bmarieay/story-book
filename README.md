# Story Book

A Web App that allows users to:

1. Sign In/Sign Up through Gmail
2. Post public or private stories
3. Edit and delete their stories
4. View other users' public stories
5. View other users' profile

**Upcoming Feature/s**
1. **💬 Chat** - user will be able to leave a comment to other's post
2. **👍 Reaction** - user will be able to leave a like to a post

## Frontend Technologies
- **HTML & Embedded Javascript** - ejs is used for templating, thus reducing multiple source files.

## Backend Technologies
- **NodeJS & ExpressJS** - used for server-side scripting such as creating routes, establishing a connection with the database, etc.
- **MongoDB** - NoSQL database for saving users and posts.
- **PassportJS** - used for google authentication when logging in/signing up

## Securities
- **Mongo Injection** - disabled dangerous visitors in injecting a query to get information from the database.
- **Route Protection** - only allowed authenticated users to visit a certain route or web page

### File Structure
```
.
|--🗂️ config
|    | `--🧾 db.js
|    | `--🧾 passport.js
|
|
|--🗂️ helpers
|    | `--🧾 ejs.js
|
|
|--🗂️ middleware
|    | `--🧾 authentication.js
|
|
|--🗂️ models
|    | `--🧾 Story.js
|    | `--🧾 User.js    
|
|
|--🗂️ public
|    |--📂 images
|    |     `--🧾 favicon.svg
|    |--📂 stylesheets
|    |     `--🧾 styles.css
|
|
|--🗂️ routes
|    | `--🧾 auth.js
|    | `--🧾 index.js 
|    | `--🧾 story.js 
|
|
|--🗂️ utils
|    | `--🧾 ApplicationError.js
|
|
|--🗂️ views
|    |--📂 layouts
|    |    `--🧾 boilerplate.ejs
|    |--📂 partials
|    |        `--🧾 _header.ejs
|    |--📂 stories
|    |        `--🧾 edit.ejs
|    |        `--🧾 index.ejs
|    |        `--🧾 new.ejs
|    |        `--🧾 show.ejs
|    |--📂 users
|    |        `--🧾 dashboard.ejs
|    |        `--🧾 login.ejs
|    |        `--🧾 show.ejs
|    |--🧾 error.ejs
|
|
|--🧾 .gitignore
|--🧾 app.js
|--🧾 package-lock.json
|--🧾 package.json
|--🧾 Procfile
|--🧾 README.md
```


