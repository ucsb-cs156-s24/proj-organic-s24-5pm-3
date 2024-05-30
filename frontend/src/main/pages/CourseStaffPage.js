import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from 'react-router-dom'
import { useBackend } from "main/utils/useBackend";
import StaffTable from "main/components/Staff/StaffTable";


export default function CoursesStaffPage() {
  let { id } = useParams();

  const { data: staff, _error, _status } =
      useBackend(
          [`/api/courses/getStaff?courseId=${id}`],
          {
              method: "GET",
              url: `/api/courses/getStaff`,
              params: {
                  courseId: id
              }
          }
      );

      return (
        <BasicLayout>
          <div className="pt-2">
            <h1>Staff for Course</h1>
            {
              <StaffTable staff={staff}/>
            }
          </div>
        </BasicLayout>
      )
}