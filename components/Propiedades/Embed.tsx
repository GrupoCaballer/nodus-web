"use client";

import { useState } from "react";
import styles from "./Embed.module.css";

type Props = { kind: "youtube" | "matterport"; id: string; title: string };

/** Contenido externo (YouTube, Matterport) que solo se carga cuando el usuario lo pide: sin cookies de terceros hasta entonces. */
export default function Embed({ kind, id, title }: Props) {
  const [on, setOn] = useState(false);
  const src =
    kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`
      : `https://my.matterport.com/show/?m=${id}&play=1`;

  return (
    <div className={styles.box}>
      {on ? (
        <iframe src={src} title={title} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy" />
      ) : (
        <button type="button" className={styles.load} onClick={() => setOn(true)}>
          <span className={styles.kind}>{kind === "youtube" ? "Vídeo" : "Tour virtual"}</span>
          <span className={styles.cta}>Cargar {kind === "youtube" ? "el vídeo de YouTube" : "el tour de Matterport"} →</span>
          <span className={styles.note}>Al cargarlo, {kind === "youtube" ? "YouTube" : "Matterport"} puede usar cookies.</span>
        </button>
      )}
    </div>
  );
}
