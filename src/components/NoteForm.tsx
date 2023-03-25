import {
    useEffect,
    useState
} from "react";

import Note, { EMPTY_NOTE } from '../models/Note';
import { Tag } from "../models/Tag";

import {
    getNoteTagList,
    removeTagFromNote,
} from '../logic/Helper';

import "./NoteForm.scss";
import TagList from "./TagList";

interface NoteFormProps {
    note?: Note;
    onSubmit: (note: Note) => void
}

export default function NoteForm({
    note = { ...EMPTY_NOTE },
    onSubmit
}: NoteFormProps) {
    const [noteTitle, setNoteTitle] = useState(note.title);
    const [noteContent, setNoteContent] = useState(note.content);
    const [noteTagList, setNoteTagList] = useState<Tag[]>(getNoteTagList(note));

    useEffect(() => {
        const note: Note = {
            id: ``,
            title: noteTitle,
            content: noteContent,
        }

        const newNoteTagList = getNoteTagList(note);
        setNoteTagList(newNoteTagList);
    }, [noteTitle, noteContent])

    function onSubmitClick() {
        if (noteTitle === '' && noteContent === '') {
            window.alert(`None of the fields (Title, Content) are filled in. Please fill in at least one of them.`);
        } else {
            const newNote: Note = {
                id: note.id,
                title: noteTitle,
                content: noteContent
            };

            onSubmit(newNote);
        }
    }

    function onTitleEdit(newNoteTitle: string) {
        setNoteTitle(newNoteTitle);
    }

    function onContentEdit(newNoteContent: string) {
        setNoteContent(newNoteContent);
    }

    function onRemoveTag(tag: Tag) {
        const note: Note = {
            id: ``,
            title: noteTitle,
            content: noteContent,
        }
        const updatedNote = removeTagFromNote(note, tag);
        setNoteContent(updatedNote.content);
        setNoteTitle(updatedNote.title);
    }

    return (
        <form className="note-form"
            onSubmit={(event) => {
                event.preventDefault();
                onSubmitClick();
            }}
        >
            <section className="note-form-title">
                <label>
                    Title:
                </label>
                <input className="note-form-title-data"
                    type="text"
                    placeholder="Input note title"
                    value={noteTitle}
                    onChange={(event) => onTitleEdit(event.target.value)}
                />
            </section>
            <section className="note-form-content">
                <label>
                    Content:
                </label>
                <textarea className="note-form-content-data"
                    placeholder="Input note content"
                    value={noteContent}
                    onChange={(event) => onContentEdit(event.target.value)}
                />
            </section>
            <section className="note-form-tag-list">
                <label>Tags:</label>
                <div className="note-form-tag-list-data">
                    <TagList tagList={noteTagList} onRemoveTagClick={onRemoveTag} />
                </div>
            </section>
            <section className="note-form-tools">
                <button type="submit" className="submit-button"
                    onClick={(event) => { }}
                >
                    Save
                </button>
            </section>
        </form>
    )
}