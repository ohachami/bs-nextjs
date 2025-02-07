import { useState } from "react";
import type { ChangeEvent } from "react";
import { PencilIcon } from "lucide-react";

interface Props {
    comment: string;
    onEdit: () => void;
}

export const EditableInput = ({ comment, onEdit }: Props) => {
    const [content, setContent] = useState(comment);
    const [editMode, setEditMode] = useState(false);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
        setContent(e.target.value);

    return (
        <div>
            {editMode ? (
                <input value={content} onChange={handleOnChange} />
            ) : (
                <>
                    <span>{content}</span>
                    <PencilIcon onClick={() => setEditMode(true)}/>
                </>
            )}
        </div>
    )
}