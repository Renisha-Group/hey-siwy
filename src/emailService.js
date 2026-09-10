const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send'

export async function sendRegistrationEmail({ name, email, mobile }) {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) return { configured: false }

  const response = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      // `to_email` must match the EmailJS template's To Email field: {{to_email}}.
      // Passwords are intentionally never sent to EmailJS.
      template_params: { name, to_email: email, contact_number: mobile },
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || 'Email service rejected the request')
  }
  return { configured: true }
}
