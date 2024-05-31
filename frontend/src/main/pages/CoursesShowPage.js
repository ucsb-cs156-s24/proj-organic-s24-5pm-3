import React, {useState} from 'react'
import { useParams } from "react-router-dom";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CoursesTable from 'main/components/Courses/CoursesTable';
import { useCurrentUser} from 'main/utils/currentUser';
import { toast } from 'react-toastify';

import { useBackend } from 'main/utils/useBackend';
import axios from 'axios';


export default function CourseShowPage() {

  let { id } = useParams();
  const { data: currentUser } = useCurrentUser();
  
  const { data: courses, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/courses?id=${id}`],
      // Stryker disable next-line all : GET is the default
      { method: "GET", url: "/api/courses/get", params: { id }},
      // Stryker disable next-line all : GET is the default
      []
    );

    const [file, setFile] = useState()

    function handleChange(event) {
      setFile(event.target.files[0])
    }

    async function rosterFile(data) {
      try {
        const response = await axios({
          url: "/api/students/upload/egrades",
          method: "POST",
          data: data,
          params: { courseId: id },
        });
    
        toast.success("Roster uploaded successfully!");
        console.log(response.data);
      } catch (error) {
        toast.error("File Upload Error: Make sure you selected a .csv file.");
        console.error(error);
      }
    }

    async function handleUpload() {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        await rosterFile(formData);
      } else {
        toast.error("Error: No file selected.");
      }
    }


    return(
      <BasicLayout>
        <div className="pt-2">
          <h1>Course {id} Info</h1>
          <CoursesTable courses={[courses]} currentUser={currentUser} />

          <h2>Upload a course roster</h2>
          <input type="file" onChange={handleChange} aria-label="Upload File" data-testid="inputFile" />
          <button onClick={handleUpload} style={{backgroundColor: 'white', color: 'black'}} data-testid="uploadButton">Upload Roster</button>
        </div>
      </BasicLayout>
    )
}
