![Shower Thoughts](./public/images/readme.png)

<h3 align="center">
    &#x2B21;
    <a href="https://github.com/NeffCodes/shower_thoughts/issues">Report Bug</a> &nbsp; &nbsp;
    &#x2B21;
    <a href="https://github.com/NeffCodes/shower_thoughts/issues">Request Feature</a>
</h3>

____

This site allows you to write and share publicly your "shower thoughts" with other users, or keep a private collection for yourself.

"Shower thought" is a loose term that applies to the types of thoughts you might have while carrying out a routine task like showering, driving, or daydreaming. At their best, shower thoughts are universally relatable and find the amusing/interesting within the mundane.

**Live Site:** [http://thoughts-collection.herokuapp.com/](http://thoughts-collection.herokuapp.com/)

## 💻 Tech Used

- Web browser, ie HTML, CSS, JS
- Node.js: Environment for running Javascript serverside
- Express: Web framework for Node
- MongoDB Atlas, Mongoose: Cloud database
- Handlebars: Templating language
- Passport Google OAuth & Anonymouse: Authentication

## 📚 Lessons Learned

Creating models is a fantastic way to help keep the data organized going to my database. Also, using passport for authentication isn't as scary as I once thought it was.

## 💾 Usage

Create a config folder with a config.env file in it.
Add your mongoDB URI and Google OAuth credentials to the config.env file

```.env
MONGO_URI = <your mongo uri>

GOOGLE_CLIENT_ID = <your google client id>
GOOGLE_CLIENT_SECRET = <your google client sectret>
```

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm run start
```

## 💡 Contributing

Found an issue or want to add a cool feature to this site? Awesome! Leave a comment in the issues tab and I will assign it to you.

1. Comment in the issues [tab](https://github.com/NeffCodes/shower_thoughts/issues)
2. Fork or clone this repo
3. Build the code you wish to add
4. Create a pull request
