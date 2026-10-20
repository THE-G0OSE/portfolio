import { API_PROXY_PATH } from "@/shared/config";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

interface IRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

// nest returns { message: string | string[] } on errors
const getErrorMessage = async (res: Response) => {
  try {
    const { message } = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(message)) return message.join(", ");
    return message ?? res.statusText;
  } catch {
    return res.statusText;
  }
};

// browser side request to the api, goes through the site origin with the admin cookie
export const apiRequest = async <T = void>(path: string, { method = "GET", body }: IRequestOptions = {}) => {
  const res = await fetch(`${API_PROXY_PATH}${path}`, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
    cache: "no-store",
  });

  if (!res.ok) throw new ApiError(res.status, await getErrorMessage(res));
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
};

// create / update / delete endpoints of one resource
export const createCrudApi = <TEntity, TInput>(basePath: string) => ({
  create: (input: TInput) => apiRequest<TEntity>(basePath, { method: "POST", body: input }),
  update: (id: number, input: Partial<TInput>) =>
    apiRequest<TEntity>(`${basePath}/${id}`, { method: "PATCH", body: input }),
  remove: (id: number) => apiRequest(`${basePath}/${id}`, { method: "DELETE" }),
});
