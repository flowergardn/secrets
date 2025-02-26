"use client";

import { useAtom } from "jotai";
import { type ReactNode, useEffect, useState } from "react";
import { inputModalState } from "~/lib/store";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { Form, FormField } from "~/components/ui/form";
import { LoaderCircle } from "lucide-react";
import Turnstile, { useTurnstile } from "react-turnstile";
import { env } from "~/env";

export default function InputDialog<T>({
  form,
  fields,
  title,
  message,
  id,
  callback,
  onClose,
  formCSS = "",
  footer,
  requireCaptcha = false,
}: {
  form: UseFormReturn<any, any, undefined>;
  fields: {
    name: string;
    getField: (field: ControllerRenderProps<any, string>) => JSX.Element;
  }[];
  title: ReactNode;
  message?: ReactNode;
  id: string;
  callback: (data: T, turnstileToken?: string | null) => Promise<void> | void;
  onClose?: () => void;
  formCSS?: string;
  footer?: ReactNode;
  requireCaptcha?: boolean;
}) {
  const [openModal, setModal] = useAtom(inputModalState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstile = useTurnstile();

  useEffect(() => {
    if (openModal === id) return;
    form.reset();
    form.clearErrors();
    setTurnstileToken(null);
  }, [openModal, id, form]);

  const handleSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      await callback(data, turnstileToken);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setModal(null);
    onClose?.();
  };

  return (
    <AlertDialog open={openModal === id}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message ?? ""}</AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <section className={formCSS}>
                {fields.map(({ name, getField }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => getField(field)}
                  />
                ))}
              </section>
              {footer}
              {requireCaptcha && (
                <Turnstile sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onVerify={setTurnstileToken} />
              )}
              <div className="float-right space-x-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Close
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting || (requireCaptcha && !turnstileToken)}
                >
                  {isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogHeader>
        <AlertDialogFooter />
      </AlertDialogContent>
    </AlertDialog>
  );
}
