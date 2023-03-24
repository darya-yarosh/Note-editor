import TagList from "./TagList";

import { Tag } from "../models/Tag";

import "./TagListSection.scss";

interface TagListSectionProps {
    tagList: Tag[],
    onRemoveTagClick: (tag: Tag) => void,
    onTagClick?: (tag: Tag) => void
}

export default function TagListSection({
    tagList,
    onRemoveTagClick,
    onTagClick: getClickedTag
}: TagListSectionProps) {
    return (
        <div className="tag-list-section">
            <h1>
                Tags
            </h1>
            {(tagList.length === 0) &&
                <p>
                    Tags list is empty. To add a tag, write a word starting with # in the note.
                </p>
            }
            {(tagList.length > 0) &&
                <TagList
                    tagList={tagList}
                    onRemoveTagClick={onRemoveTagClick}
                    onTagClick={getClickedTag}
                />
            }
        </div>
    )
}