const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(userAnswer, history, theme) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Construct the history messages
  const historyMessages = history.map((item) => ({
    role: "user",
    content: `Q: ${item.question} A: ${item.answer}`,
  }));

  // Add the theme to the context if provided
  if (theme) {
    historyMessages.push({
      role: "system",
      content: `The theme of the game is: ${theme}`,
    });
  } else {
    historyMessages.push({
      role: "system",
      content: `Please start by asking the user for the theme of the game.`,
    });
  }

  // Get the last question from the history if it exists
  const lastQuestion = history.length > 0 ? history[history.length - 1].question : null;

  historyMessages.push({
    role: "system",
    content: 
    theme ? 
    `
    You are playing a guessing game, and you are the guesser. The user answered "${userAnswer}" to the question "${lastQuestion}". What should the next question be to narrow down the possibilities? The response must be a question that only has "Yes" or "No" as the answer. Don't give user a question that will have multiple answer.

    Don't repeat same question. 
    If you have done asking question with a certain subject, and the ${userAnswer} === 'No' , for 3 times in a row, change the subject of the question.

    When you feel confident enough, give your guess.

    The response must be in JSON format like this:
    {
        "Question": "Your next question here",
        "Guess": "Your guess here (optional)"
    }
    ` : `
    You are playing a guessing game, and you are the guesser. Please start by asking the user for the theme of the game.
    
    The response must be in JSON format like this:
    {
        "Question": "Your next question here",
        "Guess": "Your guess here (optional)"
    }
    `
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: historyMessages
  });
  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
};