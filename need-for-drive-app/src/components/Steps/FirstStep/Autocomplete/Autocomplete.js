import React from "react";

const Autocomplete = (props) => {
  const [visibility, setVisibility] = React.useState(false);
  const [value, setValue] = React.useState(props.value);

  const onValueChange = (value) => {
    setValue(value);
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
            if (value.length >= 2) setVisibility(true);
          }}
          onChange={(event) => {
            event.preventDefault();
            if (value.length >= 2) setVisibility(true);
            onValueChange(event.target.value);
          }}
          value={value}
        ></input>
        <div
          className={
            visibility && value.length >= 2
              ? "autocomplete_items"
              : "autocomplete_items-hidden"
          }
          key={2}
        >
          {props.suggestions.map((suggestion, id) => {
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
