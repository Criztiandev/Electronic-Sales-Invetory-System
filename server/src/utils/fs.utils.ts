import { fileURLToPath } from "url";
import { dirname } from "path";
import * as path from "path";

export const publicFolder = (target: string) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, `../../public/${target}`);
  return filePath;
};
