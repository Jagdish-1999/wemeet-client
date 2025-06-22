"use client";

import { Input } from "../ui/input";

interface SearchInputPropTypes {
    setSearchUserHandler: (value: string) => void;
}
const SearchInput: React.FC<SearchInputPropTypes> = ({
    setSearchUserHandler,
}) => {
    return (
        <>
            <Input
                name="search"
                placeholder="Search"
                className="rounded-full font-[afacad]"
                onChange={(event) => setSearchUserHandler(event.target.value)}
            />
        </>
    );
};
export default SearchInput;
