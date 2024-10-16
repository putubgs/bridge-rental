import { Button, TextField } from "@mui/material";

export default function EmailForm() {
  return (
    <form className="space-y-2">
      <TextField
        multiline
        rows={4}
        className="w-full"
        placeholder="Your message"
      />
      <div className="flex justify-between gap-2">
        <TextField size="small" className="grow" placeholder="Email address" />
        <Button
          variant="contained"
          className="rounded !bg-primary-variant-2 px-7 text-xs text-white"
        >
          SEND
        </Button>
      </div>
    </form>
  );
}
