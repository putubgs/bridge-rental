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
        <h2 className="text-[16px] text-base font-semibold md:text-xl">
          Main driver details
        </h2>
        <p className="text-[12px] text-neutral-400 sm:text-base md:text-[14px]">
          Fill in the same name and surname that appears on your ID or Passport
        </p>
      </div>
      <form className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <div className="col-span-1 grid grid-cols-1 gap-2 sm:grid-cols-2 md:col-span-2">
          <Stack spacing={1}>
            <TextField
              size="medium"
              placeholder="First name*"
              className="w-full bg-white"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "12px", md: "16px" },
                },
              }}
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "12px", md: "16px" },
                },
              }}
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "12px", md: "16px" },
                },
              }}
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "12px", md: "16px" },
                },
              }}
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
                      "& .MuiInputBase-input": {
                        fontSize: { xs: "12px", md: "16px" },
                      },
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
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: { xs: "12px", md: "16px" },
                },
              }}
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

        <Stack spacing={1} className="mt-4 h-[200px] md:mt-0 md:h-auto">
          <FileUpload
            onFileSelect={(base64) =>
              formik.setFieldValue("idDocument", base64)
            }
            isFieldError={Boolean(formik.errors["idDocument"])}
          />
          {displayMainIdDocError && formik.errors["idDocument"] && (
            <div>
              <Typography
                className="text-red-700"
                sx={{
                  fontSize: { xs: "12px", md: "16px" },
                }}
              >
                {formik.errors["idDocument"]}
              </Typography>
            </div>
          )}
        </Stack>
        {!displayMainIdDocError && formik.errors["idDocument"] && (
          <div className="col-span-1 md:col-start-3">
            <Typography className="text-red-700" fontSize={"12px"}>
              {formik.errors["idDocument"]}
            </Typography>
          </div>
        )}
      </form>
    </div>
  );
}
