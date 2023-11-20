import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteQuiz = async (delQuestion) => {
    try {
      await fetch(`http://localhost:4000/questions/${delQuestion.id}`, {
        method: "DELETE",
      });

      const updatedQuestions = questions.filter(
        (question) => question.id !== delQuestion.id
      );
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectAnswerChange = async (id, newCorrectIndex) => {
    try {
      const updatedQuestions = questions.map((question) =>
        question.id === id
          ? { ...question, correctIndex: newCorrectIndex }
          : question
      );

      setQuestions(updatedQuestions);

      await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((quiz) => (
          <QuestionItem
            question={quiz}
            key={quiz.id}
            onDelete={handleDeleteQuiz}
            onCorrectAnswerChange={handleCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}


export default QuestionList;



/*function QuestionList() {
  const [questions,setQuestions]=useState([]);
//fetch for display
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      setQuestions(data)})
    .catch((error)=>console.log(error))
  },[])

  function handleDeleteQuiz(delQuestion){
   console.log(delQuestion)
  const updatedQuestions= questions.filter((question) => question.id !== delQuestion.id);
   setQuestions(updatedQuestions); 

    fetch(`http://localhost:4000/questions/${delQuestion.id}`, {
  method: "DELETE",
})
  .then((r) => r.json())
  .then((data) => console.log(data))
     }

    const handleCorrectAnswerChange = (id, newCorrectIndex) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === id) {
          return { ...question, correctIndex: newCorrectIndex };
        }
        return question;
      });
  
      setQuestions(updatedQuestions);
  
      fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      }).catch((error) =>
        console.error('Error updating correct answer on the server: ', error)
      );
    };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
      {questions.map((quiz)=>(<QuestionItem question={quiz} key={quiz.id} onDelete={handleDeleteQuiz}  onCorrectAnswerChange={handleCorrectAnswerChange}/>))
    }
      </ul>
    </section>
  );
}*/