import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://pure-caverns-82881.herokuapp.com/api/v54";

const useAxios = ({ url, p }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const config = require('../config.json');

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(url, { 
          headers: {"X-Access-Token": config.token},
          params: p
        })
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);

  return { response, error, loading };
};

export default useAxios;
