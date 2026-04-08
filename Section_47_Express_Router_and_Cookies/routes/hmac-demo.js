

const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Manual HMAC implementation (what cookie-parser does internally)
const SECRET = 'my-hmac-secret-key';

function signValue(value, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(value);
  const signature = hmac.digest('base64');
  return `${value}.${signature}`;
}

function verifySignedValue(signedValue, secret) {
  const lastDotIndex = signedValue.lastIndexOf('.');
  if (lastDotIndex === -1) return null;
  
  const value = signedValue.slice(0, lastDotIndex);
  const signature = signedValue.slice(lastDotIndex + 1);
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(value)
    .digest('base64');
  
  return signature === expectedSignature ? value : null;
}

// Demo: Manual signing vs cookie-parser
router.get('/manual-vs-parser', (req, res) => {
  const originalValue = 'user_id_12345';
  
  // Manual signing
  const manuallySigned = signValue(originalValue, SECRET);
  const manuallyVerified = verifySignedValue(manuallySigned, SECRET);
  
  // Using cookie-parser
  res.cookie('manual_demo', originalValue, { 
    signed: true,
    httpOnly: true 
  });
  
  res.json({
    message: 'HMAC Signing Demo',
    originalValue,
    manuallySigned,
    manuallyVerified: manuallyVerified === originalValue ? '✅ Valid' : '❌ Invalid',
    howItWorks: {
      step1: 'Take value: "user_id_12345"',
      step2: 'Create HMAC-SHA256 hash using secret key',
      step3: 'Append signature: "user_id_12345.signature"',
      step4: 'Verification: Recompute hash and compare signatures'
    },
    note: 'cookie-parser does this automatically with signed: true'
  });
});

// Visual HMAC demonstration
router.get('/visual', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>HMAC Signing Visual Demo</title>
      <style>
        body { font-family: monospace; padding: 20px; max-width: 900px; margin: 0 auto; }
        .step { background: #f4f4f4; margin: 20px 0; padding: 20px; border-left: 4px solid #007bff; }
        code { background: #e0e0e0; padding: 2px 5px; border-radius: 3px; }
        .hash { background: #2c3e50; color: #ecf0f1; padding: 10px; overflow-x: auto; }
        button { padding: 10px 20px; margin: 10px 5px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px; }
        input { padding: 10px; margin: 5px; width: 300px; }
      </style>
    </head>
    <body>
      <h1>🔐 How HMAC Signing Works</h1>
      
      <div class="step">
        <h3>Step 1: Original Data</h3>
        <code>userId = "12345"</code>
      </div>
      
      <div class="step">
        <h3>Step 2: Create HMAC</h3>
        <p>HMAC = HMAC-SHA256(secret, "12345")</p>
        <div class="hash" id="hmac-result">Click "Generate HMAC" to see</div>
        <button onclick="generateHMAC()">Generate HMAC</button>
      </div>
      
      <div class="step">
        <h3>Step 3: Sign Cookie</h3>
        <code>signedCookie = "12345" + "." + HMAC</code>
        <div class="hash" id="signed-result"></div>
      </div>
      
      <div class="step">
        <h3>Step 4: Verify</h3>
        <p>When cookie returns, server extracts value and HMAC, then recomputes HMAC</p>
        <input type="text" id="tampered-value" placeholder="Try modifying: 12345.fakesignature">
        <button onclick="verifyCookie()">Verify Cookie</button>
        <div id="verify-result"></div>
      </div>
      
      <script>
        const SECRET = 'my-secret-key';
        
        async function generateHMAC() {
          const value = '12345';
          const encoder = new TextEncoder();
          const keyData = encoder.encode(SECRET);
          const messageData = encoder.encode(value);
          
          // Import key
          const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
          );
          
          // Sign
          const signature = await crypto.subtle.sign('HMAC', key, messageData);
          const hashArray = Array.from(new Uint8Array(signature));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          
          document.getElementById('hmac-result').innerHTML = \`HMAC-SHA256: \${hashHex}\`;
          document.getElementById('signed-result').innerHTML = \`Signed Cookie: 12345.\${hashHex}\`;
        }
        
        async function verifyCookie() {
          const tampered = document.getElementById('tampered-value').value;
          const parts = tampered.split('.');
          
          if (parts.length !== 2) {
            document.getElementById('verify-result').innerHTML = 
              '<span style="color: red;">❌ Invalid format. Use: value.signature</span>';
            return;
          }
          
          const [value, providedSig] = parts;
          const encoder = new TextEncoder();
          const keyData = encoder.encode(SECRET);
          const messageData = encoder.encode(value);
          
          const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
          );
          
          // Convert provided signature from hex to bytes
          const sigBytes = new Uint8Array(providedSig.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
          
          const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, messageData);
          
          if (isValid) {
            document.getElementById('verify-result').innerHTML = 
              '<span style="color: green;">✅ Cookie is valid! Value: ' + value + '</span>';
          } else {
            document.getElementById('verify-result').innerHTML = 
              '<span style="color: red;">❌ Cookie TAMPERED! Signature does not match value</span>';
          }
        }
        
        generateHMAC();
      </script>
    </body>
    </html>
  `);
});

// Performance comparison: unsigned vs signed
router.get('/performance', (req, res) => {
  const iterations = 10000;
  
  // Test unsigned cookie performance
  const unsignedStart = Date.now();
  for (let i = 0; i < iterations; i++) {
    res.cookie(`unsigned_${i}`, 'value', { httpOnly: true });
  }
  const unsignedTime = Date.now() - unsignedStart;
  
  // Test signed cookie performance
  const signedStart = Date.now();
  for (let i = 0; i < iterations; i++) {
    res.cookie(`signed_${i}`, 'value', { signed: true, httpOnly: true });
  }
  const signedTime = Date.now() - signedStart;
  
  res.json({
    message: 'Performance Comparison',
    iterations,
    unsignedTime: `${unsignedTime}ms`,
    signedTime: `${signedTime}ms`,
    overhead: `${((signedTime - unsignedTime) / unsignedTime * 100).toFixed(2)}%`,
    conclusion: 'Signed cookies have ~10-20% overhead, worth it for security'
  });
});

module.exports = router;