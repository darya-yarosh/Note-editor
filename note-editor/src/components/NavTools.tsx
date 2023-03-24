import { isValidImportNotes } from "../logic/Helper";
import Note from "../models/Note";
import "./NavTools.scss";

interface NavToolsProps {
    onAddNoteClick: () => void;
    onImportNotes: (noteList: Note[]) => void;
    onExportNotesClick: () => void;
    onExportNotesTemplateClick: () => void;
}

export default function NavTools({
    onAddNoteClick,
    onImportNotes,
    onExportNotesClick,
    onExportNotesTemplateClick,
}: NavToolsProps) {
    function onImportNotesClick(event: React.ChangeEvent<HTMLInputElement>) {
        const isFilesExist = event.target.files !== undefined && event.target.files !== null;
        if (!isFilesExist) {
            return;
        }

        const file = (event.target.files as unknown as File[])[0] as File;
        if (file === undefined) {
            return;
        }

        if (!file) {
            return;
        }

        if (file.type !== 'application/json') {
            window.alert("Incorrect type of the imported file. The imported file must be of the '.json' type.");
            return;
        }

        let reader = new FileReader();
        reader.readAsText(file);

        reader.onerror = function () {
            window.alert("Error loading notes. Please try another file.");
            return;
        };

        reader.onload = function () {
            const readerResult = reader.result as string;
            if (readerResult !== null) {
                const isValid = isValidImportNotes(readerResult);
                if (isValid) {
                    const parsedFileNotes: Note[] = JSON.parse(readerResult);
                   onImportNotes(parsedFileNotes);
                }
            }
        };
    }

    return <nav className="nav-tools">
        <ul>
            <li>
                <span onClick={onAddNoteClick}>
                    add note
                </span>
            </li>
            <li>
                <span>
                    <input
                        hidden
                        id="file-selector"
                        type="file"
                        accept=".json"
                        onChange={(event) => onImportNotesClick(event)}
                    />
                    <label htmlFor="file-selector">
                        Import Notes
                    </label>
                </span>
            </li>
            <li>
                <span onClick={onExportNotesClick}>
                    Export Notes
                </span>
            </li>
            <li>
                <span onClick={onExportNotesTemplateClick}>
                    Export Template
                </span>
            </li>
        </ul>
    </nav>
}