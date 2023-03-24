import NoteCard from "./NoteCard";

import Note from "../models/Note"
import { Tag } from "../models/Tag";

import "./NoteList.scss";

interface NoteListProps {
    noteList: Note[],
    onEditNoteClick: (note: Note) => void,
    onRemoveNoteClick: (note: Note) => void,
    onRemoveNoteTagClick: (note: Note, tag: Tag) => void,
}

export default function NoteList({
    noteList,
    onEditNoteClick,
    onRemoveNoteClick,
    onRemoveNoteTagClick,
}: NoteListProps) {
    return (
        <div className="note-list">
            <h1>
                Notes
            </h1>
            {(noteList.length === 0) && (
                <p>Notes list is empty. Click on "Add Note" in the navigation tools.</p>)
            }
            <div className="note-list-content">
                {(noteList.length > 0) && (
                    noteList.map((note: Note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEditNote={onEditNoteClick}
                            onRemoveNote={onRemoveNoteClick}
                            onRemoveNoteTag={onRemoveNoteTagClick}
                        />
                    ))
                )}
            </div>
        </div>
    )
}