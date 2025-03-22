import {useState, useEffect} from 'react'

function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState({});
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const res = await fetch(url);
    
                if(!res.ok) {
                    setError(res.error);
                }
                const data = await res.json();
    
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [url])
    
  return {data,loading,error}
}

export default useFetch
