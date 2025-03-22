import {useState}from 'react'

function useCounter(num) {
    const [count, setCount] = useState(num);
    
    const increaseCount = () => {
        setCount(count + 1);
    }

    return [count, increaseCount];
}

export default useCounter
