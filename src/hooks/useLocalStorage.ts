"use client";

import { useState, useCallback } from "react";
import { readJson, writeJson } from "@/lib/storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() =>
    readJson<T>(key, initialValue)
  );

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = typeof value === "function"
          ? (value as (prev: T) => T)(prev)
          : value;
        writeJson(key, next);
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue] as const;
}
