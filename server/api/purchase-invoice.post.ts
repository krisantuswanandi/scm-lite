export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { order, lines } = await readBody(event);

  return $fetch(
    `${config.jurnalApiUrl}/purchase_orders/${order}/convert_to_invoice`,
    {
      method: "POST",
      headers: {
        apikey: config.jurnalApiKey,
      },
      body: {
        purchase_quote: {
          transaction_date: new Date().toISOString().substring(0, 10),
          transaction_lines_attributes: lines.map((id: number) => ({
            id,
            quantity: 100,
          })),
        },
      },
    }
  );
});
