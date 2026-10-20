"use client";

import { ComicButton } from "@/shared/comic";
import { RecordForm } from "@/shared/form/RecordForm/RecordForm";
import { IFieldConfig } from "@/shared/form/types";
import { useState } from "react";

interface IProps<TItem extends { id: number }, TInput extends object> {
  items: TItem[];
  fields: IFieldConfig<TInput>[];
  toInput: (item: TItem) => TInput;
  emptyInput: TInput;
  getTitle: (input: TInput) => string;
  addLabel: string;
  onCreate: (input: TInput) => Promise<unknown>;
  onUpdate: (id: number, input: TInput) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
  // called after every successful change, to reload the data
  onChange: () => void;
  renderExtra?: (item: TItem) => React.ReactNode;
}

// list of records, each one with its own form, plus a form for a new record
export const ListEditor = <TItem extends { id: number }, TInput extends object>({
  items,
  fields,
  toInput,
  emptyInput,
  getTitle,
  addLabel,
  onCreate,
  onUpdate,
  onDelete,
  onChange,
  renderExtra,
}: IProps<TItem, TInput>) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => {
        const input = toInput(item);

        return (
          <RecordForm
            key={item.id}
            title={getTitle(input)}
            initialValues={input}
            fields={fields}
            onSubmit={async (values) => {
              await onUpdate(item.id, values);
              onChange();
            }}
            onDelete={async () => {
              await onDelete(item.id);
              onChange();
            }}
          >
            {renderExtra?.(item)}
          </RecordForm>
        );
      })}
      {isAdding ? (
        <RecordForm
          title={`NEW: ${addLabel}`}
          initialValues={emptyInput}
          fields={fields}
          submitLabel="CREATE"
          onCancel={() => setIsAdding(false)}
          onSubmit={async (values) => {
            await onCreate(values);
            setIsAdding(false);
            onChange();
          }}
        />
      ) : (
        <ComicButton variant="ink" onClick={() => setIsAdding(true)} className="self-start">
          + {addLabel}
        </ComicButton>
      )}
    </div>
  );
};
