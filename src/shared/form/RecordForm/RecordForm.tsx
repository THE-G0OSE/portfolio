"use client";

import { ComicButton } from "@/shared/comic";
import { Field } from "@/shared/form/Field/Field";
import { IFieldConfig } from "@/shared/form/types";
import { useState } from "react";

interface IProps<TValues> {
  title: string;
  initialValues: TValues;
  fields: IFieldConfig<TValues>[];
  onSubmit: (values: TValues) => Promise<unknown>;
  onDelete?: () => Promise<unknown>;
  onCancel?: () => void;
  submitLabel?: string;
  // e.g. nested list editor under the form
  children?: React.ReactNode;
}

type Status = { type: "idle" | "saving" | "saved" } | { type: "error"; message: string };

const getMessage = (error: unknown) => (error instanceof Error ? error.message : "Something went wrong");

export const RecordForm = <TValues extends object>({
  title,
  initialValues,
  fields,
  onSubmit,
  onDelete,
  onCancel,
  submitLabel = "SAVE",
  children,
}: IProps<TValues>) => {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const setField = (key: keyof TValues, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus({ type: "idle" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "saving" });
    try {
      await onSubmit(values);
      setStatus({ type: "saved" });
    } catch (error) {
      setStatus({ type: "error", message: getMessage(error) });
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !window.confirm(`Delete "${title}"?`)) return;
    setStatus({ type: "saving" });
    try {
      await onDelete();
    } catch (error) {
      setStatus({ type: "error", message: getMessage(error) });
    }
  };

  return (
    <div className="flex flex-col gap-3 bg-white shadow-[5px_5px_0_var(--color-ink)] p-4 border-4 border-ink">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <p className="font-bangers text-2xl leading-none">{title}</p>
        <div className="gap-3 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
          {fields.map((config) => (
            <Field
              key={config.key}
              config={config}
              value={values[config.key]}
              onChange={(value) => setField(config.key, value)}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ComicButton type="submit" disabled={status.type === "saving"}>
            {submitLabel}
          </ComicButton>
          {onDelete && (
            <ComicButton variant="red" onClick={handleDelete} disabled={status.type === "saving"}>
              DELETE
            </ComicButton>
          )}
          {onCancel && (
            <ComicButton variant="white" onClick={onCancel}>
              CANCEL
            </ComicButton>
          )}
          <p role="status" className="font-bold text-sm">
            {status.type === "saving" && "Saving…"}
            {status.type === "saved" && "Saved ✓"}
            {status.type === "error" && <span className="text-comic-red">{status.message}</span>}
          </p>
        </div>
      </form>
      {children}
    </div>
  );
};
