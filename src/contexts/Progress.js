import React, { createContext, useState } from 'react';


// children이 Provider를 찾지 못했을 때 주는 값을 안에 넣음.
const ProgressContext = createContext({
    inProgress : false,
    spinner : () => {}});

const ProgressProvider = ({ children }) => {
    const [ inProgress, setInProgress ] = useState(false);
    const spinner = {
        start: () => {setInProgress(true);},
        stop : () => {setInProgress(false);},
    };

    const value = { inProgress, spinner } ;
    return (
        <ProgressContext.Provider value={value}>
            { children }
        </ProgressContext.Provider>
    )
}

export { ProgressContext, ProgressProvider };