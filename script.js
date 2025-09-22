
        // Estado de la aplicación
        let appState = {
            currentOrder: {
                items: [],
                customer: {},
                payment: {},
            },
            tableOrder: {
                items: [],
                table: "",
            },
            menu: [
                {
                    id: 1,
                    name: "Taco de Cuerito",
                    category: "tacos",
                    price: 15,
                    available: true,
                },
                {
                    id: 2,
                    name: "Taco de Maciza",
                    category: "tacos",
                    price: 15,
                    available: true,
                },
                {
                    id: 3,
                    name: "Taco de Surtida",
                    category: "tacos",
                    price: 15,
                    available: true,
                },
                {
                    id: 4,
                    name: "Taco de Buche",
                    category: "tacos",
                    price: 15,
                    available: true,
                },
                {
                    id: 5,
                    name: "Taco de Nana",
                    category: "tacos",
                    price: 15,
                    available: false,
                },
                {
                    id: 6,
                    name: "Taco de Chamorro",
                    category: "tacos",
                    price: 15,
                    available: true,
                },
                {
                    id: 7,
                    name: "Taco de Oreja",
                    category: "tacos",
                    price: 15,
                    available: true,
                },
                {
                    id: 8,
                    name: "1/4 Kilo de Carnitas",
                    category: "carnitas",
                    price: 80,
                    available: true,
                },
                {
                    id: 9,
                    name: "1/2 Kilo de Carnitas",
                    category: "carnitas",
                    price: 150,
                    available: true,
                },
                {
                    id: 10,
                    name: "1 Kilo de Carnitas",
                    category: "carnitas",
                    price: 300,
                    available: true,
                },
                {
                    id: 11,
                    name: "Torta Simple",
                    category: "tortas",
                    price: 50,
                    available: true,
                },
                {
                    id: 12,
                    name: "Torta Especial",
                    category: "tortas",
                    price: 70,
                    available: true,
                },
                {
                    id: 13,
                    name: "Refresco",
                    category: "drinks",
                    price: 20,
                    available: true,
                },
                {
                    id: 14,
                    name: "Jugo",
                    category: "drinks",
                    price: 25,
                    available: true,
                },
                {
                    id: 15,
                    name: "Agua",
                    category: "drinks",
                    price: 15,
                    available: true,
                },
            ],
            orders: [
                {
                    id: 1001,
                    type: "outside",
                    customer: { name: "María González" },
                    address: "Av. Principal #123, Col. Centro",
                    deliveryTime: "2024-07-15T14:30",
                    items: [
                        { name: "Taco de Maciza", quantity: 5, price: 15 },
                        { name: "Taco de Cuerito", quantity: 3, price: 15 },
                        { name: "Refresco", quantity: 2, price: 20 },
                    ],
                    payment: { method: "cash", amount: 200, change: 45 },
                    status: "pending",
                    createdAt: "2024-07-15T12:15",
                },
                {
                    id: 1002,
                    type: "inside",
                    customer: { name: "Familia López" },
                    table: "Mesa 3",
                    items: [
                        { name: "1/2 Kilo de Carnitas", quantity: 1, price: 150 },
                        { name: "Torta Especial", quantity: 2, price: 70 },
                        { name: "Jugo", quantity: 3, price: 25 },
                    ],
                    payment: { method: "transfer", amount: 365 },
                    status: "completed",
                    createdAt: "2024-07-15T13:45",
                },
            ],
        };

        // Inicialización
        document.addEventListener("DOMContentLoaded", function () {
            // Configurar fecha actual
            const now = new Date();
            document.getElementById("currentDate").textContent = now.toLocaleDateString(
                "es-MX",
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );

            // Configurar navegación por pestañas
            setupTabs();

            // Configurar eventos de formularios
            setupFormEvents();

            // Renderizar contenido inicial
            renderMenuItems();
            renderOrders();
        });

        function setupTabs() {
            const tabs = document.querySelectorAll(".nav-tab");
            tabs.forEach((tab) => {
                tab.addEventListener("click", function () {
                    const target = this.getAttribute("data-target");

                    // Desactivar todas las pestañas y secciones
                    tabs.forEach((t) => t.classList.remove("active"));
                    document
                        .querySelectorAll(".section")
                        .forEach((s) => s.classList.remove("active"));

                    // Activar la pestaña y sección seleccionada
                    this.classList.add("active");
                    document.getElementById(target).classList.add("active");
                });
            });
        }

        function setupFormEvents() {
            // Mostrar campo de monto personalizado para carnitas
            document
                .getElementById("carnitas-amount")
                .addEventListener("change", function () {
                    const showCustom = this.value === "custom";
                    document.getElementById("custom-amount-group").style.display = showCustom
                        ? "block"
                        : "none";
                });

            // Mostrar campo de monto en efectivo
            document
                .getElementById("payment-method")
                .addEventListener("change", function () {
                    const showCash = this.value === "cash";
                    document.getElementById("cash-amount-group").style.display = showCash
                        ? "block"
                        : "none";
                });

            // Agregar tacos al pedido
            document.getElementById("add-tacos").addEventListener("click", function () {
                const type = document.getElementById("taco-type").value;
                const quantity = parseInt(document.getElementById("taco-quantity").value);
                const withVeggies = document.getElementById("with-vegetables").checked;

                if (quantity < 1) {
                    showNotification("La cantidad debe ser al menos 1", true);
                    return;
                }

                const tacoTypeNames = {
                    cuerito: "Taco de Cuerito",
                    maciza: "Taco de Maciza",
                    surtida: "Taco de Surtida",
                    buche: "Taco de Buche",
                    nana: "Taco de Nana",
                    chamorro: "Taco de Chamorro",
                    oreja: "Taco de Oreja",
                };

                const itemName = `${tacoTypeNames[type]} ${
                    withVeggies ? "con verdura" : "sin verdura"
                }`;
                addToOrder(itemName, quantity, 15);
            });

            // Agregar tortas al pedido
            document.getElementById("add-tortas").addEventListener("click", function () {
                const type = document.getElementById("torta-type").value;
                const quantity = parseInt(document.getElementById("torta-quantity").value);

                if (quantity < 1) {
                    showNotification("La cantidad debe ser al menos 1", true);
                    return;
                }

                const prices = {
                    simple: 50,
                    especial: 70
                };

                const names = {
                    simple: "Torta Simple",
                    especial: "Torta Especial"
                };

                addToOrder(names[type], quantity, prices[type]);
            });

            // Agregar carnitas al pedido
            document
                .getElementById("add-carnitas")
                .addEventListener("click", function () {
                    const amountType = document.getElementById("carnitas-amount").value;
                    let amount, price, itemName;

                    if (!amountType) {
                        showNotification("Seleccione una cantidad", true);
                        return;
                    }

                    if (amountType === "custom") {
                        amount = parseFloat(document.getElementById("custom-amount").value);
                        if (!amount || amount < 1) {
                            showNotification("El monto debe ser al menos 1 MXN", true);
                            return;
                        }
                        price = amount;
                        itemName = `Carnitas (${amount} MXN)`;
                    } else {
                        const amountNames = {
                            0.25: "1/4 Kilo de Carnitas",
                            0.5: "1/2 Kilo de Carnitas",
                            1: "1 Kilo de Carnitas",
                        };
                        const amountValues = {
                            0.25: 80,
                            0.5: 150,
                            1: 300,
                        };
                        itemName = amountNames[amountType];
                        price = amountValues[amountType];
                        amount = 1;
                    }

                    addToOrder(itemName, amount, price);
                });

            // Agregar bebidas al pedido
            document.getElementById("add-drinks").addEventListener("click", function () {
                const type = document.getElementById("drink-type").value;
                const quantity = parseInt(document.getElementById("drink-quantity").value);

                if (quantity < 1) {
                    showNotification("La cantidad debe ser al menos 1", true);
                    return;
                }

                const prices = {
                    refresco: 20,
                    jugo: 25,
                    agua: 15
                };

                const names = {
                    refresco: "Refresco",
                    jugo: "Jugo",
                    agua: "Agua"
                };

                addToOrder(names[type], quantity, prices[type]);
            });

            // Confirmar pedido
            document
                .getElementById("confirm-order")
                .addEventListener("click", function () {
                    const customerName = document.getElementById("customer-name").value;
                    const address = document.getElementById("delivery-address").value;
                    const deliveryTime = document.getElementById("delivery-time").value;
                    const paymentMethod = document.getElementById("payment-method").value;

                    if (!customerName || !address || !deliveryTime || !paymentMethod) {
                        showNotification(
                            "Por favor complete toda la información requerida",
                            true
                        );
                        return;
                    }

                    if (appState.currentOrder.items.length === 0) {
                        showNotification("Debe agregar al menos un producto al pedido", true);
                        return;
                    }

                    // Calcular total
                    const total = appState.currentOrder.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );

                    // Procesar pago
                    let paymentData = { method: paymentMethod };
                    if (paymentMethod === "cash") {
                        const cashAmount = parseFloat(
                            document.getElementById("cash-amount").value
                        );
                        if (!cashAmount || cashAmount < total) {
                            showNotification(
                                "El monto en efectivo debe ser mayor o igual al total",
                                true
                            );
                            return;
                        }
                        paymentData.amount = cashAmount;
                        paymentData.change = cashAmount - total;
                    }

                    // Crear pedido
                    const newOrder = {
                        id: Date.now(),
                        type: "outside",
                        customer: {
                            name: customerName,
                            phone: document.getElementById("customer-phone").value,
                        },
                        address: address,
                        deliveryTime: deliveryTime,
                        items: [...appState.currentOrder.items],
                        payment: paymentData,
                        status: "pending",
                        createdAt: new Date().toISOString(),
                    };

                    // Agregar a la lista de pedidos
                    appState.orders.push(newOrder);

                    // Limpiar formulario
                    resetOrderForm();

                    // Mostrar confirmación
                    showNotification(`Pedido #${newOrder.id} creado exitosamente`);

                    // Actualizar lista de pedidos
                    renderOrders();
                });

            // Event listeners para filtros
            document.getElementById("category-filter").addEventListener("change", renderMenuItems);
            document.getElementById("status-filter").addEventListener("change", renderOrders);
            document.getElementById("type-filter").addEventListener("change", renderOrders);
        }

        function addToOrder(name, quantity, price) {
            // Verificar si el artículo ya está en el pedido
            const existingItemIndex = appState.currentOrder.items.findIndex(
                (item) => item.name === name
            );

            if (existingItemIndex >= 0) {
                // Actualizar cantidad si ya existe
                appState.currentOrder.items[existingItemIndex].quantity += quantity;
            } else {
                // Agregar nuevo artículo
                appState.currentOrder.items.push({
                    name: name,
                    quantity: quantity,
                    price: price,
                });
            }

            // Actualizar resumen del pedido
            renderOrderSummary();
            
            // Mostrar notificación
            showNotification(`${name} agregado al pedido`);
        }

        function renderOrderSummary() {
            const summaryContainer = document.getElementById("order-summary");
            const totalContainer = document.getElementById("order-total");
            const confirmButton = document.getElementById("confirm-order");

            if (appState.currentOrder.items.length === 0) {
                summaryContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-shopping-cart"></i>
                        <p>No hay productos en el pedido</p>
                    </div>
                `;
                totalContainer.style.display = "none";
                confirmButton.style.display = "none";
                return;
            }

            // Generar HTML para los artículos
            let html = "";
            let total = 0;

            appState.currentOrder.items.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                html += `
                    <div class="order-item">
                        <div>
                            <strong>${item.quantity}x</strong> ${item.name}
                        </div>
                        <div>
                            <strong>${itemTotal.toFixed(2)}</strong>
                            <button class="btn btn-outline btn-small" style="margin-left: 8px;" onclick="removeFromOrder(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
            });

            summaryContainer.innerHTML = html;
            document.getElementById("total-amount").textContent = total.toFixed(2);
            totalContainer.style.display = "block";
            confirmButton.style.display = "block";
        }

        function removeFromOrder(index) {
            appState.currentOrder.items.splice(index, 1);
            renderOrderSummary();
            showNotification("Producto eliminado del pedido");
        }

        function resetOrderForm() {
            // Limpiar formulario
            document.getElementById("customer-name").value = "";
            document.getElementById("customer-phone").value = "";
            document.getElementById("delivery-address").value = "";
            document.getElementById("delivery-reference").value = "";
            document.getElementById("delivery-time").value = "";
            document.getElementById("payment-method").value = "";
            document.getElementById("cash-amount").value = "";
            document.getElementById("cash-amount-group").style.display = "none";
            
            // Reset form fields
            document.getElementById("taco-quantity").value = "1";
            document.getElementById("torta-quantity").value = "1";
            document.getElementById("drink-quantity").value = "1";
            document.getElementById("carnitas-amount").value = "";
            document.getElementById("custom-amount-group").style.display = "none";
            document.getElementById("with-vegetables").checked = false;

            // Limpiar pedido actual
            appState.currentOrder = {
                items: [],
                customer: {},
                payment: {},
            };

            // Actualizar resumen
            renderOrderSummary();
        }

        function renderMenuItems() {
            const menuContainer = document.getElementById("menu-items");
            const categoryFilter = document.getElementById("category-filter").value;

            // Filtrar elementos si es necesario
            let itemsToShow = appState.menu;
            if (categoryFilter !== "all") {
                itemsToShow = appState.menu.filter(
                    (item) => item.category === categoryFilter
                );
            }

            // Generar HTML para los elementos del menú
            let html = "";

            itemsToShow.forEach((item) => {
                html += `
                    <div class="menu-item">
                        <div class="menu-item-header">
                            <span>${item.name}</span>
                            <span class="badge ${item.available ? 'badge-success' : 'badge-error'}">
                                ${item.available ? "Disponible" : "Agotado"}
                            </span>
                        </div>
                        <div class="menu-item-body">
                            <div class="menu-item-price">${item.price.toFixed(2)} MXN</div>
                            <div class="menu-item-actions">
                                <button class="btn btn-outline btn-small" onclick="editMenuItem(${item.id})">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button class="btn btn-small ${item.available ? 'btn-outline' : ''}" 
                                        onclick="toggleMenuItemAvailability(${item.id})"
                                        style="${item.available ? '' : 'background: var(--success); color: white;'}">
                                    <i class="fas ${item.available ? 'fa-times' : 'fa-check'}"></i> 
                                    ${item.available ? 'Deshabilitar' : 'Habilitar'}
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });

            if (html === "") {
                html = `
                    <div class="empty-state">
                        <i class="fas fa-utensils"></i>
                        <p>No hay productos en esta categoría</p>
                    </div>
                `;
            }

            menuContainer.innerHTML = html;
        }

        function renderOrders() {
            const ordersContainer = document.getElementById("orders-container");
            const statusFilter = document.getElementById("status-filter").value;
            const typeFilter = document.getElementById("type-filter").value;

            // Filtrar pedidos según los criterios seleccionados
            let ordersToShow = appState.orders;

            if (statusFilter !== "all") {
                ordersToShow = ordersToShow.filter(
                    (order) => order.status === statusFilter
                );
            }

            if (typeFilter !== "all") {
                ordersToShow = ordersToShow.filter((order) => order.type === typeFilter);
            }

            // Generar HTML para los pedidos
            let html = "";

            if (ordersToShow.length === 0) {
                html = `
                    <div class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <p>No hay pedidos que coincidan con los filtros seleccionados</p>
                    </div>
                `;
            } else {
                ordersToShow.forEach((order) => {
                    // Calcular total del pedido
                    const total = order.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );

                    // Formatear fecha
                    const orderDate = new Date(order.createdAt);
                    const formattedDate = orderDate.toLocaleDateString("es-MX");
                    const formattedTime = orderDate.toLocaleTimeString("es-MX", {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    html += `
                        <div class="order-card">
                            <div class="order-card-header">
                                <div>Pedido #${order.id}</div>
                                <span class="order-status ${order.status === "pending" ? "status-pending" : "status-completed"}">
                                    ${order.status === "pending" ? "Pendiente" : "Completado"}
                                </span>
                            </div>
                            <div class="order-card-body">
                                <div class="order-details">
                                    <p><strong>Cliente:</strong> ${order.customer.name}</p>
                                    ${
                                        order.type === "outside"
                                            ? `<p><strong>Dirección:</strong> ${order.address}</p>
                                             <p><strong>Hora entrega:</strong> ${new Date(order.deliveryTime).toLocaleTimeString("es-MX", {
                                                 hour: "2-digit",
                                                 minute: "2-digit",
                                             })}</p>`
                                            : `<p><strong>Mesa:</strong> ${order.table || "No especificada"}</p>`
                                    }
                                    <p><strong>Fecha:</strong> ${formattedDate} ${formattedTime}</p>
                                    <p><strong>Total:</strong> ${total.toFixed(2)} MXN</p>
                                    <p><strong>Pago:</strong> ${order.payment.method}${
                                        order.payment.change
                                            ? ` (Cambio: ${order.payment.change.toFixed(2)})`
                                            : ""
                                    }</p>
                                </div>
                                <div style="display: flex; gap: 8px; margin-top: 16px;">
                                    ${
                                        order.status === "pending"
                                            ? `<button class="btn btn-small" onclick="completeOrder(${order.id})">
                                                <i class="fas fa-check"></i> Marcar como Completado
                                            </button>`
                                            : ""
                                    }
                                    <button class="btn btn-outline btn-small" onclick="viewOrderDetails(${order.id})">
                                        <i class="fas fa-eye"></i> Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            ordersContainer.innerHTML = html;
        }

        function toggleMenuItemAvailability(id) {
            const itemIndex = appState.menu.findIndex((item) => item.id === id);
            if (itemIndex >= 0) {
                appState.menu[itemIndex].available = !appState.menu[itemIndex].available;
                renderMenuItems();
                showNotification(
                    `Producto ${
                        appState.menu[itemIndex].available ? "habilitado" : "deshabilitado"
                    } correctamente`
                );
            }
        }

        function completeOrder(id) {
            const orderIndex = appState.orders.findIndex((order) => order.id === id);
            if (orderIndex >= 0) {
                appState.orders[orderIndex].status = "completed";
                renderOrders();
                showNotification(`Pedido #${id} marcado como completado`);
            }
        }

        function editMenuItem(id) {
            showNotification("Función de edición en desarrollo", true);
        }

        function viewOrderDetails(id) {
            const order = appState.orders.find(o => o.id === id);
            if (order) {
                let itemsList = order.items.map(item => 
                    `${item.quantity}x ${item.name} - ${(item.price * item.quantity).toFixed(2)}`
                ).join('\n');
                
                alert(`Detalles del Pedido #${id}\n\nProductos:\n${itemsList}\n\nTotal: ${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} MXN`);
            }
        }

        function showNotification(message, isError = false) {
            const notification = document.getElementById("notification");
            const notificationText = document.getElementById("notification-text");

            notificationText.textContent = message;
            notification.className = isError
                ? "notification error show"
                : "notification show";

            // Mostrar la notificación
            notification.classList.add("show");

            // Ocultar la notificación después de 3 segundos
            setTimeout(() => {
                notification.classList.remove("show");
            }, 3000);
        }

        // Funciones adicionales para mejorar la experiencia
        function formatCurrency(amount) {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN'
            }).format(amount);
        }

        function formatDateTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('es-MX', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Agregar funcionalidad de auto-guardado (simulado)
        function autoSave() {
            // En una aplicación real, aquí se guardarían los datos
            console.log('Auto-guardando datos...', appState);
        }

        // Auto-guardar cada 30 segundos
        setInterval(autoSave, 30000);

        // Funciones de utilidad para validación
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validatePhone(phone) {
            const re = /^[\d\s\-\(\)\+]+$/;
            return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
        }

        // Mejorar accesibilidad - navegación por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Cerrar notificaciones con ESC
                const notification = document.getElementById('notification');
                if (notification.classList.contains('show')) {
                    notification.classList.remove('show');
                }
            }
        });

        // Funciones para exportar datos (futuras mejoras)
        function exportOrdersToCSV() {
            showNotification("Función de exportación en desarrollo");
        }

        function printOrder(orderId) {
            showNotification("Función de impresión en desarrollo");
        }

        // Mejorar la experiencia móvil
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        });

        function handleSwipeGesture() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                const tabs = document.querySelectorAll('.nav-tab');
                const activeTab = document.querySelector('.nav-tab.active');
                const currentIndex = Array.from(tabs).indexOf(activeTab);
                
                if (diff > 0 && currentIndex < tabs.length - 1) {
                    // Swipe izquierda - siguiente tab
                    tabs[currentIndex + 1].click();
                } else if (diff < 0 && currentIndex > 0) {
                    // Swipe derecha - tab anterior
                    tabs[currentIndex - 1].click();
                }
            }
        }
    