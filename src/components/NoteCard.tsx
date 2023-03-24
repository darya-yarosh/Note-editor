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

function getFormattedNoteContent(noteContent: string): JSX.Element[] {
    const formattedNoteContent: JSX.Element[] = [];

    noteContent.split(` `).forEach(word => {
        if (isTag(word)) {
            formattedNoteContent.push(<strong className="note-card-content-tag">{word}</strong>);
        } else {
            formattedNoteContent.push(<>{word}</>);
        }
        formattedNoteContent.push(<>&nbsp;</>);
    });

    return formattedNoteContent.map((element, index) => <Fragment key={index}>{element}</Fragment>);
}

export default function NoteCard({
    note,
    onEditNote,
    onRemoveNote,
    onRemoveNoteTag,
}: NoteCardProps) {
    const noteContentElement: JSX.Element[] = getFormattedNoteContent(note.content);
    const noteTagList = getNoteTagList(note);

    function onRemoveNoteTagClick(tag: Tag) {
        onRemoveNoteTag(note, tag)
    }

    return (
        <div className="note-card">
            {note.title.length > 0 &&
                <h1 className="note-card-title">{note.title}</h1>
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
                <button className="button-edit" onClick={() => onEditNote(note)}>edit</button>
                <button className="button-delete" onClick={() => onRemoveNote(note)}>delete</button>
            </div>
        </div>
    )
}