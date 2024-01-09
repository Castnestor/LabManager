import { useState, useContext, createContext } from 'react';

//Creating a context
const TestsContext = createContext();

export const TestsProvider = (props) => {
    const [tests, setTests] = useState([]);

    function handleTests(test) {
        console.log(test)
         
        setTests(test);
        
    }

    //provide the context
    return (
        <TestsContext.Provider value={{ tests, handleTests }}>
            {props.children}
        </TestsContext.Provider>
    );
};

//Export the context inside a custom hook
export const useTestsContext = () => {
    return useContext(TestsContext);
};