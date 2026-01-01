import "./styles/Searchbar.css"

type SearchBarProps={
    usage: string
}

export const SearchBar = ({usage}:SearchBarProps) => {
    let placeholder:string = `Search ${usage}`
  return (
    <div className="searchbar">
        <input placeholder={placeholder} type="text" className="searchbar__input" /> 
        <button className="search__button-input">
            <span className="text">Search</span>
            <span className="icon">🔍</span>
        </button>
    </div>
  )
}
