/** Global mount point for badge toasts — lives in App.jsx under providers. */
import React from "react";
import { useBadges } from "../lib/BadgeContext";
import BadgeNotification from "./BadgeNotification";

export default function BadgeToastHost() {
  const { showBadgeNotification, clearBadgeNotification } = useBadges();
  return <BadgeNotification badge={showBadgeNotification} onClose={clearBadgeNotification} />;
}
