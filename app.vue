<script setup lang="ts">
const { products }: any = await $fetch("/api/products");

const stockNotification: any = {};
products.forEach((p: any) => {
  if (!p.warehouses) return;
  Object.keys(p.warehouses).forEach((wId: string) => {
    if (wId === "-1") return;
    const w = p.warehouses[wId];
    if (w.quantity > 10) return;
    if (!stockNotification[w.name]) {
      stockNotification[w.name] = [];
    }
    stockNotification[w.name].push({
      id: p.id,
      name: p.name,
      price: p.last_buy_price || parseInt(p.buy_price_per_unit),
    });
  });
});

const quote = ref<any>(null);
async function createQuote(products: any) {
  const { purchase_quote }: any = await $fetch("/api/purchase-quote", {
    method: "POST",
    body: { products },
  });
  quote.value = purchase_quote;
}

const order = ref<any>(null);
async function createOrder() {
  const { purchase_order }: any = await $fetch("/api/purchase-order", {
    method: "POST",
    body: {
      quote: quote.value.id,
      lines: quote.value.transaction_lines_attributes.map((i: any) => i.id),
    },
  });
  order.value = purchase_order;
}

const invoice = ref<any>(null);
async function createInvoice() {
  const { purchase_invoice }: any = await $fetch("/api/purchase-invoice", {
    method: "POST",
    body: {
      order: order.value.id,
      lines: order.value.transaction_lines_attributes.map((i: any) => i.id),
    },
  });
  invoice.value = purchase_invoice;
}

function createPayment() {
  alert("Payment created");
}

function getPurchaseUrl(id: string) {
  return `https://my.jurnal.id/v3/purchases/${id}`;
}
</script>

<template>
  <div class="p-4">
    <div v-if="products">
      <div class="font-bold">To order:</div>
      <div v-for="(products, warehouse) in stockNotification" :key="warehouse">
        <div>Warehouse: {{ warehouse }}</div>
        <div>Products:</div>
        <div v-for="p in products" :key="p">- {{ p.name }}</div>
        <button class="bg-neutral-300 px-2 py-1" @click="createQuote(products)">
          Create Quote
        </button>
      </div>
    </div>
    <div v-if="quote" class="mt-4">
      <div>
        Quote:
        <a
          target="_blank"
          class="text-blue-500 underline"
          :href="getPurchaseUrl(quote.id)"
        >
          {{ getPurchaseUrl(quote.id) }}
        </a>
      </div>
      <button class="bg-neutral-300 px-2 py-1" @click="createOrder">
        Create Order
      </button>
    </div>
    <div v-if="order" class="mt-4">
      <div>
        Order:
        <a
          target="_blank"
          class="text-blue-500 underline"
          :href="getPurchaseUrl(order.id)"
        >
          {{ getPurchaseUrl(order.id) }}
        </a>
      </div>
      <button class="bg-neutral-300 px-2 py-1" @click="createInvoice">
        Create Invoice
      </button>
    </div>
    <div v-if="invoice" class="mt-4">
      <div>
        Order:
        <a
          target="_blank"
          class="text-blue-500 underline"
          :href="getPurchaseUrl(invoice.id)"
        >
          {{ getPurchaseUrl(invoice.id) }}
        </a>
      </div>
      <button class="bg-neutral-300 px-2 py-1" @click="createPayment">
        Create Payment
      </button>
    </div>
  </div>
</template>
