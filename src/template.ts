import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';

export function renderTemplate(
  path: string,
  vars: Record<string, any>
): string {
  const filePath = resolve(dirname(require.main.filename), path);
  let html = readFileSync(filePath, 'utf-8');

  html = html.replace(/{{(.+?)}}/g, function (_, name) {
    name = name.trim();

    if (vars[name] === undefined) {
      console.log('no var with name' + name);
      return '';
    }

    return vars[name];
  });

  return html;
}
