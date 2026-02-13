import { Client } from "pg";

export async function handler(event) {
  const client = new Client({
    connectionString: process.env.DB_URL
  });

  await client.connect();

  const data = JSON.parse(event.body);

  const order = await client.query(
    "INSERT INTO orders(email, total) VALUES($1,$2) RETURNING id",
    [data.email, data.total]
  );

  const orderId = order.rows[0].id;

  for (const item of data.items) {
    await client.query(
      "INSERT INTO order_items(order_id, product_id, quantity, price) VALUES($1,$2,$3,$4)",
      [orderId, item.id, item.qty, item.price]
    );
  }

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
