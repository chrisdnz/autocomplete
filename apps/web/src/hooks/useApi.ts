import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 25;

type ApiResponse = {
  name: {
    common: string;
  };
  flag: string;
}

export const useApi = () => {
  const [data, setData] = useState<ApiResponse[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const refetch = (name: string) => {
    setLoading(true)
    const url = name ? `${API_URL}/name/${name}` : `${API_URL}/all`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        if (!json.status) {
          setData(json)
        } else {
          setData([])
        }
      })
      .catch(error => {
        setError(error)
      }).finally(() => setLoading(false))
  };

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/all`)
      .then(response => response.json())
      .then((json) => {
        if (!json.status) {
          setData(json.slice(0, PAGE_SIZE))
        }
      })
      .catch(error => {
        setError(error)
      }).finally(() => setLoading(false))
  }, [])

  return { data, error, loading, refetch }
};