import { Button, TextField } from "@mui/material";
import useLanguageStore from "@/store/useLanguageStore";
import { useState } from "react";

export default function EmailForm() {
  const { language } = useLanguageStore();
  const isRTL = language === "ar";

  const [formData, setFormData] = useState({
    message: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add form submission logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto flex w-full max-w-2xl flex-col gap-4 ${isRTL ? "rtl" : "ltr"}`}
    >
      <TextField
        multiline
        rows={4}
        value={formData.message}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, message: e.target.value }))
        }
        className="w-full"
        placeholder={isRTL ? "رسالتك" : "Your message"}
        inputProps={{
          style: {
            textAlign: isRTL ? "right" : "left",
          },
        }}
        dir={isRTL ? "rtl" : "ltr"}
      />
      <div
        className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-center gap-3`}
      >
        <TextField
          type="email"
          required
          size="small"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="flex-1"
          placeholder={isRTL ? "البريد الإلكتروني" : "Email address"}
          inputProps={{
            style: {
              textAlign: isRTL ? "right" : "left",
            },
          }}
          dir={isRTL ? "rtl" : "ltr"}
        />
        <Button
          type="submit"
          variant="contained"
          className="h-10 min-w-[120px] !bg-primary-variant-2 text-white hover:!bg-primary-variant-2/90"
        >
          {isRTL ? "إرسال" : "SEND"}
        </Button>
      </div>
    </form>
  );
}
