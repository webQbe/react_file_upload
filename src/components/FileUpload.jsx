import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';

const FileUpload = () => {
  /* State Management */
  // Store selected file object
  const [file, setFile] = useState(''); 
  // Store name of the selected file
  const [filename, setFilename] = useState('Choose File'); 
  // Store uploaded file details after successful upload
  const [uploadedFile, setUploadedFile] = useState({}); 
  // Store file upload status message
  const [message, setMessage] = useState(''); 
  // Store upload percentage
  const [uploadPercentage, setUploadPercentage] = useState(0);

  // Update file and filename states when a file is selected
  const onChange = e => {
    setFile(e.target.files[0]); // Get file object
    setFilename(e.target.files[0].name); // Get file name
  }

  // Handle "Upload" button click event
  const onSubmit = async e => {
    // Prevent default form submission
    e.preventDefault();
    // Create FormData object to hold file
    const formData = new FormData();
    formData.append('file', file);

    try {
        // Send a POST request using Axios
        const res = await axios.post('http://localhost:5000/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {

                setUploadPercentage(
                  // Calculate Percentage
                  parseInt(
                    Math.round((progressEvent.loaded * 100) / progressEvent.total)
                  )
                );

                // Clear Percentage in 10 secs
                setTimeout(() => setUploadPercentage(0), 10000); 
            }

          });

        // Console log response data
        console.log("Server Response:", res.data);

        // Pull  fileName & filePath from response
        const { fileName, filePath } = res.data;

        // If filePath unvailable
        if (!filePath) {
          console.error("Error: filePath is undefined");
        }

        // Update uploadedFile state with response data
        setUploadedFile({ fileName, filePath });

        // Update message state
        setMessage('File Uploaded!');

    } catch(err) {
         /* Log errors in case of failure */
         console.error("Upload Error:", err);
         if(err.response && err.response.status === 500) {
            // Update message state (try deleting uploads/ folder)
            setMessage('There was a problem with the server!');
         } else if (err.response) {
          setMessage(err.response.data.msg);
         } else {
          setMessage("Unknown error occurred");
         }
    }
  };

  /* Rendering 
      Display a file input field and an upload button.
      Use Bootstrap classes for styling.
  */
  return (
    <Fragment>
        { // Show upload status message
          message ? // If message state not blank
            <Message msg={message} /> // Pass message state to Message.jsx
            : null
        } 
        <form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile" 
                onChange={onChange}/>
                <label htmlFor="customFile" className="custom-file-label">
                    {filename}
                </label>
            </div>
            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>

        { uploadedFile ? 
            // Show file name and image when file is uploaded
            <div className="row mt-5">
              <div className="col-md-6 m-auto">
                <h3 className="text-center">{ uploadedFile.fileName }</h3>
                <img style={{ width: '100%' }} src={`http://localhost:5000${uploadedFile.filePath}`} alt="" />
              </div>
            </div> :
                null // Return null if file is not uploaded
        }
    </Fragment>
  )
}

export default FileUpload