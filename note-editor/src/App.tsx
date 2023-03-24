import { Fragment, useEffect, useState } from 'react';

import Header from './components/Header';
import Modal from './components/Modal';
import NavTools from './components/NavTools';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import TagListSection from './components/TagListSection';

import Note, { NOTE_LIST_TEMPLATE } from './models/Note';
import { Tag } from './models/Tag';

import {
    addNote,
    exportNoteList,
    getNotesTagList,
    getNoteTagList,
    removeNote,
    removeTagFromNote,
    removeTagFromNoteList,
    updateNote,
} from './logic/Helper';

import './App.scss';
import './Animations.scss';

export default function App() {
    const [noteList, setNoteList] = useState<Note[]>([]);
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [filterTag, setFilterTag] = useState<Tag>('');

    const [isModalShowed, setIsModalShowed] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

    useEffect(() => {
        const updatedTagList = getNotesTagList(noteList);
        setTagList(updatedTagList);
    }, [noteList])

    function handleRemoveNoteClick(note: Note) {
        const noteTitle = note.title === '' ? `this` : `"${note.title}"`;
        const isConfirmed = window.confirm(`Are you sure you want to remove ${noteTitle} note?`);

        if (isConfirmed) {
            const updatedNoteList = removeNote(noteList, note.id);
            setNoteList(updatedNoteList);
        }
    };


    function handleRemoveNoteTagClick(note: Note, tag: Tag) {
        const noteTitle = note.title === '' ? 'this' : `"${note.title}"`
        const result = window.confirm(`Are you sure you want to remove "${tag}" tag from ${noteTitle} note?`);

        if (result === true) {
            const updatedNote = removeTagFromNote(note, tag);
            onUpdateNote(updatedNote);
        }
    }

    function onUpdateNote(note: Note) {
        const updatedNoteList = updateNote(noteList, note);
        setNoteList(updatedNoteList);
    }

    function onRemoveTagClick(tag: Tag) {
        const isConfirmed = window.confirm(`Are you sure you want to remove "${tag}" tag from all notes?`);

        if (isConfirmed) {
            const updatedNoteList = removeTagFromNoteList(noteList, tag);
            setNoteList(updatedNoteList);
        }
    }

    function openModal() {
        setIsModalShowed(true);
    }

    function closeModal() {
        setIsModalShowed(false);
    }

    function onAddNoteClick() {
        openModal();
    }

    function onEditNoteClick(note: Note) {
        setEditingNote(note);
        openModal();
    }

    function onSubmitNote(note: Note) {
        closeModal();
        setEditingNote(undefined);

        const updatedNoteList = note.id === '' ? addNote(noteList, note) : updateNote(noteList, note);
        setNoteList(updatedNoteList);
    }

    function onImportNotes(importedNoteList: Note[]) {
        setNoteList(importedNoteList);
    }

    function onExportNotesClick() {
        exportNoteList(noteList);
    }

    function onExportNotesTemplateClick() {
        exportNoteList(NOTE_LIST_TEMPLATE);
    }

    function onTagClick(tag: Tag) {
        setFilterTag(tag);
    }

    const filteredNoteList = (filterTag === '')
        ? [...noteList]
        : noteList.filter((note: Note) => {
            const noteTagList = getNoteTagList(note);
            return noteTagList.find((tag) => tag === filterTag) !== undefined
        });

    return (
        <div className="app">
            <div className="wrapper">
                <Header
                    filterTag={filterTag}
                    setFilterTag={setFilterTag} />
                <NavTools
                    onAddNoteClick={onAddNoteClick}
                    onImportNotes={onImportNotes}
                    onExportNotesClick={onExportNotesClick}
                    onExportNotesTemplateClick={onExportNotesTemplateClick} />
                <TagListSection
                    tagList={tagList}
                    onRemoveTagClick={onRemoveTagClick}
                    onTagClick={onTagClick}
                />
                <Fragment>
                    {(filterTag !== '') && (
                        <p className="search-result">{`Result of search by tag: ${filterTag}`}</p>
                    )}
                </Fragment>
                <NoteList
                    noteList={filteredNoteList}
                    onEditNoteClick={onEditNoteClick}
                    onRemoveNoteClick={handleRemoveNoteClick}
                    onRemoveNoteTagClick={handleRemoveNoteTagClick}
                />
            </div>
            {isModalShowed &&
                <Modal onClose={closeModal}>
                    <NoteForm note={editingNote} onSubmit={onSubmitNote} />
                </Modal>
            }
        </div>
    );
}