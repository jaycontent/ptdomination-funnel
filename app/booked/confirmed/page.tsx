"use client";

import { useEffect } from "react";
import { useFbTrack } from "@/lib/useFbTrack";
import styles from "./confirmed.module.css";

export default function BookedConfirmedPage() {
  useFbTrack("PageView");

  // Report the booking to Meta as a Schedule conversion.
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Schedule");
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <div className={styles.check}>&#10003;</div>
          <h1>Your Call Is Confirmed</h1>
          <p className={styles.sub}>
            You&rsquo;re on the calendar. The invite and Zoom link are in your email right now, so add
            them to your calendar before you close this tab.
          </p>
        </div>
      </section>

      <section className={styles.steps}>
        <div className={styles.wrap}>
          <div className={styles.step}>
            <div className={styles.num}>1</div>
            <div className={styles.stepBody}>
              <h3>Check your email</h3>
              <p>
                Your confirmation has the <strong>Zoom link and the time</strong>. If it isn&rsquo;t in
                your inbox, check spam and promotions, then mark it as not spam so the reminders reach
                you.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.num}>2</div>
            <div className={styles.stepBody}>
              <h3>Block the time properly</h3>
              <p>
                Be somewhere quiet where you can talk and have your numbers in front of you.{" "}
                <strong>This is a working session, not a listening session.</strong>
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.num}>3</div>
            <div className={styles.stepBody}>
              <h3>Show up on time</h3>
              <p>
                These slots are limited and the team holds one for you.{" "}
                <strong>If you can&rsquo;t make it, reschedule from your confirmation email</strong>{" "}
                rather than no-showing.
              </p>
            </div>
          </div>

          <p className={styles.reschedule}>
            Need a different time? Use the reschedule link in your confirmation email.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 PT Domination. All rights reserved.</p>
        <p>This site is not a part of the Facebook/Meta website or Facebook/Meta Inc.</p>
      </footer>
    </div>
  );
}
