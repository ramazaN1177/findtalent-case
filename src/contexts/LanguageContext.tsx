"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Locale = "tr" | "en";

const LOCALE_KEY = "finddeveloper-locale";

type LocaleMessages = Record<string, unknown>;

const getNested = (obj: Record<string, unknown>, path: string): unknown => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
};

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

let messagesCache: Record<Locale, LocaleMessages | null> = { tr: null, en: null };

async function loadMessages(locale: Locale): Promise<LocaleMessages> {
  if (messagesCache[locale]) return messagesCache[locale]!;
  const mod = await import(`@/locales/${locale}.json`);
  const data = mod.default as LocaleMessages;
  messagesCache[locale] = data;
  return data;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>("tr");
  const [messages, setMessages] = useState<LocaleMessages | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
      if (stored === "tr" || stored === "en") {
        setLocaleState(stored);
      }
    }
  }, []);

  useEffect(() => {
    loadMessages(locale).then(setMessages);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_KEY, locale);
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      if (!messages) return key;
      const value = getNested(messages as Record<string, unknown>, key);
      if (value == null) return key;
      if (typeof value === "string") return value;
      if (Array.isArray(value)) return value.join(", ");
      return String(value);
    },
    [messages]
  );

  const tArray = useCallback(
    (key: string): string[] => {
      if (!messages) return [];
      const value = getNested(messages as Record<string, unknown>, key);
      if (!Array.isArray(value)) return [];
      return value.filter((v): v is string => typeof v === "string");
    },
    [messages]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
