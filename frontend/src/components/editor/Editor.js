// // Importing helper modules
// import { useState } from "react";

// // Importing core components
// import QuillEditor from "react-quill";

// // Importing styles
// import styles from "./styles.module.css";
// import "react-quill/dist/quill.snow.css";

// const Editor = () => {
//   // Editor state
//   const [value, setValue] = useState("");

//   // Handler to handle button clicked
//   function handler() {
//     console.log(value);
//   }

//   return (
//     <div className={styles.wrapper}>
//       <label className={styles.label}>Editor Content</label>
//       <QuillEditor
//         className={styles.editor}
//         theme="snow"
//         value={value}
//         onChange={(value) => setValue(value)}
//       />
//       <button onClick={handler} className={styles.btn}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Editor;


// Importing helper modules
import { useCallback, useMemo, useRef, useState, useEffect } from "react";

// Importing core components
import QuillEditor from "react-quill";
import { saveAs } from 'file-saver';
import HtmlDocx from 'html-docx-js/dist/html-docx';

// Importing styles
import "react-quill/dist/quill.snow.css";
import styles from "./styles.module.css";
import Button from "../buttons/Button";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};


const Editor = ({documentContent}) => {
  // Editor state
  // const [value, setValue] = useState("");

  // Editor ref
  const quill = useRef();
  const [template, setTemplate] = useState('');
  const [fileType, setFileType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');

  useEffect(() => {
    if (documentContent) {
      // Parse JSON content
      const { records, sections } = JSON.parse(documentContent);

      // Generate template HTML
      let html = `<h1>${records[4][1]} - ${records[0][1]}</h1>`; // Document Type
      html += '<br/>';

      records[1][1] = formatDate(records[1][1]);

       // Set file type and document number for later use in saving the file
       setFileType(records[4][1]);
       setDocumentNumber(records[3][1]);

      // Add records to template
       html += '<ul>';
       records.forEach(([label, value]) => {
         html += `<li><strong>${label}:</strong> ${value}</li>`;
       });
       html += '</ul>';
      html += '<br/>';

      // Add break line before each section
      sections.forEach(({ title, content }) => {
        html += '<br/>'; // Add break line
        html += `<h2>${title}</h2>`;
        html += `<p>${content}</p>`;
      });

      // Set template
      setTemplate(html);
    }
  }, [documentContent]);


  // Handler to handle button clicked
  // function handler() {
  //   // console.log(value);
  //   console.log(documentContent);
  // }

  const handler = useCallback(() => {
    if (documentContent) {
      const docx = HtmlDocx.asBlob(template);
      const fileName = `${fileType}_${documentNumber}.docx`;
      saveAs(docx, fileName);
    }
  }, [documentContent, fileType, documentNumber]);

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4,5, 6, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <div className={styles.wrapper}>
      {/* <label className={styles.label}>Editor Content</label> */}
      <QuillEditor
        ref={(el) => (quill.current = el)}
        className={styles.editor}
        theme="snow"
        value={template}
        formats={formats}
        modules={modules}
        readOnly={false}
        // onChange={(value) => setValue(value)}
      />
      <Button onClick={handler} className={styles.btn}>
        Save
      </Button>
      <small className={styles.cancelbtn}>Cancel</small>
     
    </div>
  );
};

export default Editor;