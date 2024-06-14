const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController/userController')
const openAI = require('../controllers/openAIController/openAIController')

const errorHandler = require(`../middlewares/errorHandler/errorHandler`);
const authentication = require("../middlewares/authentication/authentication");
const authorization = require(`../middlewares/authorization/authorization`)

router.get('/')
router.post('/register', UserController.postRegister)
router.post('/login', UserController.postLogin)

router.use(authentication)

router.put('/edit/:id', UserController.updateUserById)
router.delete('/delete/:id', UserController.deleteUserById)



let history = [];
let theme = null;
router.post("/game", async (req, res) => {
    const { userAnswer } = req.body
    try {
        // If theme is not set, use the first userAnswer to set the theme
        if (!theme) {
          theme = userAnswer;
          const initialQuestion = {
            Question: "What is on your mind? A Character? An Animal? An Object",
            Guess: null
          };
          res.json(initialQuestion);
          return;
        }
    
        const responseOpenAI = await openAI(userAnswer, history, theme);
        const response = JSON.parse(responseOpenAI);
    
        // Add the new question and answer to the history
        if (history.length > 0) {
          history[history.length - 1].answer = userAnswer; // Update the last question's answer
        }
    
        // If the response contains a guess, reset the history and theme
        if (response.Guess) {
          history = [];
          theme = null;
        } else if (response.Question) {
          // Add the new question to history if it's not a guess
          history.push({ question: response.Question, answer: null });
        }
        
        res.json(response);
        console.log(history);
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while processing your request.' });
      }
    });
    

router.use(errorHandler);

module.exports = router;