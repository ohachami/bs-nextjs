import FileUpload from '@/components/common/FileUpload';
import { useExerciseCreationStore } from '@/store/exercises/create';

function ObjectifsForm() {
  const { data, errors, updateData } = useExerciseCreationStore();

  /**
   * Trigger on user upload a file
   * @param file : uploaded file
   */
  function onFileUpload(file: File) {
    updateData({ ...data, file });
  }
  

  return (
    <div className="space-y-2">
      <FileUpload file={data.file} onFileUpload={onFileUpload} />
      {errors.file && <p className="text-xs text-red-500">{errors.file[0]}</p>}
    </div>
  );
}

export default ObjectifsForm;
