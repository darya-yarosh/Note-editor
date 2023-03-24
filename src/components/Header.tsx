
import SearchInput from "./SearchInput";

import { Tag } from "../models/Tag";

import "./Header.scss";

interface HeaderProps {
    filterTag: Tag;
    setFilterTag: (tag: Tag) => void
}

export default function Header({
    filterTag,
    setFilterTag
}: HeaderProps) {
    return (
        <header>
            <h1 className="app-name">
                Notes App
            </h1>
            <SearchInput
                value={filterTag}
                onChange={setFilterTag}
                placeholderValue="#tag"
            />
        </header>
    )

}

