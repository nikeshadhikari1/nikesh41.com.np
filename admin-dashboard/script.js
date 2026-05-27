// ============================================================
// ADMIN DASHBOARD — Full Functional Application
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

    // ===== SAMPLE DATA (Realistic, Hardcoded) =====
    const allOrders = [
        { id: '#ORD-1001', customer: 'Ram Shrestha', product: 'MacBook Pro 14"', amount: '$1,999', date: 'May 25, 2025', status: 'completed', rawDate: new Date(2025, 4, 25) },
        { id: '#ORD-1002', customer: 'Sita Thapa', product: 'iPhone 15 Pro', amount: '$1,199', date: 'May 24, 2025', status: 'completed', rawDate: new Date(2025, 4, 24) },
        { id: '#ORD-1003', customer: 'Hari Bahadur', product: 'Samsung Galaxy S24', amount: '$899', date: 'May 24, 2025', status: 'pending', rawDate: new Date(2025, 4, 24) },
        { id: '#ORD-1004', customer: 'Gita Poudel', product: 'iPad Air', amount: '$599', date: 'May 23, 2025', status: 'completed', rawDate: new Date(2025, 4, 23) },
        { id: '#ORD-1005', customer: 'Krishna Gurung', product: 'Sony WH-1000XM5', amount: '$349', date: 'May 23, 2025', status: 'cancelled', rawDate: new Date(2025, 4, 23) },
        { id: '#ORD-1006', customer: 'Sunita Tamang', product: 'Dell 27" Monitor', amount: '$449', date: 'May 22, 2025', status: 'completed', rawDate: new Date(2025, 4, 22) },
        { id: '#ORD-1007', customer: 'Bikash Rai', product: 'Logitech MX Master', amount: '$99', date: 'May 22, 2025', status: 'pending', rawDate: new Date(2025, 4, 22) },
        { id: '#ORD-1008', customer: 'Anita Shah', product: 'Mechanical Keyboard', amount: '$159', date: 'May 21, 2025', status: 'completed', rawDate: new Date(2025, 4, 21) },
        { id: '#ORD-1009', customer: 'Deepak Lama', product: 'AirPods Pro', amount: '$249', date: 'May 21, 2025', status: 'completed', rawDate: new Date(2025, 4, 21) },
        { id: '#ORD-1010', customer: 'Sarita Magar', product: 'Apple Watch Series 9', amount: '$499', date: 'May 20, 2025', status: 'pending', rawDate: new Date(2025, 4, 20) },
        { id: '#ORD-1011', customer: 'Rajesh Karki', product: 'MacBook Air M3', amount: '$1,299', date: 'May 20, 2025', status: 'completed', rawDate: new Date(2025, 4, 20) },
        { id: '#ORD-1012', customer: 'Pratima Shrestha', product: 'iPhone 15', amount: '$799', date: 'May 19, 2025', status: 'completed', rawDate: new Date(2025, 4, 19) },
        { id: '#ORD-1013', customer: 'Sanjay Adhikari', product: 'Samsung Tab S9', amount: '$649', date: 'May 19, 2025', status: 'cancelled', rawDate: new Date(2025, 4, 19) },
        { id: '#ORD-1014', customer: 'Manita Bhandari', product: 'Studio Display', amount: '$1,599', date: 'May 18, 2025', status: 'completed', rawDate: new Date(2025, 4, 18) },
        { id: '#ORD-1015', customer: 'Ashok Pandey', product: 'Magic Keyboard', amount: '$199', date: 'May 18, 2025', status: 'pending', rawDate: new Date(2025, 4, 18) },
        { id: '#ORD-1016', customer: 'Kamala Shrestha', product: 'Logitech Webcam', amount: '$79', date: 'May 17, 2025', status: 'completed', rawDate: new Date(2025, 4, 17) },
        { id: '#ORD-1017', customer: 'Binod Thapa', product: 'USB-C Hub', amount: '$59', date: 'May 17, 2025', status: 'completed', rawDate: new Date(2025, 4, 17) },
        { id: '#ORD-1018', customer: 'Srijana Gurung', product: 'Power Bank 20000mAh', amount: '$49', date: 'May 16, 2025', status: 'pending', rawDate: new Date(2025, 4, 16) },
        { id: '#ORD-1019', customer: 'Nabin Rai', product: 'Bluetooth Speaker', amount: '$129', date: 'May 16, 2025', status: 'completed', rawDate: new Date(2025, 4, 16) },
        { id: '#ORD-1020', customer: 'Anju Tamang', product: 'Fitness Tracker', amount: '$149', date: 'May 15, 2025', status: 'completed', rawDate: new Date(2025, 4, 15) },
        { id: '#ORD-1021', customer: 'Roshan Lama', product: 'Gaming Controller', amount: '$69', date: 'May 15, 2025', status: 'cancelled', rawDate: new Date(2025, 4, 15) },
        { id: '#ORD-1022', customer: 'Puja Karki', product: 'iPad Pro 12.9"', amount: '$1,099', date: 'May 14, 2025', status: 'completed', rawDate: new Date(2025, 4, 14) },
        { id: '#ORD-1023', customer: 'Santosh Shah', product: 'Dell XPS 15', amount: '$1,799', date: 'May 14, 2025', status: 'pending', rawDate: new Date(2025, 4, 14) },
        { id: '#ORD-1024', customer: 'Rina Poudel', product: 'AirPods Max', amount: '$549', date: 'May 13, 2025', status: 'completed', rawDate: new Date(2025, 4, 13) },
        { id: '#ORD-1025', customer: 'Dipesh Magar', product: 'Mechanical Keyboard', amount: '$189', date: 'May 13, 2025', status: 'completed', rawDate: new Date(2025, 4, 13) },
        { id: '#ORD-1026', customer: 'Suman Adhikari', product: 'Samsung 49" Ultrawide', amount: '$1,299', date: 'May 12, 2025', status: 'pending', rawDate: new Date(2025, 4, 12) },
        { id: '#ORD-1027', customer: 'Maya Shrestha', product: 'Apple Pencil 2', amount: '$129', date: 'May 12, 2025', status: 'completed', rawDate: new Date(2025, 4, 12) },
        { id: '#ORD-1028', customer: 'Prakash Gurung', product: 'Logitech MX Keys', amount: '$119', date: 'May 11, 2025', status: 'completed', rawDate: new Date(2025, 4, 11) },
        { id: '#ORD-1029', customer: 'Laxmi Thapa', product: 'Webcam 4K', amount: '$199', date: 'May 11, 2025', status: 'cancelled', rawDate: new Date(2025, 4, 11) },
        { id: '#ORD-1030', customer: 'Kiran Rai', product: 'USB Microphone', amount: '$139', date: 'May 10, 2025', status: 'completed', rawDate: new Date(2025, 4, 10) },
    ];

    const allUsers = [
        { id: 1, name: 'Ram Shrestha', email: 'ram.shrestha@email.com', role: 'Admin', status: 'active', joined: 'Jan 15, 2024', rawDate: new Date(2024, 0, 15) },
        { id: 2, name: 'Sita Thapa', email: 'sita.thapa@email.com', role: 'Editor', status: 'active', joined: 'Feb 3, 2024', rawDate: new Date(2024, 1, 3) },
        { id: 3, name: 'Hari Bahadur', email: 'hari.bahadur@email.com', role: 'Viewer', status: 'active', joined: 'Mar 20, 2024', rawDate: new Date(2024, 2, 20) },
        { id: 4, name: 'Gita Poudel', email: 'gita.poudel@email.com', role: 'Moderator', status: 'active', joined: 'Apr 5, 2024', rawDate: new Date(2024, 3, 5) },
        { id: 5, name: 'Krishna Gurung', email: 'krishna.gurung@email.com', role: 'Editor', status: 'inactive', joined: 'May 12, 2024', rawDate: new Date(2024, 4, 12) },
        { id: 6, name: 'Sunita Tamang', email: 'sunita.tamang@email.com', role: 'Viewer', status: 'active', joined: 'Jun 1, 2024', rawDate: new Date(2024, 5, 1) },
        { id: 7, name: 'Bikash Rai', email: 'bikash.rai@email.com', role: 'Admin', status: 'active', joined: 'Jul 18, 2024', rawDate: new Date(2024, 6, 18) },
        { id: 8, name: 'Anita Shah', email: 'anita.shah@email.com', role: 'Editor', status: 'active', joined: 'Aug 22, 2024', rawDate: new Date(2024, 7, 22) },
        { id: 9, name: 'Deepak Lama', email: 'deepak.lama@email.com', role: 'Viewer', status: 'inactive', joined: 'Sep 10, 2024', rawDate: new Date(2024, 8, 10) },
        { id: 10, name: 'Sarita Magar', email: 'sarita.magar@email.com', role: 'Moderator', status: 'active', joined: 'Oct 5, 2024', rawDate: new Date(2024, 9, 5) },
        { id: 11, name: 'Rajesh Karki', email: 'rajesh.karki@email.com', role: 'Editor', status: 'active', joined: 'Nov 14, 2024', rawDate: new Date(2024, 10, 14) },
        { id: 12, name: 'Pratima Shrestha', email: 'pratima.shrestha@email.com', role: 'Viewer', status: 'active', joined: 'Dec 1, 2024', rawDate: new Date(2024, 11, 1) },
        { id: 13, name: 'Sanjay Adhikari', email: 'sanjay.adhikari@email.com', role: 'Admin', status: 'active', joined: 'Jan 8, 2025', rawDate: new Date(2025, 0, 8) },
        { id: 14, name: 'Manita Bhandari', email: 'manita.bhandari@email.com', role: 'Editor', status: 'inactive', joined: 'Feb 20, 2025', rawDate: new Date(2025, 1, 20) },
        { id: 15, name: 'Ashok Pandey', email: 'ashok.pandey@email.com', role: 'Viewer', status: 'active', joined: 'Mar 15, 2025', rawDate: new Date(2025, 2, 15) },
        { id: 16, name: 'Kamala Shrestha', email: 'kamala.shrestha@email.com', role: 'Moderator', status: 'active', joined: 'Apr 2, 2025', rawDate: new Date(2025, 3, 2) },
        { id: 17, name: 'Binod Thapa', email: 'binod.thapa@email.com', role: 'Editor', status: 'active', joined: 'Apr 18, 2025', rawDate: new Date(2025, 3, 18) },
        { id: 18, name: 'Srijana Gurung', email: 'srijana.gurung@email.com', role: 'Viewer', status: 'active', joined: 'May 5, 2025', rawDate: new Date(2025, 4, 5) },
        { id: 19, name: 'Nabin Rai', email: 'nabin.rai@email.com', role: 'Admin', status: 'active', joined: 'May 12, 2025', rawDate: new Date(2025, 4, 12) },
        { id: 20, name: 'Anju Tamang', email: 'anju.tamang@email.com', role: 'Editor', status: 'active', joined: 'May 20, 2025', rawDate: new Date(2025, 4, 20) },
    ];

    // Chart variables (declared early so updateChartsTheme can access them)
    let revenueChart = null, trafficChart = null, monthlyRevenueChart = null;
    let userGrowthChart = null, categoryChart = null, performanceChart = null;

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const html = document.documentElement;

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        if (darkModeSwitch) darkModeSwitch.checked = theme === 'dark';
        updateChartsTheme();
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    if (darkModeSwitch) {
        darkModeSwitch.addEventListener('change', () => {
            setTheme(darkModeSwitch.checked ? 'dark' : 'light');
        });
    }

    // ===== SIDEBAR =====
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const overlay = document.getElementById('overlay');

    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleSidebar);
    sidebarClose.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        notifPanel.classList.remove('active');
        closeAllModals();
    });

    // ===== PAGE NAVIGATION =====
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById('page-' + page).classList.add('active');
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    // ===== NOTIFICATIONS =====
    const notifBtn = document.getElementById('notifBtn');
    const notifPanel = document.getElementById('notifPanel');
    const closeNotif = document.getElementById('closeNotif');

    notifBtn.addEventListener('click', () => {
        notifPanel.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    closeNotif.addEventListener('click', () => {
        notifPanel.classList.remove('active');
        overlay.classList.remove('active');
    });

    // ===== TOAST NOTIFICATIONS =====
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
        toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== MODAL SYSTEM =====
    function createModal(title, content, onConfirm) {
        closeAllModals();
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal glass-card">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">${content}</div>
                <div class="modal-footer">
                    <button class="btn btn-outline-custom modal-cancel">Cancel</button>
                    ${onConfirm ? '<button class="btn btn-primary-custom modal-confirm">Confirm</button>' : ''}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        requestAnimationFrame(() => modal.classList.add('show'));

        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-cancel').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        if (onConfirm) {
            modal.querySelector('.modal-confirm').addEventListener('click', () => {
                onConfirm();
                closeModal();
            });
        }

        return { modal, closeModal };
    }

    function closeAllModals() {
        document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
    }

    function showViewModal(data, type) {
        const rows = type === 'order' ? `
            <div class="modal-detail-row"><span class="detail-label">Order ID</span><span class="detail-value">${data.id}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Customer</span><span class="detail-value">${data.customer}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Product</span><span class="detail-value">${data.product}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Amount</span><span class="detail-value"><strong>${data.amount}</strong></span></div>
            <div class="modal-detail-row"><span class="detail-label">Date</span><span class="detail-value">${data.date}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="status-badge ${data.status}"><span class="status-dot"></span>${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span></span></div>
        ` : `
            <div class="modal-detail-row"><span class="detail-label">ID</span><span class="detail-value">#${data.id}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Name</span><span class="detail-value">${data.name}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Email</span><span class="detail-value">${data.email}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Role</span><span class="detail-value">${data.role}</span></div>
            <div class="modal-detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="status-badge ${data.status}"><span class="status-dot"></span>${data.status.charAt(0).toUpperCase() + data.status.slice(1)}</span></span></div>
            <div class="modal-detail-row"><span class="detail-label">Joined</span><span class="detail-value">${data.joined}</span></div>
        `;
        createModal(type === 'order' ? 'Order Details' : 'User Details', rows);
    }

    function showEditModal(data, type, onSave) {
        const form = type === 'order' ? `
            <div class="modal-form-group">
                <label>Customer</label>
                <input type="text" class="form-control glass-input" id="editCustomer" value="${data.customer}">
            </div>
            <div class="modal-form-group">
                <label>Product</label>
                <input type="text" class="form-control glass-input" id="editProduct" value="${data.product}">
            </div>
            <div class="modal-form-group">
                <label>Amount</label>
                <input type="text" class="form-control glass-input" id="editAmount" value="${data.amount}">
            </div>
            <div class="modal-form-group">
                <label>Status</label>
                <select class="form-select glass-input" id="editStatus">
                    <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="pending" ${data.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="cancelled" ${data.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </div>
        ` : `
            <div class="modal-form-group">
                <label>Name</label>
                <input type="text" class="form-control glass-input" id="editName" value="${data.name}">
            </div>
            <div class="modal-form-group">
                <label>Email</label>
                <input type="email" class="form-control glass-input" id="editEmail" value="${data.email}">
            </div>
            <div class="modal-form-group">
                <label>Role</label>
                <select class="form-select glass-input" id="editRole">
                    <option value="Admin" ${data.role === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="Editor" ${data.role === 'Editor' ? 'selected' : ''}>Editor</option>
                    <option value="Viewer" ${data.role === 'Viewer' ? 'selected' : ''}>Viewer</option>
                    <option value="Moderator" ${data.role === 'Moderator' ? 'selected' : ''}>Moderator</option>
                </select>
            </div>
            <div class="modal-form-group">
                <label>Status</label>
                <select class="form-select glass-input" id="editUserStatus">
                    <option value="active" ${data.status === 'active' ? 'selected' : ''}>Active</option>
                    <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                </select>
            </div>
        `;

        createModal('Edit ' + (type === 'order' ? 'Order' : 'User'), form, () => {
            if (type === 'order') {
                data.customer = document.getElementById('editCustomer').value;
                data.product = document.getElementById('editProduct').value;
                data.amount = document.getElementById('editAmount').value;
                data.status = document.getElementById('editStatus').value;
            } else {
                data.name = document.getElementById('editName').value;
                data.email = document.getElementById('editEmail').value;
                data.role = document.getElementById('editRole').value;
                data.status = document.getElementById('editUserStatus').value;
            }
            onSave();
            showToast(`${type === 'order' ? 'Order' : 'User'} updated successfully`);
        });
    }

    function showDeleteConfirm(name, onConfirm) {
        createModal('Delete Confirmation',
            `<p style="color:var(--text-secondary);font-size:14px;">Are you sure you want to delete <strong>${name}</strong>? This action cannot be undone.</p>`,
            () => { onConfirm(); showToast(`${name} deleted`, 'warning'); }
        );
    }

    function showAddUserModal() {
        const form = `
            <div class="modal-form-group">
                <label>Full Name</label>
                <input type="text" class="form-control glass-input" id="newUserName" placeholder="Enter full name">
            </div>
            <div class="modal-form-group">
                <label>Email</label>
                <input type="email" class="form-control glass-input" id="newUserEmail" placeholder="Enter email address">
            </div>
            <div class="modal-form-group">
                <label>Role</label>
                <select class="form-select glass-input" id="newUserRole">
                    <option value="Viewer">Viewer</option>
                    <option value="Editor">Editor</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
        `;

        createModal('Add New User', form, () => {
            const name = document.getElementById('newUserName').value.trim();
            const email = document.getElementById('newUserEmail').value.trim();
            const role = document.getElementById('newUserRole').value;

            if (!name || !email) {
                showToast('Please fill in all fields', 'error');
                return;
            }

            const newUser = {
                id: allUsers.length + 1,
                name,
                email,
                role,
                status: 'active',
                joined: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                rawDate: new Date()
            };

            allUsers.unshift(newUser);
            usersTable.refresh();
            dashboardUsersTable.refresh();
            showToast(`User "${name}" added successfully`);
        });
    }

    // ===== ANIMATED COUNTERS =====
    function animateCounter(element, target, prefix = '', suffix = '') {
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);

            if (target >= 1000) {
                element.textContent = prefix + current.toLocaleString() + suffix;
            } else {
                element.textContent = prefix + current + suffix;
            }

            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    setTimeout(() => {
        animateCounter(document.getElementById('revenueValue'), 48750, '$');
        animateCounter(document.getElementById('ordersValue'), allOrders.length);
        animateCounter(document.getElementById('usersValue'), allUsers.filter(u => u.status === 'active').length);
        animateCounter(document.getElementById('trafficValue'), 24680);
    }, 300);

    // ===== CHARTS =====
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = [12000, 19000, 15000, 22000, 18000, 25000, 28000, 24000, 30000, 35000, 32000, 42000];
    const usersData = [40, 65, 55, 80, 70, 95, 110, 100, 130, 150, 140, 180];

    function getChartColors() {
        const isDark = html.getAttribute('data-theme') === 'dark';
        return {
            gridColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            textColor: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
        };
    }

    function createCharts() {
        const colors = getChartColors();

        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueGradient = revenueCtx.createLinearGradient(0, 0, 0, 300);
        revenueGradient.addColorStop(0, 'rgba(108, 99, 255, 0.3)');
        revenueGradient.addColorStop(1, 'rgba(108, 99, 255, 0)');

        revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#6c63ff',
                    backgroundColor: revenueGradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#6c63ff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#6c63ff',
                    pointHoverBorderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        grid: { color: colors.gridColor },
                        ticks: { color: colors.textColor, font: { size: 11 } }
                    },
                    y: {
                        grid: { color: colors.gridColor },
                        ticks: {
                            color: colors.textColor,
                            font: { size: 11 },
                            callback: v => '$' + (v / 1000) + 'k'
                        }
                    }
                },
                interaction: { intersect: false, mode: 'index' }
            }
        });

        // Traffic Doughnut
        trafficChart = new Chart(document.getElementById('trafficChart'), {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Organic', 'Referral', 'Social'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: ['#6c63ff', '#00d4aa', '#ff6b6b', '#ffa726'],
                    borderWidth: 0,
                    hoverOffset: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: colors.textColor, padding: 16, usePointStyle: true, pointStyleWidth: 10, font: { size: 12 } }
                    }
                }
            }
        });

        // Monthly Revenue Bar
        const monthlyCtx = document.getElementById('monthlyRevenueChart');
        if (monthlyCtx) {
            monthlyRevenueChart = new Chart(monthlyCtx, {
                type: 'bar',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Revenue',
                        data: revenueData,
                        backgroundColor: 'rgba(108, 99, 255, 0.6)',
                        borderRadius: 8,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: colors.textColor } },
                        y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor, callback: v => '$' + (v / 1000) + 'k' } }
                    }
                }
            });
        }

        // User Growth
        const userGrowthCtx = document.getElementById('userGrowthChart');
        if (userGrowthCtx) {
            const userGradient = userGrowthCtx.getContext('2d').createLinearGradient(0, 0, 0, 300);
            userGradient.addColorStop(0, 'rgba(0, 212, 170, 0.3)');
            userGradient.addColorStop(1, 'rgba(0, 212, 170, 0)');

            userGrowthChart = new Chart(userGrowthCtx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Users',
                        data: usersData,
                        borderColor: '#00d4aa',
                        backgroundColor: userGradient,
                        fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 6,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: colors.textColor } },
                        y: { grid: { color: colors.gridColor }, ticks: { color: colors.textColor } }
                    }
                }
            });
        }

        // Category Polar
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            categoryChart = new Chart(categoryCtx, {
                type: 'polarArea',
                data: {
                    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'],
                    datasets: [{
                        data: [300, 200, 150, 100, 80],
                        backgroundColor: ['rgba(108,99,255,0.6)', 'rgba(0,212,170,0.6)', 'rgba(255,107,107,0.6)', 'rgba(255,167,38,0.6)', 'rgba(168,85,247,0.6)'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: colors.textColor, padding: 12, font: { size: 11 } } } },
                    scales: { r: { grid: { color: colors.gridColor }, ticks: { display: false } } }
                }
            });
        }

        // Performance Radar
        const perfCtx = document.getElementById('performanceChart');
        if (perfCtx) {
            performanceChart = new Chart(perfCtx, {
                type: 'radar',
                data: {
                    labels: ['Speed', 'Reliability', 'UX', 'Security', 'Scalability', 'Performance'],
                    datasets: [{
                        label: 'Current', data: [85, 90, 80, 95, 75, 88],
                        borderColor: '#6c63ff', backgroundColor: 'rgba(108,99,255,0.15)', pointBackgroundColor: '#6c63ff', borderWidth: 2,
                    }, {
                        label: 'Target', data: [95, 95, 90, 98, 90, 95],
                        borderColor: '#00d4aa', backgroundColor: 'rgba(0,212,170,0.1)', pointBackgroundColor: '#00d4aa', borderWidth: 2,
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: colors.textColor, font: { size: 12 } } } },
                    scales: { r: { grid: { color: colors.gridColor }, angleLines: { color: colors.gridColor }, ticks: { display: false }, suggestedMin: 0, suggestedMax: 100 } }
                }
            });
        }
    }

    function updateChartsTheme() {
        const colors = getChartColors();
        [revenueChart, monthlyRevenueChart, userGrowthChart].forEach(chart => {
            if (!chart) return;
            if (chart.options.scales.x) { chart.options.scales.x.grid.color = colors.gridColor; chart.options.scales.x.ticks.color = colors.textColor; }
            if (chart.options.scales.y) { chart.options.scales.y.grid.color = colors.gridColor; chart.options.scales.y.ticks.color = colors.textColor; }
            chart.update('none');
        });
        [trafficChart, categoryChart].forEach(chart => {
            if (!chart) return;
            if (chart.options.plugins.legend) chart.options.plugins.legend.labels.color = colors.textColor;
            if (chart.options.scales?.r) chart.options.scales.r.grid.color = colors.gridColor;
            chart.update('none');
        });
        if (performanceChart) {
            performanceChart.options.scales.r.grid.color = colors.gridColor;
            performanceChart.options.scales.r.angleLines.color = colors.gridColor;
            performanceChart.options.plugins.legend.labels.color = colors.textColor;
            performanceChart.update('none');
        }
    }

    document.querySelectorAll('.chart-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tab.closest('.chart-tabs').querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            if (revenueChart) { revenueChart.config.type = tab.dataset.type; revenueChart.update(); }
        });
    });

    createCharts();

    // ===== DATA TABLE CLASS =====
    class DataTable {
        constructor(config) {
            this.data = config.data;
            this.filteredData = [...this.data];
            this.tbody = document.getElementById(config.tbodyId);
            this.searchInput = document.getElementById(config.searchInputId);
            this.paginationEl = document.getElementById(config.paginationId);
            this.infoEl = document.getElementById(config.infoId);
            this.tableEl = document.getElementById(config.tableId);
            this.pageSize = config.pageSize || 10;
            this.currentPage = 1;
            this.sortColumn = null;
            this.sortDir = 'asc';
            this.renderRow = config.renderRow;
            this.statusFilter = config.statusFilterId ? document.getElementById(config.statusFilterId) : null;
            this.init();
        }

        init() {
            if (this.searchInput) {
                this.searchInput.addEventListener('input', () => { this.currentPage = 1; this.applyFilters(); });
            }
            if (this.statusFilter) {
                this.statusFilter.addEventListener('change', () => { this.currentPage = 1; this.applyFilters(); });
            }
            if (this.tableEl) {
                this.tableEl.querySelectorAll('th[data-sort]').forEach(th => {
                    th.addEventListener('click', () => {
                        const col = th.dataset.sort;
                        if (this.sortColumn === col) { this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; }
                        else { this.sortColumn = col; this.sortDir = 'asc'; }
                        this.tableEl.querySelectorAll('th').forEach(t => t.classList.remove('sort-asc', 'sort-desc'));
                        th.classList.add(this.sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
                        this.applyFilters();
                    });
                });
            }
            this.render();
        }

        applyFilters() {
            let data = [...this.data];
            const query = this.searchInput ? this.searchInput.value.toLowerCase() : '';
            const statusVal = this.statusFilter ? this.statusFilter.value : 'all';

            if (query) {
                data = data.filter(row => Object.values(row).some(val => String(val).toLowerCase().includes(query)));
            }
            if (statusVal !== 'all') {
                data = data.filter(row => row.status === statusVal);
            }
            if (this.sortColumn) {
                data.sort((a, b) => {
                    let va = a[this.sortColumn], vb = b[this.sortColumn];
                    if (this.sortColumn === 'amount') { va = parseFloat(String(va).replace(/[^0-9.]/g, '')); vb = parseFloat(String(vb).replace(/[^0-9.]/g, '')); }
                    else if (this.sortColumn === 'id') { va = typeof va === 'number' ? va : parseInt(String(va).replace(/\D/g, '')); vb = typeof vb === 'number' ? vb : parseInt(String(vb).replace(/\D/g, '')); }
                    else { va = String(va).toLowerCase(); vb = String(vb).toLowerCase(); }
                    if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
                    if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
                    return 0;
                });
            }
            this.filteredData = data;
            this.render();
        }

        render() {
            const totalPages = Math.ceil(this.filteredData.length / this.pageSize);
            if (this.currentPage > totalPages) this.currentPage = totalPages || 1;
            const start = (this.currentPage - 1) * this.pageSize;
            const pageData = this.filteredData.slice(start, start + this.pageSize);

            this.tbody.innerHTML = pageData.map(row => this.renderRow(row)).join('');

            const end = Math.min(start + this.pageSize, this.filteredData.length);
            if (this.infoEl) {
                this.infoEl.textContent = this.filteredData.length === 0 ? 'No entries found' : `Showing ${start + 1}-${end} of ${this.filteredData.length} entries`;
            }

            if (this.paginationEl) {
                let html = '';
                html += `<button class="page-btn" ${this.currentPage <= 1 ? 'disabled' : ''} data-page="${this.currentPage - 1}"><i class="fas fa-chevron-left"></i></button>`;
                for (let i = 1; i <= totalPages; i++) {
                    if (totalPages > 7) {
                        if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                            html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
                        } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                            html += `<span style="color:var(--text-muted);padding:0 4px;">...</span>`;
                        }
                    } else {
                        html += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
                    }
                }
                html += `<button class="page-btn" ${this.currentPage >= totalPages ? 'disabled' : ''} data-page="${this.currentPage + 1}"><i class="fas fa-chevron-right"></i></button>`;
                this.paginationEl.innerHTML = html;

                this.paginationEl.querySelectorAll('.page-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const page = parseInt(btn.dataset.page);
                        if (page >= 1 && page <= totalPages) { this.currentPage = page; this.render(); }
                    });
                });
            }
        }

        refresh() {
            this.filteredData = [...this.data];
            this.currentPage = 1;
            this.sortColumn = null;
            this.sortDir = 'asc';
            if (this.searchInput) this.searchInput.value = '';
            if (this.statusFilter) this.statusFilter.value = 'all';
            this.tableEl.querySelectorAll('th').forEach(t => t.classList.remove('sort-asc', 'sort-desc'));
            this.render();
        }
    }

    // ===== ROW RENDERERS =====
    function renderOrderRow(order) {
        return `<tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td><strong>${order.amount}</strong></td>
            <td>${order.date}</td>
            <td><span class="status-badge ${order.status}"><span class="status-dot"></span>${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
        </tr>`;
    }

    function renderOrderRowWithActions(order) {
        return `<tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td><strong>${order.amount}</strong></td>
            <td>${order.date}</td>
            <td><span class="status-badge ${order.status}"><span class="status-dot"></span>${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td>
                <button class="action-btn view-order" data-id="${order.id}" title="View"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit-order" data-id="${order.id}" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete delete-order" data-id="${order.id}" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
    }

    function renderUserRow(user) {
        return `<tr>
            <td>#${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${user.status}"><span class="status-dot"></span>${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>${user.joined}</td>
        </tr>`;
    }

    function renderUserRowWithActions(user) {
        return `<tr>
            <td>#${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge ${user.status}"><span class="status-dot"></span>${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>${user.joined}</td>
            <td>
                <button class="action-btn view-user" data-id="${user.id}" title="View"><i class="fas fa-eye"></i></button>
                <button class="action-btn edit-user" data-id="${user.id}" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete delete-user" data-id="${user.id}" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
        </tr>`;
    }

    // ===== INIT TABLES =====
    const dashboardOrdersTable = new DataTable({
        data: allOrders.slice(0, 15),
        tbodyId: 'ordersBody',
        searchInputId: 'orderSearch',
        paginationId: 'ordersPagination',
        infoId: 'tableInfo',
        tableId: 'ordersTable',
        pageSize: 5,
        renderRow: renderOrderRow
    });

    const dashboardUsersTable = new DataTable({
        data: allUsers.slice(0, 15),
        tbodyId: 'usersBody',
        searchInputId: 'userSearch',
        paginationId: 'usersPagination',
        infoId: 'usersTableInfo',
        tableId: 'usersTable',
        pageSize: 5,
        renderRow: renderUserRow
    });

    const ordersTable = new DataTable({
        data: allOrders,
        tbodyId: 'allOrdersBody',
        searchInputId: 'allOrderSearch',
        paginationId: 'allOrdersPagination',
        infoId: 'allOrdersInfo',
        tableId: 'allOrdersTable',
        pageSize: 10,
        renderRow: renderOrderRowWithActions,
        statusFilterId: 'statusFilter'
    });

    const usersTable = new DataTable({
        data: allUsers,
        tbodyId: 'allUsersBody',
        searchInputId: 'allUserSearch',
        paginationId: 'allUsersPagination',
        infoId: 'allUsersInfo',
        tableId: 'allUsersTable',
        pageSize: 10,
        renderRow: renderUserRowWithActions
    });

    // ===== DELEGATED EVENT HANDLERS FOR TABLE ACTIONS =====
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.action-btn');
        if (!btn) return;

        const id = btn.dataset.id;

        // Order actions
        if (btn.classList.contains('view-order')) {
            const order = allOrders.find(o => o.id === id);
            if (order) showViewModal(order, 'order');
        }
        if (btn.classList.contains('edit-order')) {
            const order = allOrders.find(o => o.id === id);
            if (order) showEditModal(order, 'order', () => { ordersTable.render(); });
        }
        if (btn.classList.contains('delete-order')) {
            const order = allOrders.find(o => o.id === id);
            if (order) showDeleteConfirm(`${order.id} - ${order.customer}`, () => {
                const idx = allOrders.indexOf(order);
                if (idx > -1) allOrders.splice(idx, 1);
                ordersTable.refresh();
            });
        }

        // User actions
        if (btn.classList.contains('view-user')) {
            const user = allUsers.find(u => u.id === parseInt(id));
            if (user) showViewModal(user, 'user');
        }
        if (btn.classList.contains('edit-user')) {
            const user = allUsers.find(u => u.id === parseInt(id));
            if (user) showEditModal(user, 'user', () => { usersTable.render(); dashboardUsersTable.render(); });
        }
        if (btn.classList.contains('delete-user')) {
            const user = allUsers.find(u => u.id === parseInt(id));
            if (user) showDeleteConfirm(user.name, () => {
                const idx = allUsers.indexOf(user);
                if (idx > -1) allUsers.splice(idx, 1);
                usersTable.refresh();
                dashboardUsersTable.refresh();
            });
        }
    });

    // ===== ADD USER BUTTON =====
    document.querySelectorAll('.btn-primary-custom').forEach(btn => {
        if (btn.textContent.includes('Add User')) {
            btn.addEventListener('click', showAddUserModal);
        }
    });

    // ===== PRODUCTS =====
    const productsList = [
        { icon: 'fas fa-laptop', name: 'MacBook Pro 14"', desc: 'M3 Pro chip, 18GB RAM', price: '$1,999', stock: 24 },
        { icon: 'fas fa-mobile-alt', name: 'iPhone 15 Pro', desc: '256GB, Titanium', price: '$1,199', stock: 58 },
        { icon: 'fas fa-headphones', name: 'AirPods Pro', desc: 'USB-C, Active Noise Canceling', price: '$249', stock: 120 },
        { icon: 'fas fa-tablet-alt', name: 'iPad Air', desc: 'M1 chip, 64GB', price: '$599', stock: 35 },
        { icon: 'fas fa-clock', name: 'Apple Watch', desc: 'Series 9, GPS + Cellular', price: '$499', stock: 42 },
        { icon: 'fas fa-keyboard', name: 'Magic Keyboard', desc: 'Touch ID, Numeric Keypad', price: '$199', stock: 67 },
        { icon: 'fas fa-mouse', name: 'Magic Mouse', desc: 'USB-C, Multi-Touch', price: '$99', stock: 89 },
        { icon: 'fas fa-tv', name: 'Studio Display', desc: '27-inch 5K Retina', price: '$1,599', stock: 12 },
    ];

    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = productsList.map(p => `
            <div class="product-card glass-card animate-in">
                <div class="product-icon"><i class="${p.icon}"></i></div>
                <h4>${p.name}</h4>
                <p>${p.desc}</p>
                <div class="product-meta">
                    <span class="product-price">${p.price}</span>
                    <span class="product-stock">${p.stock} in stock</span>
                </div>
            </div>
        `).join('');
    }

    // ===== REFRESH BUTTON =====
    const refreshBtn = document.getElementById('refreshOrders');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.querySelector('i').style.animation = 'spin 0.5s linear';
            ordersTable.refresh();
            setTimeout(() => { refreshBtn.querySelector('i').style.animation = ''; }, 500);
            showToast('Orders refreshed');
        });
    }

    // ===== EXPORT BUTTON =====
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            let csv = 'Order ID,Customer,Product,Amount,Date,Status\n';
            allOrders.forEach(o => {
                csv += `${o.id},${o.customer},${o.product},${o.amount},${o.date},${o.status}\n`;
            });
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'orders-export.csv';
            a.click();
            URL.revokeObjectURL(url);
            showToast('Orders exported as CSV');
        });
    }

    // ===== SETTINGS SAVE =====
    const settingsSaveBtn = document.querySelector('.settings-card .btn-primary-custom');
    if (settingsSaveBtn) {
        settingsSaveBtn.addEventListener('click', () => {
            showToast('Settings saved successfully');
        });
    }

    // ===== ANIMATIONS =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);

});
