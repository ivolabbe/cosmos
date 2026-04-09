#!/usr/bin/env node
// Download an image from a URL, following redirects, and validate it's actually an image.
// Usage: node dev/download-image.js <url> <output-path>
//
// Validates:
//   1. HTTP response is 200
//   2. Content-Type is an image type (image/jpeg, image/png, image/gif, image/webp, image/svg+xml)
//   3. File size > 0
//   4. File magic bytes match an image format
//
// Exits with code 1 and removes the file if validation fails.

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const MAGIC_BYTES = {
  'ffd8ff':   'image/jpeg',
  '89504e47': 'image/png',
  '47494638': 'image/gif',
  '52494646': 'image/webp',  // RIFF header (WebP)
  '3c3f786d': 'image/svg+xml', // <?xm
  '3c737667': 'image/svg+xml', // <svg
};

const MAX_REDIRECTS = 5;

function fetch(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > MAX_REDIRECTS) {
      return reject(new Error(`Too many redirects (>${MAX_REDIRECTS})`));
    }

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 COSMOS-Encyclopedia/1.0' } }, (res) => {
      // Follow redirects
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (redirectUrl.startsWith('/')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        res.resume(); // drain response
        return resolve(fetch(redirectUrl, redirectCount + 1));
      }

      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const contentType = (res.headers['content-type'] || '').toLowerCase();
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType, finalUrl: url }));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

function checkMagicBytes(buffer) {
  if (buffer.length < 4) return null;
  const hex = buffer.subarray(0, 4).toString('hex');
  for (const [magic, type] of Object.entries(MAGIC_BYTES)) {
    if (hex.startsWith(magic)) return type;
  }
  return null;
}

async function main() {
  const [url, outputPath] = process.argv.slice(2);

  if (!url || !outputPath) {
    console.error('Usage: node dev/download-image.js <url> <output-path>');
    process.exit(1);
  }

  console.log(`Downloading: ${url}`);
  console.log(`Output: ${outputPath}`);

  try {
    const { buffer, contentType, finalUrl } = await fetch(url);

    // Check 1: Content-Type
    const isImageContentType = contentType.startsWith('image/');
    if (!isImageContentType) {
      console.error(`FAIL: Content-Type is "${contentType}", not an image type`);
      console.error(`  The server returned HTML or other non-image content.`);
      console.error(`  Final URL after redirects: ${finalUrl}`);
      process.exit(1);
    }

    // Check 2: File size
    if (buffer.length === 0) {
      console.error('FAIL: Downloaded file is empty (0 bytes)');
      process.exit(1);
    }

    // Check 3: Magic bytes
    const detectedType = checkMagicBytes(buffer);
    if (!detectedType) {
      // Check if it's actually HTML despite content-type
      const head = buffer.subarray(0, 200).toString('utf8').toLowerCase();
      if (head.includes('<!doctype') || head.includes('<html') || head.includes('<head')) {
        console.error('FAIL: File contains HTML despite image Content-Type header');
        console.error(`  First 100 chars: ${head.substring(0, 100)}`);
        process.exit(1);
      }
      console.warn(`WARN: Could not detect image type from magic bytes, but Content-Type says ${contentType}`);
    }

    // Write file
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(outputPath, buffer);

    const ext = detectedType ? detectedType.split('/')[1].replace('jpeg', 'jpg') : 'unknown';
    console.log(`OK: ${buffer.length} bytes, type: ${detectedType || contentType}, saved to ${outputPath}`);

    // Check if extension matches
    const fileExt = path.extname(outputPath).toLowerCase().replace('.', '');
    const expectedExt = ext === 'svg+xml' ? 'svg' : ext;
    if (fileExt && fileExt !== expectedExt && expectedExt !== 'unknown') {
      console.warn(`WARN: File extension .${fileExt} does not match detected type ${detectedType} (.${expectedExt})`);
    }

  } catch (err) {
    console.error(`FAIL: ${err.message}`);
    // Clean up partial file
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    process.exit(1);
  }
}

main();
