import { Fragment } from "react";

import TagList from "./TagList";

import Note from "../models/Note";
import { Tag } from "../models/Tag";

import {
    getNoteTagList,
    isTag
} from "../logic/Helper";

import "./NoteCard.scss";

interface NoteCardProps {
    note: Note;
    onEditNote: (note: Note) => void;
    onRemoveNote: (note: Note) => void;
    onRemoveNoteTag: (note: Note, tag: Tag) => void;
}

function getTextWithHighlightedTags(text: string): JSX.Element[] {
    const formattedText: JSX.Element[] = [];

    text.split(` `).forEach(word => {
        if (isTag(word)) {
            formattedText.push(<strong className="note-card-content-tag">{word}</strong>);
        } else {
            formattedText.push(<>{word}</>);
        }
        formattedText.push(<>&nbsp;</>);
    });

    return formattedText.map((element, index) => <Fragment key={index}>{element}</Fragment>);
}

export default function NoteCard({
    note,
    onEditNote,
    onRemoveNote,
    onRemoveNoteTag,
}: NoteCardProps) {
    const noteTitleElement: JSX.Element[] = getTextWithHighlightedTags(note.title);
    const noteContentElement: JSX.Element[] = getTextWithHighlightedTags(note.content);
    const noteTagList = getNoteTagList(note);

    function onRemoveNoteTagClick(tag: Tag) {
        onRemoveNoteTag(note, tag)
    }

    return (
        <div className="note-card">
            {note.title.length > 0 &&
                <h1 className="note-card-title">
                    {noteTitleElement}
                </h1>
            }
            {note.content.length > 0 &&
                <p className="note-card-content">
                    {noteContentElement}
                </p>
            }
            {(noteTagList.length > 0) &&
                <TagList tagList={noteTagList} onRemoveTagClick={onRemoveNoteTagClick} />
            }
            <div className="note-card-tools">
                <button type="button" className="button-edit" onClick={() => onEditNote(note)}>edit</button>
                <button type="button" className="button-delete" onClick={() => onRemoveNote(note)}>delete</button>
            </div>
        </div>
    )
}