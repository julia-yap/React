import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {


    return (
        <>
            <Header />
            <Quiz />
        </>
    )
}

export default App;


// 1. Components: header, and quiz with current question and answers using state
// 2. Shuffle answers & show summary screen 
// 3. limited time per answer & progress bar