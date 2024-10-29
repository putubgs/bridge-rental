import { FileUploadOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";
import FileUpload from "../input/file-upload";

export default function IdForm() {
  return (
    <div className="space-y-5 bg-[#F9F9F9] p-5">
      <div>
        <h2 className="text-xl font-semibold">Main driver details</h2>
        <p className="text-neutral-400">
          Fill in the same name and surname that appears on your ID or Passport
        </p>
      </div>
      <form className="grid grid-cols-3 gap-2">
        <div className="w-full space-y-2">
          <TextField
            size="medium"
            placeholder="First name*"
            className="w-full bg-white"
          />
          <TextField
            size="medium"
            placeholder="Email address*"
            className="w-full bg-white"
          />
          <TextField
            size="medium"
            placeholder="Date of birth"
            className="w-full bg-white"
          />
        </div>
        <div className="w-full space-y-2">
          <TextField
            size="medium"
            placeholder="Last name*"
            className="w-full bg-white"
          />
          <TextField
            size="medium"
            placeholder="Confirm email address*"
            className="w-full bg-white"
          />
          <TextField
            size="medium"
            placeholder="Phone number*"
            className="w-full bg-white"
          />
        </div>
        <FileUpload onFileSelect={(base64) => {}} />
      </form>
    </div>
  );
}
