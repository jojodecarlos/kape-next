export async function POST(request) {
  const body = await request.json();
  // TODO: validate and write to DB or send email in a future milestone
  return Response.json({ ok: true, received: body }, { status: 200 });
}
