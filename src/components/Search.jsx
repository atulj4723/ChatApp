import { useState } from "react";
const Search = ({ setList, data }) => {
    const [val, setVal] = useState("");

    const change = e => {
        const searchValue = e.target.value;
        setVal(searchValue);
        const user = window.localStorage.getItem("user");
        const keys = Object.keys(data);

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
