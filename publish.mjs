import { cpSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('./out/', import.meta.url));
const destination = fileURLToPath(new URL('./', import.meta.url));
for (const entry of readdirSync(source)) {
  if (entry === '_next') rmSync(join(destination, entry), { recursive: true, force: true });
  cpSync(join(source, entry), join(destination, entry), { recursive: true });
}
writeFileSync(join(destination, '.nojekyll'), '');
