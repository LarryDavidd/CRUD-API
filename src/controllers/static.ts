import * as http from 'http';
import { renderTemplate } from '../template';

export function favicon(
  request: http.IncomingMessage,
  response: http.ServerResponse
): void {
  response.end('no image');
}

export function home(
  request: http.IncomingMessage,
  response: http.ServerResponse
): void {
  const html = renderTemplate('./views/index.html', {});
  response.end(html);
}
