import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import SchoolForm from "main/components/School/SchoolForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function SchoolCreatePage({ storybook = false }) {
  const objectToAxiosParams = (school) => ({
    url: "/api/schools/post",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      abbrev: school.abbrev,
      name: school.name,
      termRegex: school.termRegex,
      termDescription: school.termDescription,
      termError: school.termError,
    },
  });

  const onSuccess = (school) => {
    toast(`New School Created - abbrev: ${school.abbrev} name: ${school.name}`);
  };

  const onError = (error) => {
    if (error.response) {
      console.error("Error data:", error.response.data);
      console.error("Error status:", error.response.status);
      console.error("Error headers:", error.response.headers);
      toast.error(`Error: ${error.response.data}`);
    } else if (error.request) {
      console.error("Error request:", error.request);
      toast.error("No response received from server.");
    } else {
      console.error("Error message:", error.message);
      toast.error(`Error: ${error.message}`);
    }
    console.error("Error config:", error.config);
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess, onError },
    ["/api/schools/all"]
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Submission error: ${error.message}`);
    }
  };

  if (isSuccess && !storybook) {
    return <Navigate to="/admin/schools" />;
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
