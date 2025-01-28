import { useState, useEffect, useContext } from "react";
import { DataContext } from "../DataContext.jsx";
const Search = ({ setList }) => {
    const [val, setVal] = useState("");
    const [keys, setKeys] = useState();

    const { data } = useContext(DataContext);
    useEffect(() => {
        const val1 = Object.keys(data);
        setKeys(val1); //uid of each user taken
    }, [data]);

    const change = e => {
        const searchValue = e.target.value;
        setVal(searchValue);
        const user = window.localStorage.getItem("user");

        const result =
            searchValue.length === 0
                ? JSON.parse(data[user].friend_list) // serachValue is empty then it will show user friend_list
                : keys.filter(cur => {
                      return data[cur].username.includes(searchValue);
                  }); //take uid whose username includes serch value

        setList(result);//set uid list to display
    };

    return (
        <input
            type="text"
            className="w-full p-2 border-2 rounded-lg outline-none placeholder-white bg-transparent text-white"
            placeholder="Search for user..."
            onChange={change}
            value={val}
        />
    );
};

export default Search;
