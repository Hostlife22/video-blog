import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';

interface ITinyEditorProps {
  handler: React.Dispatch<React.SetStateAction<string>>;
}

function TinyEditor({ handler }: ITinyEditorProps) {
  const editorRef = useRef<null | TinyMCEEditor>(null);

  const getDescriptionValue = () => {
    if (editorRef.current) {
      handler(editorRef.current.getContent());
    }
  };

  return (
    <Editor
      onChange={getDescriptionValue}
      onInit={(evt, editor: TinyMCEEditor) => {
        editorRef.current = editor;
      }}
      apiKey={import.meta.env.VITE_APP_TINYMCE_EDITOR_API}
      init={{
        height: 500,
        width: '100%',
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        content_css: 'dark',
        skin: 'oxide-dark',
      }}
    />
  );
}

export default TinyEditor;
