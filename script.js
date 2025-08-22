// وظيفة لإنشاء هوية مستخدم عشوائية
function generateUserId() {
    return Math.floor(100000 + Math.random() * 900000);
}

// وظيفة لعرض الإشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// إعداد النوافذ المنبثقة للرصيد والأرباح
function setupMainPageModals() {
    // نافذة رصيدك
    const balanceCard = document.querySelector('.stat-card:nth-child(1)');
    if (balanceCard) {
        balanceCard.addEventListener('click', () => {
            showNotification('رصيدك الحالي: 0.00$ - قم بالإيداع لزيادة رصيدك', 'info');
        });
    }
    
    // نافذة أرباح اليوم
    const earningsCard = document.querySelector('.stat-card:nth-child(2)');
    if (earningsCard) {
        earningsCard.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>أرباح اليوم</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>يمكنك زيادة أرباحك اليومية من خلال:</p>
                        <ul>
                            <li>الاشتراك في إحدى خطط VIP</li>
                            <li>إكمال المهام اليومية</li>
                            <li>دعوة الأصدقاء</li>
                            <li>مشاهدة الإعلانات</li>
                        </ul>
                        <button class="view-vip-plans">عرض خطط VIP</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            const viewVipBtn = modal.querySelector('.view-vip-plans');
            viewVipBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                document.querySelector('.nav-item[data-target="vip"]').click();
            });
        });
    }
    
    // نافذة أعضاء الفريق
    const teamCard = document.querySelector('.stat-card:nth-child(3)');
    if (teamCard) {
        teamCard.addEventListener('click', () => {
            const referralCode = generateReferralCode();
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>أعضاء فريقك</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>كود الإحالة الخاص بك: <strong>${referralCode}</strong></p>
                        <button class="copy-referral">نسخ الكود</button>
                        <p class="vip-message">سيتاح لك دعوة الأصدقاء بعد الاشتراك في إحدى خطط VIP</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            const copyBtn = modal.querySelector('.copy-referral');
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(referralCode);
                showNotification('تم نسخ كود الإحالة', 'success');
            });
        });
    }
}

// وظيفة لإنشاء كود إحالة
function generateReferralCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// زيادة الأرباح في خطط VIP من 5 إلى 20
function updateVipPlans() {
    const vipPlans = [
        // ... (خطط VIP الحالية) ...
    ];
    
    // زيادة الأرباح من VIP5 إلى VIP20
    for (let i = 4; i < vipPlans.length; i++) {
        // زيادة الأرباح بمقدار 1 دولار لكل مستوى
        const increase = (i - 3) * 1;
        
        // تحديث الأرباح
        vipPlans[i].dailyProfit = `${parseFloat(vipPlans[i].dailyProfit) + increase}$`;
        vipPlans[i].friendProfit = `${parseFloat(vipPlans[i].friendProfit) + increase}$`;
        vipPlans[i].taskBonus = `${parseFloat(vipPlans[i].taskBonus) + increase}$`;
        
        if (vipPlans[i].loginBonus !== '0.00$') {
            vipPlans[i].loginBonus = `${parseFloat(vipPlans[i].loginBonus) + increase}$`;
        }
    }
    
    return vipPlans;
}

// إعداد زر دعوة الأصدقاء
function setupInviteButton() {
    const inviteBtn = document.createElement('button');
    inviteBtn.className = 'invite-friends-btn';
    inviteBtn.innerHTML = '<i class="fas fa-user-friends"></i> دعوة الأصدقاء';
    
    inviteBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>دعوة الأصدقاء</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <p>هذه الميزة متاحة فقط للأعضاء المشتركين في خطط VIP</p>
                    <p>اشترك الآن للاستفادة من ميزة دعوة الأصدقاء والحصول على عمولة تصل إلى 26%</p>
                    <button class="view-vip-plans">عرض خطط VIP</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        const viewVipBtn = modal.querySelector('.view-vip-plans');
        viewVipBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.querySelector('.nav-item[data-target="vip"]').click();
        });
    });
    
    // إضافة الزر إلى الواجهة الرئيسية
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.appendChild(inviteBtn);
    }
}

// تهيئة كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // ... (الكود الحالي) ...
    
    // إضافة الميزات الجديدة
    setupMainPageModals();
    setupInviteButton();
    
    // تحديث خطط VIP
    updateVipPlans();
    
    // إعداد السجل الفارغ
    const depositHistoryBtn = document.querySelector('.action-btn:nth-child(2)');
    if (depositHistoryBtn) {
        depositHistoryBtn.addEventListener('click', () => {
            showNotification('سجل الإيداعات فارغ حالياً', 'info');
        });
    }
    
    // إعداد الإعدادات
    const settingsBtn = document.querySelector('.action-btn:nth-child(3)');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>الإعدادات</h2>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="settings-form">
                            <div class="input-group">
                                <label>اسم المستخدم:</label>
                                <input type="text" value="مستخدم جديد">
                            </div>
                            <div class="input-group">
                                <label>البريد الإلكتروني:</label>
                                <input type="email" value="example@email.com">
                            </div>
                            <div class="input-group">
                                <label>كلمة المرور الجديدة:</label>
                                <input type="password" placeholder="أدخل كلمة المرور الجديدة">
                            </div>
                            <div class="input-group">
                                <label>تأكيد كلمة المرور:</label>
                                <input type="password" placeholder="أكد كلمة المرور الجديدة">
                            </div>
                            <button type="submit" class="save-settings">حفظ التغييرات</button>
                        </form>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            const form = modal.querySelector('.settings-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showNotification('تم حفظ التغييرات بنجاح', 'success');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 2000);
            });
        });
    }
});
