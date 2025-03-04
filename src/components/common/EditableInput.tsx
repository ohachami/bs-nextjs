import {FC, useEffect, useRef, useState} from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { PencilLine } from "lucide-react";

interface Props {
    comment: string;
    onEdit: (comment: string) => void;
}

export const EditableInput: FC<Props> = ({ comment, onEdit }) => {
    const [content, setContent] = useState(comment);
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setContent(e.target.value);

    const handleKeydownEvent = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onEdit(content);
            setEditMode(false);
        }
    }

    const handleCancelEdit = () => {
        setEditMode(false);
        setContent(comment);
    }

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    return (
        <div>
            {editMode ? (
                <input ref={inputRef} className="px-2 w-full" value={content} onChange={handleOnChange} onKeyDown={handleKeydownEvent} onBlur={handleCancelEdit}/>
            ) : (
                <div className="flex gap-3 items-center">
                    <span>{content}</span>
                    <PencilLine onClick={() => {
                        setEditMode(true);
                    }}/>
                </div>
            )}
        </div>
    )
}