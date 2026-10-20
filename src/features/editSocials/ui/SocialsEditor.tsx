"use client";

import { ISocial, SocialInput, socialApi } from "@/entities/portfolio";
import { IFieldConfig, ListEditor } from "@/shared/form";

interface IProps {
  socials: ISocial[];
  onChange: () => void;
}

const FIELDS: IFieldConfig<SocialInput>[] = [
  { key: "name", label: "Name", placeholder: "GITHUB" },
  { key: "handle", label: "Handle", placeholder: "@goose" },
  { key: "href", label: "Link", placeholder: "https://…" },
  { key: "count", label: "Count", placeholder: "1.2K" },
  { key: "unit", label: "Unit", placeholder: "followers" },
  { key: "color", label: "Sticker color", type: "color" },
  { key: "tilt", label: "Tilt (−10…10°)", type: "number", min: -10, max: 10, step: 0.5 },
  { key: "order", label: "Order", type: "number", min: 0 },
];

const toInput = ({ name, handle, count, unit, href, color, tilt, order }: ISocial): SocialInput => ({
  name,
  handle,
  count,
  unit,
  href,
  color,
  tilt,
  order,
});

export const SocialsEditor: React.FC<IProps> = ({ socials, onChange }) => {
  return (
    <ListEditor
      items={socials}
      fields={FIELDS}
      toInput={toInput}
      emptyInput={{
        name: "",
        handle: "",
        count: "",
        unit: "",
        href: "",
        color: "WHITE",
        tilt: 0,
        order: socials.length,
      }}
      getTitle={({ name }) => name || "Social"}
      addLabel="SOCIAL"
      onCreate={socialApi.create}
      onUpdate={socialApi.update}
      onDelete={socialApi.remove}
      onChange={onChange}
    />
  );
};
