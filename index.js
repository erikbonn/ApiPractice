const express = require('express')
const app = express()
// const pug = require('pug')
let fetch = require('node-fetch')
app.set('view engine', 'pug')
app.set("views", __dirname)

const getPokemon = () => {
  return new Promise(function (resolve, reject) {
    fetch('https://pokeapi.co/api/v2/pokemon/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(response => {
      return response.json()
    }).then(data => {
      console.log(data)
      resolve(data)
      // res.send(data)
    }).catch(err => {
      console.log(err)
      reject(err)
    });
  })
}

app.get('/', (req, res, next) => {
  getPokemon().then(data => {
    res.render("index", {
      namesAndUrls: data.results.map((poke, index) => {
        return [index, poke.name, poke.url]
      })
    })
  })
  // res.sendFile(__dirname + '/index.pug', {name: 'datum'})
})

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
})

// ul
//         for name in names 
//           li= name 
