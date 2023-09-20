export const START_QUIZ = 'START_QUIZ';
export const SUBMIT_ANSWER = 'SUBMIT_ANSWER';
export const FETCH_LEADERBOARD = 'FETCH_LEADERBOARD';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SHOW_RESULTS = 'SHOW_RESULTS';
export const GO_TO_NEXT_QUESTION = 'GO_TO_NEXT_QUESTION';
export const ADD_USERDATA = 'ADD_USERDATA';

export const startQuiz = () => ({
  type: START_QUIZ
});

export const addUserData = (name, phone) => {
  return {
    type: 'ADD_USERDATA',
    payload: { name, phone }
};
} 

export const submitAnswer = (answer, answerIndex) => {
  return {
      type: 'SUBMIT_ANSWER',
      payload: { answer, answerIndex }
  };
};

// export const fetchLeaderboard = () => dispatch => {
//   // simulate API call
//   setTimeout(() => {
//     dispatch({ type: FETCH_LEADERBOARD, payload: [] }); // Example empty leaderboard payload
//   }, 1000);
// };

export const nextQuestion = () => {
    return {
      type: NEXT_QUESTION
    };
  };

  export const setShowResults = (value) => ({
    type: 'SHOW_RESULTS',
    payload: value,
});

export const goToNextQuestion = () => ({
  type: GO_TO_NEXT_QUESTION
});