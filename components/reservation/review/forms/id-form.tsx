import { Stack, TextField, Typography } from "@mui/material";
import FileUpload from "../input/file-upload";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function IdForm({ formik }: { formik: any }) {
  const displayMainIdDocError =
    formik.errors["dateOfBirth"] || formik.errors["phoneNumber"];

  return (
    <div className="space-y-5 bg-[#F9F9F9] p-5">
      <div>
        <h2 className="text-xl font-semibold">Main driver details</h2>
        <p className="text-neutral-400">
          Fill in the same name and surname that appears on your ID or Passport
        </p>
      </div>
      <form className="grid grid-cols-3 gap-2">
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <Stack spacing={1}>
            <TextField
              size="medium"
              placeholder="First name*"
              className="w-full bg-white"
              required
              value={formik.values["firstName"] ?? ""}
              onChange={(event) =>
                formik.setFieldValue("firstName", event.target.value)
              }
              error={Boolean(formik.errors["firstName"])}
            />
            {formik.errors["firstName"] && (
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors["firstName"]}
              </Typography>
            )}
          </Stack>
          <Stack spacing={1}>
            <TextField
              size="medium"
              placeholder="Last name*"
              className="w-full bg-white"
              required
              value={formik.values["lastName"] ?? ""}
              onChange={(event) =>
                formik.setFieldValue("lastName", event.target.value)
              }
              error={Boolean(formik.errors["lastName"])}
            />
            {formik.errors["lastName"] && (
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors["lastName"]}
              </Typography>
            )}
          </Stack>
          <Stack spacing={1}>
            <TextField
              size="medium"
              placeholder="Email address*"
              className="w-full bg-white"
              required
              value={formik.values["email"] ?? ""}
              onChange={(event) =>
                formik.setFieldValue("email", event.target.value)
              }
              error={Boolean(formik.errors["email"])}
            />
            {formik.errors["email"] && (
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors["email"]}
              </Typography>
            )}
          </Stack>
          <Stack spacing={1}>
            <TextField
              size="medium"
              placeholder="Confirm email address*"
              className="w-full bg-white"
              required
              value={formik.values["confirmEmail"] ?? ""}
              onChange={(event) =>
                formik.setFieldValue("confirmEmail", event.target.value)
              }
              error={Boolean(formik.errors["confirmEmail"])}
            />
            {formik.errors["confirmEmail"] && (
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors["confirmEmail"]}
              </Typography>
            )}
          </Stack>
          <Stack spacing={1}>
            <DatePicker
              format="MMM DD, YYYY"
              maxDate={dayjs.tz()}
              value={formik.values["dateOfBirth"] || null}
              onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
              slotProps={{
                textField: {
                  placeholder: "Date of birth*",
                  InputProps: {
                    readOnly: true,
                    sx: {
                      backgroundColor: "white",
                    },
                  },
                  error: Boolean(formik.errors["dateOfBirth"]),
                },
              }}
            />
            {formik.errors.dateOfBirth && (
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors.dateOfBirth}
              </Typography>
            )}
          </Stack>

          <Stack spacing={1}>
            <TextField
              size="medium"
              placeholder="Phone number*"
              className="w-full bg-white"
              required
              value={formik.values["phoneNumber"] ?? ""}
              onChange={(event) =>
                formik.setFieldValue("phoneNumber", event.target.value)
              }
              error={Boolean(formik.errors["phoneNumber"])}
            />
            {formik.errors["phoneNumber"] && (
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors["phoneNumber"]}
              </Typography>
            )}
          </Stack>
        </div>

        <Stack spacing={1}>
          <FileUpload
            onFileSelect={(base64) =>
              formik.setFieldValue("idDocument", base64)
            }
            isFieldError={Boolean(formik.errors["idDocument"])}
          />
          {displayMainIdDocError && formik.errors["idDocument"] && (
            <div className="">
              <Typography className="text-red-700" fontSize={"12px"}>
                {formik.errors["idDocument"]}
              </Typography>
            </div>
          )}
        </Stack>
        {!displayMainIdDocError && formik.errors["idDocument"] && (
          <div className="col-start-3">
            <Typography className="text-red-700" fontSize={"12px"}>
              {formik.errors["idDocument"]}
            </Typography>
          </div>
        )}
      </form>
    </div>
  );
}
