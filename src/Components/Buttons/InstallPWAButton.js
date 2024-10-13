import { useRef } from "react";
import { memo } from "react";
import React, { useEffect, useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
const InstallPWAButton = memo(() => {
  console.log(window.globalCount++);
  const supportsPWA = useRef(false);
  const promptInstall = useRef(null);
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      supportsPWA.current = true;
      promptInstall.current = e;
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall.current) {
      return;
    }
    promptInstall.current.prompt();
  };
  if (!supportsPWA.current) {
    return null;
  }
  return <button className="icon" id="setup_button" aria-label="Install app" title="Install app" onClick={onClick}>
      <ArrowDownTrayIcon className="w-5 h-5" />
    </button>;
});
export default InstallPWAButton;