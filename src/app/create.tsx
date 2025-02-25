"use client";

import { z } from "zod";
import InputDialog from "~/components/dialogs/input-dialog";
import { type ControllerRenderProps, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormControl, FormItem } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import createSecret from "~/server/actions/secrets";
import { toast } from "sonner";
import { getBaseUrl } from "~/lib/utils";
import copy from "copy-to-clipboard";
import { useAtom } from "jotai/index";
import { inputModalState } from "~/lib/store";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
  secret: z.string(),
  expiry: z.string(),
});

type CallbackData = z.infer<typeof formSchema>;

function CreateModal() {
  const form = useForm<CallbackData>({
    resolver: zodResolver(formSchema),
  });

  const inputFields = [
    {
      name: "secret",
      getField: (fieldItem: ControllerRenderProps<any, string>) => (
        <FormItem>
          <FormControl>
            <Textarea
              placeholder="your super duper private secret"
              {...fieldItem}
            />
          </FormControl>
        </FormItem>
      ),
    },
    {
      name: "expiry",
      getField: (fieldItem: ControllerRenderProps<any, string>) => (
        <FormItem className="mt-4">
          <FormControl>
            <select {...fieldItem} className="rounded border bg-muted/50 p-2">
              <option value="">Select expiry</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
              <option value="1800">30 minutes</option>
              <option value="3600">1 hour</option>
            </select>
          </FormControl>
        </FormItem>
      ),
    },
  ];

  return (
    <div>
      <section className="relative">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <InputDialog<CallbackData>
            id="create-secret"
            title="Create your secret"
            form={form}
            fields={inputFields}
            callback={async (data) => {
              await createSecret(data.secret, parseInt(data.expiry))
                .then(async (id) => {
                  copy(`${getBaseUrl()}/${id}`);
                  toast("Copied link to clipboard");
                })
                .catch((e: Error) => {
                  toast.error(e.message);
                });
            }}
          />
        </div>
      </section>
    </div>
  );
}

export function CreateButton() {
  const [, setInputModal] = useAtom(inputModalState);

  return (
    <>
      <CreateModal />
      <Button className="w-full" onClick={() => setInputModal("create-secret")}>
        create
      </Button>
    </>
  );
}
