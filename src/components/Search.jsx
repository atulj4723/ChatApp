import { useState, useEffect, useContext } from "react";
import { DataContext } from "../DataContext.jsx";
const Search = ({ setList }) => {
    const [val, setVal] = useState("");
    const [keys, setKeys] = useState();

    const { data } = useContext(DataContext);
    useEffect(() => {
        const val1 = Object.keys(data);
        setKeys(val1);
    }, [data]);

    const change = e => {
        const searchValue = e.target.value;
        setVal(searchValue);
        const user = window.localStorage.getItem("user");

        const result =
            searchValue.length === 0
                ? JSON.parse(data[user].friend_list)
                : keys.filter(cur => {
                      return data[cur].username.includes(searchValue);
                  });
        
        setList(result);
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
