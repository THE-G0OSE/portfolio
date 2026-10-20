"use client";

import {
  IStackCategory,
  IStackItem,
  StackCategoryInput,
  stackCategoryApi,
  StackItemInput,
  stackItemApi,
} from "@/entities/portfolio";
import { IFieldConfig, ListEditor } from "@/shared/form";

interface IProps {
  categories: IStackCategory[];
  onChange: () => void;
}

const CATEGORY_FIELDS: IFieldConfig<StackCategoryInput>[] = [
  { key: "label", label: "Switch label" },
  { key: "title", label: "Title" },
  { key: "sfx", label: "Sound effect" },
  { key: "part", label: "Part (I, II…)" },
  { key: "color", label: "Color", type: "color" },
  { key: "order", label: "Order", type: "number", min: 0 },
];

const ITEM_FIELDS: IFieldConfig<StackItemInput>[] = [
  { key: "name", label: "Technology" },
  { key: "level", label: "Level 1–5", type: "number", min: 1, max: 5 },
  { key: "order", label: "Order", type: "number", min: 0 },
];

const toCategoryInput = ({ label, title, sfx, part, color, order }: IStackCategory): StackCategoryInput => ({
  label,
  title,
  sfx,
  part,
  color,
  order,
});

const toItemInput = ({ name, level, order, categoryId }: IStackItem): StackItemInput => ({
  name,
  level,
  order,
  categoryId,
});

export const StackEditor: React.FC<IProps> = ({ categories, onChange }) => {
  return (
    <ListEditor
      items={categories}
      fields={CATEGORY_FIELDS}
      toInput={toCategoryInput}
      emptyInput={{ label: "", title: "", sfx: "", part: "", color: "YELLOW", order: categories.length }}
      getTitle={({ title, label }) => title || label || "Category"}
      addLabel="CATEGORY"
      onCreate={stackCategoryApi.create}
      onUpdate={stackCategoryApi.update}
      onDelete={stackCategoryApi.remove}
      onChange={onChange}
      renderExtra={(category) => (
        <div className="flex flex-col gap-3 pl-4 border-ink border-l-5">
          <p className="font-bangers text-xl">TECHNOLOGIES</p>
          <ListEditor
            items={category.items}
            fields={ITEM_FIELDS}
            toInput={toItemInput}
            emptyInput={{ name: "", level: 3, order: category.items.length, categoryId: category.id }}
            getTitle={({ name }) => name || "Technology"}
            addLabel="TECHNOLOGY"
            onCreate={stackItemApi.create}
            onUpdate={stackItemApi.update}
            onDelete={stackItemApi.remove}
            onChange={onChange}
          />
        </div>
      )}
    />
  );
};
