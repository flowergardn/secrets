import { env } from "~/env";
import ky from "ky";

type TurnstileResponse = {
  success: boolean;
  "error-codes": string[];
};

export async function verifyTurnstile(
  token: string,
): Promise<TurnstileResponse> {
  console.log(`validating turnstile token: ${token}`);

  const idempotencyKey = crypto.randomUUID();

  return ky
    .post("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      json: {
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
        idempotency_key: idempotencyKey,
      },
    })
    .json<TurnstileResponse>();
}
