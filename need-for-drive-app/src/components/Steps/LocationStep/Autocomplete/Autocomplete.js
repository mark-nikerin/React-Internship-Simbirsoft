import React from "react";

const Autocomplete = (props) => {
  const [visibility, setVisibility] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const suggestions = props.suggestions;

  const onValueChange = (value) => {
    setValue(value.name);
    props.onValueChange(value);
  };

  return (
    <>
      <div className="autocomplete" key={1}>
        <input
          type="search"
          placeholder={props.placeholder}
          onFocus={(event) => {
            event.preventDefault();
            setVisibility(true);
          }}
          onChange={(event) => {
            event.preventDefault();
            setVisibility(true);
            onValueChange({ id: null, name: event.target.value });
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
              if (suggestion.name.toUpperCase().includes(value.toUpperCase())) {
                return (
                  <span
                    key={id}
                    onClick={(event) => {
                      event.preventDefault();
                      onValueChange(suggestion);
                      props.onInputBlur(suggestion.name);
                      setVisibility(false);
                    }}
                  >
                    {suggestion.name}
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
