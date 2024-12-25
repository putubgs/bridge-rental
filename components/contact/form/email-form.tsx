import { Button, TextField } from "@mui/material";

export default function EmailForm() {
  return (
    <form className="space-y-3 sm:space-y-2">
      <TextField
        multiline
        rows={4}
        className="w-full"
        placeholder="Your message"
        inputProps={{
          sx: {
            "& .MuiInputBase-input": {
              fontSize: {
                xs: "0.875rem",
                sm: "1rem",
              },
            },
          },
        }}
      />
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-2">
        <TextField
          size="small"
          className="grow"
          placeholder="Email address"
          inputProps={{
            sx: {
              "& .MuiInputBase-input": {
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                },
              },
            },
          }}
        />
        <Button
          variant="contained"
          className="h-12 w-full rounded !bg-primary-variant-2 px-7 text-xs text-white sm:h-auto sm:w-auto"
        >
          SEND
        </Button>
      </div>
    </form>
  );
}
