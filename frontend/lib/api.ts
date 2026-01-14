const API_URL = "http://localhost:8000"

type FetchOptions = Omit<RequestInit, "body"> & { json?: any; body?: BodyInit | null };

async function request(path: string, opts: FetchOptions = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...opts,
      headers: { ...headers, ...(opts.headers || {}) },
      body: opts.json ? JSON.stringify(opts.json) : opts.body,
    });
  } catch (networkErr: any) {
    // Network-level failure (CORS, mixed-content, DNS, offline, blocked)
    console.error("API network error:", networkErr);
    throw { status: 0, body: String(networkErr?.message || networkErr) };
  }

  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, body: json };
    return json;
  } catch (e) {
    if (e && typeof e === "object" && (e as any).status) throw e;
    // if parsing failed but status ok, return raw text
    if (res.ok) return text;
    throw { status: res.status, body: text };
  }
}

export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, json?: any) => request(path, { method: "POST", json }),
  put: (path: string, json?: any) => request(path, { method: "PUT", json }),
  del: (path: string) => request(path, { method: "DELETE" }),
};

export default api;
