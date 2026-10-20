// Newsletter signup. Replace the body with a call to the backend or email
// provider (Klaviyo, Mailchimp, etc.) when it exists.
export const subscribe = async (email) => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return { email, ok: true }
}
