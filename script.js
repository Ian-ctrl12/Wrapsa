const PIN = "123PEEPS";
const channel = new BroadcastChannel("wrapsa");

let orders = JSON.parse(localStorage.getItem("orders")) || [];

channel.onmessage = e => {
  orders = e.data;
  renderOrders();
};

function save() {
  localStorage.setItem("orders", JSON.stringify(orders));
  channel.postMessage(orders);
}

function showOrder() {
  order.classList.remove("hidden");
  kitchen.classList.add("hidden");
}

function showKitchen() {
  order.classList.add("hidden");
  kitchen.classList.remove("hidden");
}

function placeOrder() {
  orders.push({
    id: Date.now(),
    name: name.value,
    item: item.value,
    status: "Ordered"
  });
  save();
  alert("Order placed!");
}

function unlockKitchen() {
  if (pin.value === PIN) renderOrders();
  else alert("Wrong PIN");
}

function updateStatus(id, status) {
  if (status === "Complete") {
    orders = orders.filter(o => o.id !== id);
  } else {
    orders.find(o => o.id === id).status = status;
    alert("Order is now " + status);
  }
  save();
}

function renderOrders() {
  ordersDiv.innerHTML = "";
  orders.forEach(o => {
    ordersDiv.innerHTML += `
      <div class="order-card">
        <b>${o.name}</b><br>${o.item}<br>Status: ${o.status}<br>
        <button onclick="updateStatus(${o.id}, 'Preparing')">Preparing</button>
        <button onclick="updateStatus(${o.id}, 'Ready')">Ready</button>
        <button onclick="updateStatus(${o.id}, 'Complete')">Complete</button>
      </div>`;
  });
}
