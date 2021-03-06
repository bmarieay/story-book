# Story Book

A Web App that allows users to:

1. Sign In/Sign Up through Gmail
2. Post public or private stories
3. Edit and delete their stories
4. View other users' public stories
5. View other users' profile

**Upcoming Feature/s**
1. **๐ฌ Chat** - user will be able to leave a comment to other's post
2. **๐ Reaction** - user will be able to leave a like to a post

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
|--๐๏ธ config
|    | `--๐งพ db.js
|    | `--๐งพ passport.js
|
|
|--๐๏ธ helpers
|    | `--๐งพ ejs.js
|
|
|--๐๏ธ middleware
|    | `--๐งพ authentication.js
|
|
|--๐๏ธ models
|    | `--๐งพ Story.js
|    | `--๐งพ User.js    
|
|
|--๐๏ธ public
|    |--๐ images
|    |     `--๐งพ favicon.svg
|    |--๐ stylesheets
|    |     `--๐งพ styles.css
|
|
|--๐๏ธ routes
|    | `--๐งพ auth.js
|    | `--๐งพ index.js 
|    | `--๐งพ story.js 
|
|
|--๐๏ธ utils
|    | `--๐งพ ApplicationError.js
|
|
|--๐๏ธ views
|    |--๐ layouts
|    |    `--๐งพ boilerplate.ejs
|    |--๐ partials
|    |        `--๐งพ _header.ejs
|    |--๐ stories
|    |        `--๐งพ edit.ejs
|    |        `--๐งพ index.ejs
|    |        `--๐งพ new.ejs
|    |        `--๐งพ show.ejs
|    |--๐ users
|    |        `--๐งพ dashboard.ejs
|    |        `--๐งพ login.ejs
|    |        `--๐งพ show.ejs
|    |--๐งพ error.ejs
|
|
|--๐งพ .gitignore
|--๐งพ app.js
|--๐งพ package-lock.json
|--๐งพ package.json
|--๐งพ Procfile
|--๐งพ README.md
```


