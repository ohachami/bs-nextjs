import {EditableInput} from "@/components/common/EditableInput";
import {FC} from "react";
import {usePatchComment,} from "@/services/dataVersions.service";

interface Props {
    id: string;
    comment: string;
}

export const EditableInputWrapper: FC<Props> = ({ id, comment }) => {
    const patchComment = usePatchComment();

    const handleOnEdit = (content: string) =>
        patchComment.mutate({ id, comment: content });

    return <EditableInput onEdit={handleOnEdit} comment={comment}/>
}