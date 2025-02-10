import React from 'react'
import FileUpload from './components/FileUpload'
import './App.css'
 

const App = () => (
  <div className="container mt-4">
      <h4 className="display-4 text-center mb-4">
        <i className="fab fa-react"></i> React File Upload
      </h4>
      <FileUpload />
  </div>
)
      
export default App

/* FileUpload.jsx and Server.js - End-to-End Flow 

    1. User selects a file in the frontend (FileUpload.jsx).
    2. The file is sent to http://localhost:5000/uploads via POST request.
    3. The Express server (server.js):
        1. Receives the request.
        2. Moves the file to public/uploads/.
        3. Responds with the uploaded file details.
    4. The frontend updates the UI with the response.
    
*/