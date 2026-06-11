/**
 * Must load before any HTTPS (Gemini). Fixes "unable to verify the first certificate"
 * on some Windows / antivirus / corporate proxy setups.
 * For production, prefer fixing system CA certs instead.
 */
// if (process.env.GEMINI_TLS_INSECURE !== "false") {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// }
