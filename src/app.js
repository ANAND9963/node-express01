const PORT = 3000;
const express = require("express");

const fs = require("fs");

const bodyParser = require("body-parser");
const { log, error } = require("console");

const server = express();

server.use(bodyParser.json());

server.listen(PORT, () => {});

const readMovies = () => {
  const contents = fs.readFileSync("movies.txt", "utf8");
  return contents.split("\n");
};

const allMovies = readMovies();


let randomIdx = Math.floor(Math.random() * allMovies.length);

let movieToGuess = allMovies[randomIdx];

let set = {};


const validateInput = (req , res , next) => {

    let {letter} = req.body;

    letter = letter.trim().toLowerCase();

    
    

    if(set[letter]) {
        return res.status(400).send({error : "letter already used"});
     }
     req.letter = letter;
     next();

}

const postFunction = (req , res) =>{

    let {letter} = req;
   

    
    set[letter] = true;
    res.status(202).send("success");

}


server.post("/guess", validateInput,postFunction );

server.get("/guess", (req, res) => {

    let movieSoFar = "";

    if(Object.keys(set).length >= 9) return res.status(200).send("You lost the Game");


    for(let i =0 ; i < movieToGuess.length ;i++){
        let ch = movieToGuess.charAt(i);
        ch = ch.trim().toLowerCase();
        if(set[ch]){
            if(i ===0 ){

                movieSoFar = movieSoFar + ch.toUpperCase();
            }else{

                movieSoFar = movieSoFar + ch;
            }

            
        }
        else {
            movieSoFar+= "_" ;
        }
        
        
    }

    if(movieSoFar === movieToGuess){
        return res.status(200).send("You guesed the movie " );
    }

    return res.status(200).json({movieSoFar })
})
