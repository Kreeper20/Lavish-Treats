const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ORDER_WEBHOOK_SECRET = Deno.env.get('ORDER_WEBHOOK_SECRET');

if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is required');
if (!ORDER_WEBHOOK_SECRET) throw new Error('ORDER_WEBHOOK_SECRET is required');

const FROM_EMAIL = 'orders@jennyose.com';
const BUSINESS_EMAIL = 'oodianose@gmail.com';

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatItems(items: unknown): string {
  const parsedItems =
    typeof items === 'string'
      ? JSON.parse(items)
      : items;

  if (!Array.isArray(parsedItems)) {
    return '<li>No item details provided</li>';
  }

  return parsedItems
    .map(
      (item: {
        name?: string;
        quantity?: number;
        note?: string;
      }) => `
        <li style="margin-bottom: 8px;">
          <strong>${escapeHtml(item.name)}</strong>
          &times; ${item.quantity ?? 0}
          ${
            item.note
              ? `<br><small>Note: ${escapeHtml(item.note)}</small>`
              : ''
          }
        </li>
      `,
    )
    .join('');
}

function textValue(value: unknown): string {
  return escapeHtml(value || 'Not provided');
}

async function sendEmail(payload: Record<string, unknown>) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Resend error ${response.status}: ${JSON.stringify(data)}`);
  }

  return data;
}

Deno.serve(async (request: Request) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const providedSecret = request.headers.get('x-webhook-secret');
  if (!providedSecret || providedSecret !== ORDER_WEBHOOK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let webhook: Record<string, unknown>;
  try {
    webhook = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (webhook.type !== 'INSERT' || webhook.table !== 'orders' || webhook.schema !== 'public') {
    return Response.json({ ignored: true });
  }

  const order = (webhook.record ?? {}) as Record<string, unknown>;
  const customerEmail = String(order.email ?? '').trim();

  if (!customerEmail || !customerEmail.includes('@')) {
    return Response.json({ error: 'The order has no valid customer email' }, { status: 422 });
  }

  const customerName = textValue(order.customer_name);
  const itemsHtml = formatItems(order.items);
  const totalAmount = textValue(order.total_amount);
  const collectionDate = textValue(order.collection_date);
  const collectionTime = textValue(order.collection_time);
  const phone = textValue(order.phone);
  const notes = textValue(order.notes);
  const orderId = textValue(order.id);
  const createdAt = textValue(order.created_at);

  const customerEmailPayload = {
    from: FROM_EMAIL,
    to: [customerEmail],
    subject: 'Your order has been confirmed',
    html: `
      <h2>Thank you for your order, ${customerName}!</h2>
      <p>Your order has been received and confirmed.</p>
      <h3>Order details</h3>
      <ul>
        <li><strong>Items:</strong><ul>${itemsHtml}</ul></li>
        <li><strong>Total:￡</strong> ${totalAmount}</li>
        <li><strong>Collection date:</strong> ${collectionDate}</li>
        <li><strong>Collection time:</strong> ${collectionTime}</li>
      </ul>
      <p>We look forward to preparing your order.</p>
    `,
  };

  const businessEmailPayload = {
    from: FROM_EMAIL,
    to: [BUSINESS_EMAIL],
    subject: `New order received - ${String(order.customer_name ?? 'Customer')}`,
    html: `
      <h2>New order received</h2>
      <h3>Customer details</h3>
      <ul>
        <li><strong>Name:</strong> ${customerName}</li>
        <li><strong>Email:</strong> ${textValue(order.email)}</li>
        <li><strong>Phone:</strong> ${phone}</li>
      </ul>
      <h3>Order details</h3>
      <ul>
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Items:</strong><ul>${itemsHtml}</ul></li>
        <li><strong>Total:￡</strong> ${totalAmount}</li>
        <li><strong>Collection date:</strong> ${collectionDate}</li>
        <li><strong>Collection time:</strong> ${collectionTime}</li>
        <li><strong>Notes:</strong> ${notes}</li>
        <li><strong>Created:</strong> ${createdAt}</li>
      </ul>
    `,
  };

  try {
    const [customerResult, businessResult] = await Promise.all([
      sendEmail(customerEmailPayload),
      sendEmail(businessEmailPayload),
    ]);

    return Response.json({
      success: true,
      customer_email_id: customerResult.id,
      business_email_id: businessResult.id,
    });
  } catch (error) {
    console.error('Failed to send order emails', error);
    return Response.json({ error: 'Failed to send order emails' }, { status: 502 });
  }
});