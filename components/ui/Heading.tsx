"use client";

import { useRef } from "react";
import { useIgnite } from "@/components/motion/useIgnite";
import styles from "./Heading.module.css";

type Props = {
  /** Parte en tinta plena. */
  strong: React.ReactNode;
  /** Parte en gris. */
  muted?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "h1" | "h2" | "h3" | "body";
  tone?: "light" | "dark";
  /** Las palabras grises se encienden con el scroll. */
  ignite?: boolean;
  /** Parte gris en línea nueva. */
  breakMuted?: boolean;
  className?: string;
  id?: string;
};

/** Titular "mitad gris": primera parte en tinta, resto apagado. */
export default function Heading({
  strong,
  muted,
  as: Tag = "h2",
  size = "h2",
  tone = "light",
  ignite = false,
  breakMuted = false,
  className,
  id,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  useIgnite(ignite ? ref : { current: null });

  return (
    <Tag
      ref={ref}
      id={id}
      className={[styles.heading, styles[size], tone === "dark" ? styles.onDark : "", className].join(" ")}
    >
      <span className={styles.strong}>{strong}</span>
      {muted && (
        <>
          {breakMuted ? <br /> : " "}
          <span data-muted className={styles.muted}>
            {muted}
          </span>
        </>
      )}
    </Tag>
  );
}
