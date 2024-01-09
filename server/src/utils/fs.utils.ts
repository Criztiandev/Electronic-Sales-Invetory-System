import { fileURLToPath } from "url";
import { dirname } from "path";
import * as path from "path";

export const publicFolder = (target: string) => {
  const rootDir = path.resolve(process.cwd());
  const filePath = `${rootDir}/public/images/${target}`;
  return filePath;
};
