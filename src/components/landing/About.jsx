import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

/* Icons kept strictly to the outer edges/corners, away from the card area */
const LOGOS = [
  {
    name: "JavaScript", x: "1%", y: "5%", size: 52, dur: 9, delay: 0, rot: -8,
    svg: <svg viewBox="0 0 630 630" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="630" height="630" fill="#4F46E5" opacity="0.15" rx="60"/><path d="M423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.17-71.1-40.92-71.1-89.09 0-44.35 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.17-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.35c50.3 21.57 78.7 43.54 78.7 92.93 0 53.2-41.78 82.4-97.9 82.4-54.85 0-90.3-26.1-107.6-60.25zm-209.13 5.13c9.3 16.5 17.76 30.45 37.94 30.45 19.4 0 31.66-7.6 31.66-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54z" fill="#6366f1"/></svg>,
  },
  {
    name: "Python", x: "91%", y: "3%", size: 56, dur: 11, delay: 1, rot: 10,
    svg: <svg viewBox="0 0 256 255" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M126.9 0c-63.7 0-59.7 27.6-59.7 27.6l.1 28.6h60.8v8.6H45.4S0 59.5 0 123.9c0 64.3 35.5 62 35.5 62h21.2v-29.8s-1.1-35.5 34.9-35.5h60.1s33.8.5 33.8-32.7V34.2S190.8 0 126.9 0zm-33.4 19.7c6.1 0 11 4.9 11 11s-4.9 11-11 11-11-4.9-11-11 4.9-11 11-11z" fill="#7C3AED" opacity="0.7"/><path d="M129.1 255c63.7 0 59.7-27.6 59.7-27.6l-.1-28.6h-60.8v-8.6h82.8s45.4 5.3 45.4-59.1c0-64.3-35.5-62-35.5-62h-21.2v29.8s1.1 35.5-34.9 35.5H103.9s-33.8-.5-33.8 32.7v54.7S65.2 255 129.1 255zm33.4-19.7c-6.1 0-11-4.9-11-11s4.9-11 11-11 11 4.9 11 11-4.9 11-11 11z" fill="#6366f1" opacity="0.7"/></svg>,
  },
  {
    name: "Rust", x: "93%", y: "45%", size: 54, dur: 8, delay: 2, rot: 8,
    svg: <svg viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="53" cy="53" r="46" stroke="#7C3AED" strokeWidth="4.5" fill="none"/><circle cx="53" cy="53" r="18" stroke="#6366f1" strokeWidth="4" fill="none"/><path d="M53 7v14M53 85v14M7 53h14M85 53h14" stroke="#8B5CF6" strokeWidth="4.5" strokeLinecap="round"/><circle cx="53" cy="53" r="6" fill="#7C3AED"/><path d="M28 28l10 10M68 68l10 10M28 78l10-10M68 38l10-10" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round"/><path d="M35 42c0-4.4 8-12 18-12s14 5.6 14 10-5.6 8-14 8H42c-8 0-13 3.6-13 8s5 9 14 9h22" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" fill="none"/></svg>,
  },
  {
    name: "TypeScript", x: "0%", y: "50%", size: 52, dur: 10, delay: 0.5, rot: -10,
    svg: <svg viewBox="0 0 630 630" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="630" height="630" fill="#4338CA" opacity="0.2" rx="60"/><path d="M492.1 315v26.4h-82.5V562H356V341.4H273.5V315zm-236.1 74.2c-12.6-2.8-22.4-8-29.4-15.6-7-7.6-10.5-16.9-10.5-28 0-20 7.5-36.2 22.6-48.5 15-12.3 35.2-18.5 60.5-18.5 17 0 32.5 2.1 46.5 6.4v53.3c-13-7.5-27.5-11.3-43.5-11.3-10 0-17.5 2.1-22.5 6.4-5 4.3-7.5 9.8-7.5 16.5 0 4.5 1.3 8.3 3.8 11.3 2.5 3 6.3 5.5 11.3 7.5l30.5 10.5c14.3 5 24.9 11.9 31.9 20.9 7 9 10.5 20.3 10.5 34 0 20.8-7.8 37.3-23.3 49.5-15.6 12.3-36.4 18.5-62.4 18.5-19.6 0-37.8-3.4-54.7-10.3v-54.5c15.5 9.5 31.7 14.3 48.7 14.3 10.6 0 18.6-2.2 24-6.7 5.4-4.5 8.1-10.3 8.1-17.4 0-5.1-1.5-9.4-4.5-12.9-3-3.5-8.3-6.7-15.9-9.5z" fill="#818CF8"/></svg>,
  },
  {
    name: "React", x: "88%", y: "75%", size: 58, dur: 12, delay: 1.5, rot: 15,
    svg: <svg viewBox="0 0 841.9 595.3" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><circle cx="420.9" cy="296.5" r="45.7" fill="#6366f1"/><path d="M420.9 128.3c-20.1 0-39.3 1-57.4 2.9-8.5-14.3-16.7-27.4-24.7-39.1C320 66.4 302.7 56 296.1 59.6c-6.6 3.6-7.5 20.6-2.4 43.5 2.3 10.4 5.8 22.1 10.4 34.8C264 151.4 224.7 174.7 224.7 200.4c0 25.8 39.4 49.1 79.5 63.1-4.8 14-8.4 27.8-10.7 40.9-5.2 28.4-2.6 50 7.6 55.7 10.4 5.8 30.6-4.8 52.7-26.5 6.1-6 12.4-12.7 18.7-19.9 18.1 1.8 37.1 2.8 57 2.8 19.9 0 38.9-.9 57-2.8 6.3 7.2 12.6 13.9 18.7 19.9 22.1 21.7 42.3 32.3 52.7 26.5 10.2-5.7 12.8-27.2 7.6-55.7-2.3-13.1-5.9-26.9-10.7-40.9 40.1-14 79.5-37.3 79.5-63.1 0-25.7-39.3-49-79.4-63.1 4.6-12.7 8.1-24.4 10.4-34.8 5.1-22.9 4.2-39.9-2.4-43.5-6.5-3.6-23.8 6.8-42.7 32.5-8 11.7-16.2 24.8-24.7 39.1-18.2-1.9-37.4-2.9-57.5-2.9z" fill="#818CF8"/></g></svg>,
  },
  {
    name: "Vite", x: "2%", y: "80%", size: 54, dur: 7, delay: 2.5, rot: 5,
    svg: <svg viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M399.6 59.5L215.2 388.7c-3.8 6.6-13.2 6.7-17.1.1L6.4 59.5c-4.1-7.1 1.8-15.7 9.9-14.6l193 26.5c1.2.2 2.4.2 3.6 0l188.8-26.5c8.1-1.1 14 7.5 9.9 14.6z" fill="#7C3AED" opacity="0.85"/><path d="M292.3 1.5L154.7 29.3c-2.5.5-4.4 2.6-4.6 5.2l-8.3 141.2c-.2 3.4 2.8 6.2 6.2 5.6l38.2-7c3.6-.7 6.7 2.6 5.7 6.2l-11.4 39.3c-1 3.7 2.3 7 6 6l23.6-5.7c3.7-.9 7 2.4 6 6.1l-18.1 69.5c-1.1 4.4 4.7 6.8 7.1 3.1l1.6-2.4 87.4-174.5c1.9-3.9-1.4-8.3-5.7-7.5l-39.3 7.6c-3.7.7-6.8-2.7-5.7-6.4l25.7-89.7c1-3.7-2.1-7.2-5.9-6.6z" fill="#A78BFA" opacity="0.9"/></svg>,
  },
  {
    name: "Go", x: "91%", y: "20%", size: 60, dur: 10, delay: 3, rot: 6,
    svg: <svg viewBox="0 0 207.9 78" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6l-36.2-.1zM1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6L1 33.3zM25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7l-21.8-.1z" fill="#6366f1"/><path d="M128.6 22.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7H90.3c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.5-6.9-7.1-5.9-11.1-13.6-12.2-22.7-1.3-10.7 1.8-20.4 8.1-28.9 6.9-9.2 16-15.3 27.2-17.8 9.1-2.1 17.9-1.2 26 3.5 5.4 3.1 9.3 7.5 12 13.1.6.7.2 1.1-.6 1.3zM160.2 78c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z" fill="#818CF8"/></svg>,
  },
  {
    name: "C++", x: "3%", y: "28%", size: 52, dur: 8, delay: 2, rot: 7,
    svg: <svg viewBox="0 0 306 344.1" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M302.1 258L161.3 340.6c-5.1 2.9-13.4 2.9-18.5 0L3 258c-5.1-2.9-9.2-10.1-9.2-16v-165c0-5.9 4.1-13.1 9.2-16L142.8 3.5c5.1-2.9 13.4-2.9 18.5 0L302.1 77c5.1 2.9 9.2 10.1 9.2 16v165c0 5.9-4.1 13.1-9.2 16z" fill="#4338CA" opacity="0.15"/><path d="M153.3 34.1l125 72.2v144.5l-125 72.2-125-72.2V106.3l125-72.2zm0-34.1L0 86.1V258l153.3 86.1L306.6 258V86.1L153.3 0z" fill="#6366f1" opacity="0.6"/><path d="M153.3 84.2c-37.4 0-71.7 19.5-90.5 51.4-18.8 32-18.8 71 0 103 18.8 32 53.1 51.4 90.5 51.4 24.2 0 47.1-7.6 66.1-21.5l-28.5-28.5c-11.1 8.5-24.4 13-37.6 13-20.2 0-39.1-10.5-49.9-27.7-10.8-17.2-10.8-38.8 0-56 10.8-17.2 29.7-27.7 49.9-27.7 13.2 0 26.5 4.5 37.6 13l28.5-28.5c-19-13.9-41.9-21.5-66.1-21.5z" fill="#818CF8"/><path d="M238 153.3h-15.7v-15.7h-15.7v15.7H191v15.7h15.7v15.7h15.7v-15.7H238zM282 153.3h-15.7v-15.7H251v15.7h-15.7v15.7H251v15.7h15.7v-15.7H282z" fill="#A78BFA"/></svg>,
  },
  {
    name: "CSS", x: "18%", y: "35%", size: 50, dur: 9, delay: 1.4, rot: -7,
    svg: <svg viewBox="0 0 452 520" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.5 0h369L370 421.5 226 460 82 421.5 41.5 0z" fill="#6366f1" opacity="0.15"/><path d="M226 421.5l118-32.7 31.5-352.8H226V421.5z" fill="#818CF8" opacity="0.5"/><path d="M226 208.7h-62.8l-4.3-48.2H226v-47.1H108.6l1.1 12.3 11.5 129h104.8v-46.9-.1zM226 309.5l-.2.1-52.4-14.2-3.3-37.5H123l6.6 74.2 96.3 26.7.1-.1V309.5z" fill="#6366f1" opacity="0.7"/></svg>,
  },
  {
    name: "HTML", x: "72%", y: "30%", size: 50, dur: 11, delay: 0.6, rot: 9,
    svg: <svg viewBox="0 0 452 520" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M41.5 0h369L370 421.5 226 460 82 421.5 41.5 0z" fill="#7C3AED" opacity="0.15"/><path d="M226 421.5l118-32.7 31.5-352.8H226V421.5z" fill="#A78BFA" opacity="0.4"/><path d="M226 113.4H113.6l1.5 16.9H226v-16.9zM226 179.2h-98.9l1.6 16.9H226v-16.9zM226 309.5v-17.4l-.2.1-52.4-14.2-3.3-37.5H153l6.6 74.2 66.4 18.4.1-.1-.1-23.5z" fill="#8B5CF6" opacity="0.7"/></svg>,
  },
  {
    name: "GraphQL", x: "14%", y: "60%", size: 48, dur: 8, delay: 3.2, rot: 5,
    svg: <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.5 302.5l-15-26 212.5-122.5 15 26z" fill="#6366f1" opacity="0.6"/><path d="M342.5 302.5l-212.5-122.5 15-26 212.5 122.5z" fill="#818CF8" opacity="0.6"/><path d="M57.5 97.5h285v30h-285z" fill="#7C3AED" opacity="0.5"/><circle cx="200" cy="75" r="25" stroke="#6366f1" strokeWidth="15" fill="none"/><circle cx="57.5" cy="310" r="25" stroke="#8B5CF6" strokeWidth="15" fill="none"/><circle cx="342.5" cy="310" r="25" stroke="#8B5CF6" strokeWidth="15" fill="none"/><circle cx="200" cy="325" r="25" stroke="#A78BFA" strokeWidth="15" fill="none"/></svg>,
  },
  {
    name: "Redis", x: "74%", y: "58%", size: 48, dur: 10, delay: 1.9, rot: -9,
    svg: <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M488.9 295.6c-15.8 8.2-97.6 41.9-115 50.7-17.3 8.8-26.9 8.7-40.6 2.1-13.7-6.6-106.7-44.2-122.4-52-15.7-7.8-15.8-13.2-.3-20.3l125.8-54.4c17.5-7.6 23.4-7.9 39.5-.3l113 50.8c16 7.3 15.8 15.2-.0 23.4z" fill="#6366f1" opacity="0.6"/><path d="M488.9 364c-15.8 8.2-97.6 41.9-115 50.7-17.3 8.8-26.9 8.7-40.6 2.1-13.7-6.6-106.7-44.2-122.4-52-7.8-3.9-11.8-8.1-11.7-12.3V320c0 4.3 3.9 8.6 11.7 12.4 15.7 7.8 108.7 45.4 122.4 52 13.7 6.6 23.3 6.7 40.6-2.1 17.3-8.8 99.1-42.5 115-50.7 8-4.1 11.9-8.4 11.9-12.7v31.7c0 4.3-4 8.7-11.9 12.7-.1-.1-.0-.1 0 0z" fill="#818CF8" opacity="0.5"/></svg>,
  },
  {
    name: "GitHub", x: "38%", y: "88%", size: 50, dur: 10, delay: 1.6, rot: -3,
    svg: <svg viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0112.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#6366f1" opacity="0.7"/></svg>,
  },
  {
    name: "Swift", x: "42%", y: "1%", size: 50, dur: 10, delay: 1.2, rot: -4,
    svg: <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M209.6 138.1c1.4-3.2 2.2-6.6 2.2-10.1 0-13.8-11.2-25-25-25H128l-19.2-19.2c32.7 4.8 68.2-7.3 91.9-35.2C163.2 26 112 16 68 39.2 44.1 51.8 27.2 73.1 21.3 97.8c-5.9 24.7-.9 51 13.6 71.7 14.5 20.7 37.8 33.8 63.1 35.7h88c13.8 0 25-11.2 25-25 0-6.1-2.2-11.7-5.8-16.1 6.3-3.8 10.9-10.3 10.9-18 0-4.4-1.3-8.5-3.5-12z" fill="#8B5CF6" opacity="0.7"/></svg>,
  },
  {
    name: "Dart", x: "48%", y: "90%", size: 48, dur: 9, delay: 2.8, rot: 8,
    svg: <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M58.4 210.6L18 170.2V92l40.4-40.4h78.2L93.4 95H58.4v72l35 35.6h35l43.2 43.2H58.4z" fill="#6366f1" opacity="0.7"/><path d="M197.6 170.2l-43.2 43.2V131l43.2-43.2v82.4z" fill="#818CF8" opacity="0.7"/><path d="M197.6 85.8L154.4 42h-18L93.4 95h61v17.8l43.2-27z" fill="#A78BFA" opacity="0.6"/></svg>,
  },
  {
    name: "Kotlin", x: "90%", y: "88%", size: 50, dur: 11, delay: 0.8, rot: -6,
    svg: <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60 60H0L30 30 0 0h60" fill="url(#kg2)" opacity="0.8"/><defs><linearGradient id="kg2" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="0.5" stopColor="#8B5CF6"/><stop offset="1" stopColor="#7C3AED"/></linearGradient></defs></svg>,
  },
  {
    name: "Node", x: "2%", y: "62%", size: 56, dur: 9, delay: 3.5, rot: 10,
    svg: <svg viewBox="0 0 256 282" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M128 0L4 66v150l124 66 124-66V66L128 0z" fill="#4338CA" opacity="0.12"/><path d="M128 23L20 83v118l108 58 108-58V83L128 23z" stroke="#6366f1" strokeWidth="8" fill="none" opacity="0.5"/><path d="M96 100v80l32 18 32-18v-80l-32-18-32 18z" stroke="#818CF8" strokeWidth="6" fill="none"/><circle cx="128" cy="141" r="16" fill="#7C3AED" opacity="0.7"/></svg>,
  },
  {
    name: "Docker", x: "88%", y: "10%", size: 58, dur: 13, delay: 2.2, rot: -5,
    svg: <svg viewBox="0 0 432.1 313.2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M407.3 141.5c-4.6-3.4-15.1-4.6-23.2-3-1-7.2-5.3-13.5-13.1-19.3l-4.5-3-3 4.5c-3.8 5.7-5.7 13.6-5.1 20.2.3 2.7 1.2 7.5 4.1 11.7-2.9 1.6-8.6 3.8-16.2 3.7H6.7l-.5 2.2c-1.8 10.5-1.8 43.4 18.5 68.7 15.4 19.3 38.4 29.1 68.5 29.1 65.1 0 113.3-30 136-84.6 8.9.2 28.1 0 38-18.8 1-1.8 5-10 5.2-10.5l-5.5-3.3-59.6.3z" fill="#6366f1" opacity="0.6"/><path d="M246.3 85.4h-37.8v34.4h37.8V85.4zM200.4 85.4h-37.8v34.4h37.8V85.4zM200.4 40.6h-37.8V75h37.8V40.6zM154.6 85.4h-37.8v34.4h37.8V85.4zM108.7 85.4H70.9v34.4h37.8V85.4zM292.2 85.4h-37.8v34.4h37.8V85.4z" fill="#818CF8" opacity="0.7"/></svg>,
  },
];

export default function About({ appIconUrl }) {
  return (
    <section id="about" className="relative py-32 sm:py-40 overflow-hidden">

      {/* Tech logos — pinned to outer edges only */}
      {LOGOS.map((logo) => (
        <motion.div
          key={logo.name}
          className="absolute pointer-events-none select-none hidden sm:block"
          style={{ left: logo.x, top: logo.y, width: logo.size, height: logo.size, opacity: 0.14, willChange: "transform, opacity" }}
          animate={{ y: [0, -14, 0], rotate: [logo.rot, logo.rot + 5, logo.rot], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: logo.dur, repeat: Infinity, ease: "easeInOut", delay: logo.delay }}
        >
          {logo.svg}
        </motion.div>
      ))}

      <div className="relative max-w-2xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our Projects
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            What We're Building.
          </h2>
          <motion.div
            className="mt-3 h-1.5 w-28 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400 opacity-60 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "center" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <ProjectCard iconUrl={appIconUrl} />
        </motion.div>
      </div>
    </section>
  );
}