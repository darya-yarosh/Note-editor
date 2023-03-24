import { Tag } from "../models/Tag";

import "./TagElement.scss";

interface TagProps {
    tag: string;
    onRemoveTagClick: (tag: Tag) => void;
    onTagClick?: (tag: Tag) => void;
}

export default function TagElement({
    tag,
    onRemoveTagClick,
    onTagClick
}: TagProps) {
    function handleTagClick(tag: Tag) {
        if (onTagClick !== undefined){
            onTagClick(tag);
        }
    }

    return (
        <span key={tag} className={`tag ${onTagClick ? "clickable" : null}`}>
            <label onClick={()=>handleTagClick(tag)}>{tag}</label>
            <button onClick={() => onRemoveTagClick(tag)}>&times;</button>
        </span>
    )
}