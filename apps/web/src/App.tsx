import { useMemo } from "react";
import { Autocomplete } from "autocomplete";

import { useApi } from "./hooks/useApi";

import "./App.css";

function App() {
  const { data, loading, refetch } = useApi();

  const transformedData = useMemo(
    () => {
      if (data) {
        return data.map(({ name: { common }, flag }, index) => ({
          id: `${index}_${common}`,
          name: common,
          icon: flag,
        }))
      }
      return [];
    },
    [data]
  );

  const handleOnChange = (value: string) => {
    refetch(value);
  };

  return (
    <div className="main">
      <div className="content">
        <h1>Autocomplete</h1>
        <Autocomplete
          placeholder="Type something"
          data={transformedData}
          loading={loading}
          onChange={handleOnChange}
          onSelect={(idSelected) => alert(idSelected)}
        />
      </div>
    </div>
  );
}

export default App;
