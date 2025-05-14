
            document.addEventListener("DOMContentLoaded", function () {
                const submitButton = document.querySelector(".btn-primary");
                const tableBody = document.querySelector("table tbody");
                const serviceSelect = document.getElementById("service");
                const servicePriceInput = document.getElementById("servicePrice");
                const checkboxes = ["swimwear", "floatie", "goggles"];
                const subtotalInput = document.getElementById("subtotal");
                const totalInput = document.getElementById("total");
                const discountRadios = document.getElementsByName("discount");
                const validationMsg = document.querySelector(".validation-message");
        
                const itemPrices = {
                    swimwear: 10000,
                    floatie: 5000,
                    goggles: 7000
                };
        
                const servicePrices = {
                    game: 30000,
                    swimming: 25000,
                    gym: 15000
                };
        
                // Gán giá khi chọn dịch vụ
                serviceSelect.addEventListener("change", function () {
                    const selectedValue = this.value;
                    servicePriceInput.value = servicePrices[selectedValue];
                    calculateTotal();
                });
        
                // Tính tiền đồ dùng khi chọn checkbox
                checkboxes.forEach(id => {
                    document.getElementById(id).addEventListener("change", calculateTotal);
                });
        
                // Tính lại khi chọn ngày giảm trừ
                discountRadios.forEach(radio => {
                    radio.addEventListener("change", calculateTotal);
                });
        
                function calculateTotal() {
                    let subtotal = 0;
                    checkboxes.forEach(id => {
                        const checkbox = document.getElementById(id);
                        if (checkbox.checked) {
                            subtotal += itemPrices[id];
                        }
                    });
                    subtotalInput.value = subtotal;
        
                    const servicePrice = parseInt(servicePriceInput.value || 0);
                    let discount = 0;
                    if (document.getElementById("weekday").checked) discount = 7000;
                    if (document.getElementById("weekend").checked) discount = 1000;
        
                    const total = servicePrice + subtotal - discount;
                    totalInput.value = total;
                }
        
                function validateInputs(studentId, fullName, address) {
                    const idPattern = /^FIT-\d{6}$/;
                    const namePattern = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/;
                    const addressPattern = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/;
        
                    if (!idPattern.test(studentId)) {
                        alert("Mã học viên phải theo mẫu FIT-123456");
                        return false;
                    }
        
                    if (!namePattern.test(fullName)) {
                        alert("Họ tên phải theo mẫu: Tran Anh Hung (viết hoa chữ cái đầu)");
                        return false;
                    }
        
                    if (!addressPattern.test(address)) {
                        validationMsg.style.display = "block";
                        return false;
                    } else {
                        validationMsg.style.display = "none";
                    }
        
                    return true;
                }
        
                submitButton.addEventListener("click", function () {
                    const studentId = document.getElementById("studentId").value.trim();
                    const fullName = document.getElementById("fullName").value.trim();
                    const address = document.getElementById("address").value.trim();
                    const servicePrice = servicePriceInput.value;
                    const subtotal = subtotalInput.value;
                    const total = totalInput.value;
        
                    if (!validateInputs(studentId, fullName, address)) return;
        
                    const newRow = document.createElement("tr");
                    newRow.innerHTML = `
                        <td>${tableBody.children.length + 1}</td>
                        <td>${studentId}</td>
                        <td>${fullName}</td>
                        <td>${address}</td>
                        <td>${servicePrice}</td>
                        <td>${subtotal}</td>
                        <td>${total}</td>
                    `;
                    tableBody.appendChild(newRow);
        
                    const modal = bootstrap.Modal.getInstance(document.getElementById("modalId"));
                    modal.hide();
                });
            });