import AnimatedCompass from "./AnimatedCompass";
import AnimatedPenTool from "./AnimatedPenTool";
import AnimatedDatabase from "./AnimatedDatabase";
import AnimatedCode from "./AnimatedCode";
import AnimatedClipboardCheck from "./AnimatedClipboardCheck";
import AnimatedRocket from "./AnimatedRocket";
import PenWritingIcon from "./PenWritingIcon";

// "From idea to launch" — animated step icons.
// Keys match the `icon` field in src/data/process.ts so a step can resolve
// its animated icon the same way it resolves its lucide name today.
//   const Icon = processIcons[step.icon];
export {
  AnimatedCompass,
  AnimatedPenTool,
  AnimatedDatabase,
  AnimatedCode,
  AnimatedClipboardCheck,
  AnimatedRocket,
  PenWritingIcon,
};

export const processIcons = {
  Compass: AnimatedCompass,
  PenTool: AnimatedPenTool,
  Database: AnimatedDatabase,
  Code2: AnimatedCode,
  ClipboardCheck: AnimatedClipboardCheck,
  Rocket: AnimatedRocket,
} as const;
