import React from "react";

const Autocomplete = (props) => {
  const [visibility, setVisibility] = React.useState(false);
  const [value, setValue] = React.useState(props.value);
  const [suggestions, setSuggestions] = React.useState([]);

  const onValueChange = (value) => {
    setValue(value);
    props.onValueChange(value);
  };

  const onFetchSuggestions = async () => {
    const suggestions = await props.onFetchSuggestions();
    setSuggestions(suggestions);
  };

  return (
    <>
      <div className="autocomplete" key={1}>
        <input
          type="search"
          placeholder={props.placeholder}
          onFocus={(event) => {
            event.preventDefault();
            onFetchSuggestions();
            setVisibility(true);
          }}
          onChange={(event) => {
            event.preventDefault();
            setVisibility(true);
            onValueChange(event.target.value);
          }}
          value={value}
        ></input>
        <div
          className={
            visibility && value.length >= 1
              ? "autocomplete_items"
              : "autocomplete_items-hidden"
          }
          key={2}
        >
          {suggestions && suggestions.length === 0 && (
            <span
              onClick={(event) => {
                event.preventDefault();
                setVisibility(false);
              }}
            >
              Нет подходящих вариантов
            </span>
          )}
          {suggestions &&
            suggestions.map((suggestion, id) => {
              if (suggestion.toUpperCase().includes(value.toUpperCase())) {
                return (
                  <span
                    key={id}
                    onClick={(event) => {
                      event.preventDefault();
                      onValueChange(suggestion);
                      props.onInputBlur(suggestion);
                      setVisibility(false);
                    }}
                  >
                    {suggestion}
                  </span>
                );
              } else return <span style={{ display: "none" }} key={id}></span>;
            })}
        </div>
      </div>
    </>
  );
};

export default Autocomplete;
