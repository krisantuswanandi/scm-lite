export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  return $fetch(`${config.jurnalApiUrl}/products`, {
    headers: {
      apikey: config.jurnalApiKey,
    },
  });
});
