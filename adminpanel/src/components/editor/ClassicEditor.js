// src/components/MyClassicEditor.js
import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styles from './classiceditor.module.scss';

// Custom Base64 upload adapter
function MyBase64UploadAdapter(loader) {
  this.loader = loader;
}
MyBase64UploadAdapter.prototype.upload = function() {
  return this.loader.file.then(file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ default: reader.result });
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  }));
};

function MyClassicEditor({ value, onChange, name = "content_description", placeholder = "Enter content here..." }) {
  const [editorContent, setEditorContent] = useState(value || '');

  useEffect(() => {
    if (editorContent !== value) setEditorContent(value || '');
  }, [value, editorContent]);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
    if (onChange) onChange({ target: { name, value: data } });
  };

  return (
    <div className={styles.classicEditorContainer}>
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        config={{
          placeholder: placeholder,
          toolbar: {
            items: [
              'heading', '|',
              'bold', 'italic', 'underline', 'strikethrough', '|',
              'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
              'insertTable', 'mediaEmbed', 'imageUpload', '|',
              'undo', 'redo', 'codeBlock'
            ]
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              '|',
              'imageStyle:alignLeft',
              'imageStyle:full',
              'imageStyle:alignRight'
            ],
            styles: ['full', 'alignLeft', 'alignRight']
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          }
        }}
        onReady={editor => {
          editor.plugins.get('FileRepository').createUploadAdapter = loader => {
            return new MyBase64UploadAdapter(loader);
          };
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
}

export default MyClassicEditor;
