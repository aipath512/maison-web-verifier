export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== "GET") return Response.json({error:"method_not_allowed"},{status:405});
    if (url.pathname === "/health") return Response.json({service:"maison-web-verifier",status:"running",db_binding:!!env.DB});
    if (url.pathname !== "/") return Response.json({error:"not_found"},{status:404});
    if (!env.DB) return Response.json({error:"D1_binding_missing"},{status:503});
    try {
      const candidates = await env.DB.prepare("SELECT cui, candidate_domain, status FROM maison_web_candidates ORDER BY cui LIMIT 20").all();
      const count = await env.DB.prepare("SELECT COUNT(*) AS total FROM maison_web_verifications").first();
      return Response.json({service:"maison-web-verifier",mode:"READ_ONLY",candidates:candidates.results,verification_count:count.total});
    } catch (error) {
      return Response.json({error:"D1_query_failed",detail:String(error.message||error)},{status:500});
    }
  }
};
