"use server";

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Subscribes an email address. Uses Buttondown when BUTTONDOWN_API_KEY is set; swap the fetch
 * for another provider's API if you pick a different one.
 */
export async function subscribe(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL.test(email)) {
    return { status: "error", message: "That email doesn't look right. Mind checking it?" };
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.warn("Newsletter signup received but BUTTONDOWN_API_KEY is not configured.");
    return { status: "error", message: "Sign-ups open soon. Check back shortly." };
  }

  const response = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Token ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: email }),
  });

  if (response.ok) {
    return { status: "success", message: "You're on the list. First letter lands after our next trip." };
  }
  if (response.status === 400 || response.status === 409) {
    return { status: "success", message: "You're already on the list." };
  }
  return { status: "error", message: "Something went wrong on our end. Please try again." };
}
