'use server';

export async function submitContact(
  _prevState: { success: boolean; error: string } | null,
  formData: FormData
): Promise<{ success: boolean; error: string }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill in all fields.' };
  }

  const id = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'xyzabcde';

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    if (!res.ok) {
      return { success: false, error: 'Failed to send. Try emailing directly.' };
    }
    return { success: true, error: '' };
  } catch {
    return { success: false, error: 'Network error. Please try again.' };
  }
}
