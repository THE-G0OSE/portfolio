"use client";

import { COMIC_COLORS, comicFillClass, ComicColor } from "@/shared/comic";
import { IFieldConfig } from "@/shared/form/types";
import { useId, useState } from "react";

interface IProps<TValues> {
  config: IFieldConfig<TValues>;
  value: unknown;
  onChange: (value: unknown) => void;
}

const INPUT_CLASS =
  "bg-white px-2.5 py-1.5 border-3 border-ink focus:outline-none focus:ring-3 focus:ring-comic-yellow w-full min-h-11 font-mono text-sm";

const parseTags = (text: string) =>
  text
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

export const Field = <TValues,>({ config, value, onChange }: IProps<TValues>) => {
  const { label, type = "text", options, min, max, step, placeholder, wide } = config;
  const id = useId();
  // number and tags keep raw text, so "-" or "a, " can be typed before value becomes valid
  const [text, setText] = useState(() =>
    Array.isArray(value) ? value.join(", ") : String(value ?? ""),
  );

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={id}
            value={String(value ?? "")}
            placeholder={placeholder}
            rows={3}
            onChange={(e) => onChange(e.target.value)}
            className={`${INPUT_CLASS} resize-y`}
          />
        );
      case "number":
        return (
          <input
            id={id}
            type="number"
            inputMode="decimal"
            value={text}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              setText(e.target.value);
              const number = Number(e.target.value);
              if (e.target.value !== "" && !Number.isNaN(number)) onChange(number);
            }}
            className={INPUT_CLASS}
          />
        );
      case "tags":
        return (
          <input
            id={id}
            value={text}
            placeholder={placeholder ?? "comma, separated, values"}
            onChange={(e) => {
              setText(e.target.value);
              onChange(parseTags(e.target.value));
            }}
            className={INPUT_CLASS}
          />
        );
      case "select":
        return (
          <select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={INPUT_CLASS}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "color":
        return (
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className={`size-11 shrink-0 border-3 border-ink ${comicFillClass[value as ComicColor] ?? ""}`} />
            <select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className={INPUT_CLASS}>
              {COMIC_COLORS.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return (
          <input
            id={id}
            value={String(value ?? "")}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={INPUT_CLASS}
          />
        );
    }
  };

  return (
    <div className={`flex flex-col gap-1 ${wide ? "col-span-full" : ""}`}>
      <label htmlFor={id} className="font-bold text-xs uppercase">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};
