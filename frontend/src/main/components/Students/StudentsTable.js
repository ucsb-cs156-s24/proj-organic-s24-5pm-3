import React from "react";
 import OurTable, { ButtonColumn } from "main/components/OurTable"
//  import { useBackendMutation } from "main/utils/useBackend";
//  import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/components/Utils/SchoolUtils"
//  import { useNavigate } from "react-router-dom";
 //import { hasRole } from "main/utils/currentUser";

 export default function  StudentsTable({ students }) {
     const columns = [
         {
             Header: 'id',
             accessor: 'id',
         },
         {
             Header: 'courseId',
             accessor: 'courseId',
         },
         {
            Header: 'studentId',
            accessor: 'studentId',
        },
        {
            Header: 'fName',
            accessor: 'fName',
        },
        {
            Header: 'lName',
            accessor: 'lName',
        },
        {
            Header: 'email',
            accessor: 'email',
        },
        {
            Header: 'githubId',
            accessor: 'githubId',
        },

  
     ];

     return (
        <>
            <div>Total Students: {students.length}</div>
          <OurTable data={students} columns={columns} testid={"StudentsTable"} />
        </>
      );
    };