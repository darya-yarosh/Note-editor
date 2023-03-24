import TagElement from "./TagElement"

import { Tag } from "../models/Tag"

import "./TagList.scss";

interface TagListProps {
    tagList: Tag[],
    onRemoveTagClick: (tag: Tag) => void,
    onTagClick?: (tag: Tag) => void
}

export default function TagList({
    tagList,
    onRemoveTagClick,
    onTagClick
}: TagListProps) {
    return (
        <div className="tag-list">
            {(tagList.length === 0) &&
                <p>
                    Tags list is empty. To add a tag, write a word starting with # in the note.
                </p>
            }
            {tagList.map((tag: Tag) =>
                <TagElement
                    key={tag}
                    tag={tag}
                    onTagClick={onTagClick}
                    onRemoveTagClick={onRemoveTagClick}
                />
            )}
        </div>
    )
}