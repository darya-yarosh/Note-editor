import Note, { EMPTY_NOTE } from "../models/Note";
import { Tag, TAG_SYMBOL } from "../models/Tag";

export function addNote(noteList: Note[], note: Note) {
    note.id = crypto.randomUUID();
    return [...noteList, note];
}

export function updateNote(noteList: Note[], updatedNote: Note) {
    return noteList.map(note => {
        if (note.id === updatedNote.id) {
            return updatedNote;
        }
        return note;
    });
}

export function getNoteTagList(note: Note) {
    const noteTitleTagList = note.title.split(' ').filter(isTag);
    const noteContentTagList = note.content.split(' ').filter(isTag);
    const noteTagList = [...noteTitleTagList, ...noteContentTagList];
    return noteTagList.filter((tag, index) => noteTagList.indexOf(tag) === index);
}

export function isTag(value: string): boolean {
    return value.startsWith('#') && value.length > 1;
}

export function getNotesTagList(noteList: Note[]) {
    let allTagList: Tag[] = [];

    noteList.forEach((note: Note) => {
        const noteTagList = getNoteTagList(note);
        allTagList = allTagList.concat(noteTagList);
    });

    return allTagList.filter((tag, index) => allTagList.indexOf(tag) === index);
}

export function removeTagFromNote(note: Note, tag: Tag) {
    const clonedNote = JSON.parse(JSON.stringify(note));
    const updatedTag = tag.replace(TAG_SYMBOL, '');

    clonedNote.title = clonedNote.title.replace(tag, updatedTag);
    clonedNote.content = clonedNote.content.replace(tag, updatedTag);

    return clonedNote;
}

export function removeTagFromNoteList(noteList: Note[], tag: Tag) {
    return noteList.map((note: Note) => removeTagFromNote(note, tag));
}

export function removeNote(noteList: Note[], removingNoteId: string) {
    return noteList.filter(note => note.id !== removingNoteId);
}

export function exportNoteList(noteList: Note[]) {
    const fileType = "application/json";

    const formattedTemplate = JSON.stringify(noteList, null, 2);

    const fileBlob = new Blob([formattedTemplate], { type: fileType })

    const saveTime = new Date();
    const YYYYMMDD = saveTime.getFullYear() + "-" + (saveTime.getMonth() + 1) + "-" + saveTime.getDate();
    const HHMMSS = saveTime.getHours() + "-" + saveTime.getMinutes() + "-" + saveTime.getSeconds();
    const fileName = "NoteList_" + YYYYMMDD + "_" + HHMMSS;
    const fileUrl = URL.createObjectURL(fileBlob);

    const aElement = document.createElement("a");
    aElement.href = fileUrl;
    aElement.download = fileName;
    aElement.hidden = true;
    aElement.click();
}

export function isValidImportNotes(loadedFileData: string) {
    const parsedData: Object[] = JSON.parse(loadedFileData);

    const isCorrectKeys = parsedData.every(object => {
        const isSameKeys = JSON.stringify(Object.keys(object)) === JSON.stringify(Object.keys(EMPTY_NOTE));
        return isSameKeys;
    })

    if (!isCorrectKeys) {
        window.alert("Incorrect keys in objects. Please fix them.");
        return false;
    }

    const importedNoteList: Note[] = parsedData as Note[];

    const isFilledData = importedNoteList.every(object => !(object.title === '' && object.content === ''))
    if (!isFilledData) {
        window.alert("Empty title or content in notes. Please fix them.");
        return false;
    }

    return true;
}