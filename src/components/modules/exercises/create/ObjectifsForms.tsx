import FileUpload from '@/components/common/FileUpload';

function ObjectifsForm() {
  /**
   * Trigger on user upload a file
   * @param file : uploaded file
   */
  function onFileUpload(file: File) {
    console.log('File received : ', file);
  }

  return <FileUpload onFileUpload={onFileUpload} />;
}

export default ObjectifsForm;