import { useState } from "react";

import { debounce } from "../utils/debounce";

import "./autocomplete.css";

type Data = {
  id: string;
  name: string;
  icon: string;
};

interface Props {
  onChange?: (value: string) => void;
  onSelect?: (value?: string) => void;
  data: Data[];
  placeholder?: string;
  loading?: boolean;
}

export const Autocomplete = ({ onChange, onSelect, placeholder, data, loading }: Props) => {
  const [value, setValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>();

  const handleDebounce = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    }
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const changeSelectedDirection = (direction: 1 | -1) => {
    const selectedItem = document.querySelector('.autocomplete-item.selected')
    const allItems = document.querySelectorAll('.autocomplete-item')
    const currentIndex = Array.from(allItems).findIndex(item => item === selectedItem)
    
    const newSelected = Array.from(allItems)[currentIndex + direction] as HTMLDivElement

    if (newSelected) {
      setSelectedItem(newSelected.dataset.id)
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        changeSelectedDirection(1)
        break;
      case "ArrowUp":
        changeSelectedDirection(-1)
        break;
      case "Enter":
        // Run command
        onSelect?.(selectedItem);
        break;
    }
  };

  const select = (id: string) => {
    setSelectedItem(id);
  };

  const hasData = data.length > 0;

  return (
    <div className="autocomplete-container" onKeyDown={handleKeyDown}>
      <div className="flex">
        <input
          type="text"
          className="autocomplete-input"
          placeholder={placeholder}
          value={value}
          onInput={handleInput}
          onChange={handleDebounce}
        />
        {loading && (
          <div className="flex pr-16 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        )}
      </div>
      <hr className="autocomplete-hr" />
      <div className="autocomplete-list">
        {hasData ? data.map((item) => (
          <div
            key={item.id}
            className={`autocomplete-item ${
              selectedItem === item.id ? "selected" : ""
            }`}
            data-id={item.id}
            onPointerMove={() => select(item.id)}
            onClick={() => onSelect?.(item.id)}
          >
            <div>{item.icon}</div>
            <span>{item.name}</span>
          </div>
        )) : (
          !loading && <div className="autocomplete-item flex justify-center">No results found.</div>
        )}
      </div>
    </div>
  );
};
