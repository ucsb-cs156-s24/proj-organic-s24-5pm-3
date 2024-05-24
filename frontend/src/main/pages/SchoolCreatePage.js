import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import SchoolForm from "main/components/School/SchoolForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useCurrentUser } from "main/utils/currentUser";

export default function SchoolCreatePage({ storybook = false }) {
  const { data: currentUser } = useCurrentUser();
  const objectToAxiosParams = (school) => ({
    url: "/api/schools/post",
    method: "POST",
    params: {
      abrev: school.abrev,
      name: school.name,
      termRegex: school.termRegex,
      termDescription: school.termDescription,
      termError: school.termError,
    },
  });

  const onSuccess = (school) => {
    toast(`New School Created - abrev: ${school.abrev} name: ${school.name}`);
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/schools/all"]
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    //if (isSuccess && !storybook) {
    return <Navigate to="/schools" />;
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New School</h1>

        <SchoolForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  );
}
