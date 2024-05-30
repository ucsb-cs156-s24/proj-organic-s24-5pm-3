import React from 'react'
import { useParams } from "react-router-dom";
import { useBackend } from 'main/utils/useBackend';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CoursesTable from 'main/components/Courses/CoursesTable';
import { useCurrentUser} from 'main/utils/currentUser';
import StudentsTable from 'main/components/Students/StudentsTable';

export default function CoursesSTShowPage() {

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

// New API call to fetch students
const { data: students} = useBackend(
  // Stryker disable next-line all : don't test internal caching of React Query
  [`/api/students?courseId=${id}`],
  // Stryker disable next-line all : GET is the default
  { method: "GET", url: "/api/students/all", params: { courseId:id }},
  // Stryker disable next-line all : GET is the default
  []
);

    return (
      <BasicLayout>
        <div className="pt-2">
          <h1>Course {id} Info</h1>
          <CoursesTable courses={[courses]} currentUser={currentUser} />
          <StudentsTable students={students} currentUser={currentUser} />

        </div>
      </BasicLayout>
    )
}
