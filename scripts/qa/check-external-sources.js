/**
 * Separates Monitoring-Skript für externe Quellen-URLs.
 * 
 * WICHTIG:
 * - Läuft NICHT als Build-Blocker im regulären Deployment!
 * - Berücksichtigt Bot-Blockaden (403, 429) und klassifiziert sie als NOT_VERIFIED / WARNING.
 * - Nutzt Timeouts und User-Agent-Header.
 */

import https from 'node:https';
import http from 'node:http';
import { PRODUCTS } from '../../src/data/products.js';

console.log('Starte Überprüfung externer Quellen-URLs...');

const urlsToCheck = [...new Set(PRODUCTS.map(p => p.source_url).filter(Boolean))];
console.log(`Prüfe ${urlsToCheck.length} eindeutige Quellen-URLs...\n`);

function checkUrl(urlStr) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(urlStr);
      const client = parsed.protocol === 'https:' ? https : http;

      const req = client.request(urlStr, {
        method: 'HEAD',
        timeout: 6000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve({ url: urlStr, status: 'PASS', code: res.statusCode });
        } else if (res.statusCode === 403 || res.statusCode === 429) {
          resolve({ url: urlStr, status: 'NOT_VERIFIED', code: res.statusCode, reason: 'Bot-Schutz / Rate-Limit' });
        } else {
          resolve({ url: urlStr, status: 'WARNING', code: res.statusCode, reason: `HTTP Status ${res.statusCode}` });
        }
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ url: urlStr, status: 'WARNING', code: 'TIMEOUT', reason: 'Zeitüberschreitung (>6s)' });
      });

      req.on('error', (err) => {
        resolve({ url: urlStr, status: 'WARNING', code: 'ERROR', reason: err.message });
      });

      req.end();
    } catch (e) {
      resolve({ url: urlStr, status: 'FAIL', code: 'INVALID_URL', reason: e.message });
    }
  });
}

const results = await Promise.all(urlsToCheck.map(checkUrl));

for (const res of results) {
  const icon = res.status === 'PASS' ? '✅' : res.status === 'NOT_VERIFIED' ? '🔍' : '⚠️';
  console.log(`${icon} [${res.status}] ${res.url} (${res.code}${res.reason ? ': ' + res.reason : ''})`);
}

console.log('\nQuellen-Check beendet. (Keine Build-Auswirkung)');
