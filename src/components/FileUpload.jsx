import React, { Fragment, useState } from 'react'

const FileUpload = () => {
  // Set File State
  const [file, setFile] = useState('');
  // Set Filename State
  const [filename, setFilename] = useState('Choose File');

  // Handle Input Change Event
  const onChange = e => {
    setFile(e.target.files[0]); // Get file object
    setFilename(e.target.files[0].name); // Get file name
  }


  return (
    <Fragment>
        <form>
            <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile" 
                onChange={onChange}/>
                <label htmlFor="customFile" className="custom-file-label">
                    {filename}
                </label>
            </div>
            <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
        </form>
    </Fragment>
  )
}

export default FileUpload