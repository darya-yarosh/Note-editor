export const EMPTY_NOTE: Note = {
    id: ``,
    title: ``,
    content: ``
}

export const NOTE_LIST_TEMPLATE: Note[] = [
    {
        id: crypto.randomUUID(),
        title: 'Task №1',
        content: `This is a content of #test "Task №1"`,
    },
    {
        id: crypto.randomUUID(),
        title: '',
        content: `This is #test task №2 #without_title`,
    },
    {
        id: crypto.randomUUID(),
        title: 'Title with #title_tag and without content',
        content: '',
    },
    {
        id: crypto.randomUUID(),
        title: 'Task №4 with #title_tag',
        content: `This is a content of #test "Task №4"`,
    },
]

export default interface Note {
    id: string;
    title: string,
    content: string
}