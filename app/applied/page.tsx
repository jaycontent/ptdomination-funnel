"use client";

import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./applied.module.css";

// Where applicants land when they are not sent straight to /booked.
export default function AppliedPage() {
  useFbTrack("PageView");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.check}>&#10003;</div>
          <h1>Thank You For Your Interest</h1>
          <p className={styles.sub}>
            We&rsquo;ll be reviewing your application shortly.
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 PT Domination. All rights reserved.</p>
        <p>This site is not a part of the Facebook/Meta website or Facebook/Meta Inc.</p>
      </footer>
    </div>
  );
}
