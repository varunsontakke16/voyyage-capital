// Force Vercel Node.js serverless functions (not Vercel Edge).
// Node.js runtime is required for:
//   - node:crypto (createHmac, timingSafeEqual) used in subscriber & admin auth
//   - yahoo-finance2 (uses Node.js http/https internals)
export default {
  preset: "vercel",
};
