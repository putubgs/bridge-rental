import { Button, TextField } from "@mui/material";
import useLanguageStore from "@/store/useLanguageStore";

export default function EmailForm() {
  const { language } = useLanguageStore();
  const isRTL = language === "ar";

  return (
    <form className={`space-y-3 sm:space-y-2 ${isRTL ? "rtl" : "ltr"}`}>
      <TextField
        multiline
        rows={4}
        className="w-full"
        placeholder={isRTL ? "رسالتك" : "Your message"}
        inputProps={{
          style: {
            textAlign: isRTL ? "right" : "left",
          },
        }}
        dir={isRTL ? "rtl" : "ltr"}
      />
      <div className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} justify-between gap-3 sm:gap-2`}>
        <TextField
          size="small"
          className="grow"
          placeholder={isRTL ? "البريد الإلكتروني" : "Email address"}
          inputProps={{
            style: {
              textAlign: isRTL ? "right" : "left",
            },
          }}
          dir={isRTL ? "rtl" : "ltr"}
        />
        <Button
          variant="contained"
          className="h-12 w-full rounded !bg-primary-variant-2 px-7 text-xs text-white sm:h-auto sm:w-auto"
        >
          {isRTL ? "إرسال" : "SEND"}
        </Button>
      </div>
    </form>
  );
}
