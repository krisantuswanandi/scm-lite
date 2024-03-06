export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { products } = await readBody(event);

  return $fetch(`${config.jurnalApiUrl}/purchase_quotes`, {
    method: "POST",
    headers: { apikey: config.jurnalApiKey },
    body: {
      purchase_quote: {
        transaction_date: new Date().toISOString().substring(0, 10),
        transaction_lines_attributes: products.map((p: any) => ({
          quantity: 100,
          rate: p.price,
          product_name: p.name,
        })),
        person_name: "PT Sumber Makmur Sentosa",
      },
    },
  });
});
