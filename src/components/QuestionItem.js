import React from "react";

function QuestionItem({ question ,onDelete, onCorrectAnswerChange}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
  function handleDeleteClick(){
//console.log(question)
onDelete(question)
  }



  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label >
        Correct Answer:
        <select onChange={onCorrectAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
