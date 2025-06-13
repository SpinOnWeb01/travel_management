// src/components/MyClassicEditor.js
import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './MyClassicEditor.css'; // We'll create this CSS file next

/**
 * A reusable React component that wraps CKEditor 5 (Classic Build).
 *
 * @param {object} props - The component props.
 * @param {string} props.value - The current HTML content of the editor.
 * @param {function} props.onChange - Callback fired when the editor content changes.
 * It receives an object like { target: { name, value } }.
 * @param {string} [props.name="content_description"] - The 'name' attribute to pass
 * back in the onChange event's target.
 * @param {string} [props.placeholder="Enter content here..."] - Placeholder text for the editor.
 */
function MyClassicEditor({ value, onChange, name = "content_description", placeholder = "Enter content here..." }) {
    // Internal state to manage CKEditor's content, synchronized with the 'value' prop
    const [editorContent, setEditorContent] = useState(value || '');

    // Effect to update the internal state when the external 'value' prop changes.
    // This is crucial for pre-filling the editor or handling external state updates.
    useEffect(() => {
        if (editorContent !== value) { // Prevent unnecessary re-renders if content is identical
            setEditorContent(value || '');
        }
    }, [value, editorContent]); // Add editorContent to dependency array to avoid stale closure

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setEditorContent(data); // Update internal state
        // Call the parent's onChange function, mimicking a standard HTML input event
        if (onChange) {
            onChange({
                target: {
                    name: name, // Use the 'name' prop for consistency with form inputs
                    value: data
                }
            });
        }
    };

    return (
        <div className="classic-editor-container">
            <CKEditor
                editor={ClassicEditor}
                data={editorContent} // CKEditor uses its 'data' prop for content
                config={{
                    placeholder: placeholder, // Pass placeholder to CKEditor config
                    toolbar: {
                        items: [ // Customize toolbar items if needed
                            'heading', '|',
                            'bold', 'italic', 'underline', 'strikethrough', '|',
                            'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                            'insertTable', 'mediaEmbed', 'imageUpload', '|',
                            'undo', 'redo', 'codeBlock'
                        ]
                    },
                    image: {
                        toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                        styles: [ 'full', 'alignLeft', 'alignRight' ]
                    },
                    table: {
                        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
                    },
                    // Ensure you have an image upload adapter if you want to use imageUpload
                    // See CKEditor documentation for server-side image upload setup.
                    // For a simple demo, you might just want to remove 'imageUpload' from toolbar
                    // or use a plugin for base64 images.
                }}
                onReady={editor => {
                    // You can store the "editor" instance if you need to access its API later
                    console.log('CKEditor 5 is ready to use!', editor);
                }}
                onChange={handleEditorChange}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
}

export default MyClassicEditor;