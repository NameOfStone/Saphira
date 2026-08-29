/* ================================================================
   متغیرهای تم و ریست
   ================================================================ */
:root {
  --bg-color: #f5f7fc;
  --card-bg: rgba(255, 255, 255, 0.92);
  --text-color: #1e2a3a;
  --border-color: #d0d7e0;
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-bg: #f1f4f9;
  --warning-bg: #fff8e7;
  --warning-border: #fbbf24;
  --result-bg: #eff6ff;
  --dose-bg: #fef9e7;
  --note-bg: #f3f4f6;
  --highlight-color: #d9480f;
  --shadow: 0 12px 30px rgba(0, 0, 0, 0.10);
  --radius: 16px;
  --transition: 0.25s ease;
}

body[data-theme="dark"] {
  --bg-color: #0f111a;
  --card-bg: rgba(23, 27, 38, 0.96);
  --text-color: #e8edf5;
  --border-color: #2d3442;
  --primary-color: #4d8cf7;
  --primary-hover: #5f9aff;
  --secondary-bg: #1e2332;
  --warning-bg: #3d3520;
  --warning-border: #f59e0b;
  --result-bg: #1e2a3a;
  --dose-bg: #3d3520;
  --note-bg: #1e2332;
  --highlight-color: #fbbf24;
  --shadow: 0 12px 30px rgba(0, 0, 0, 0.60);
}

/* ================================================================
   پایه
   ================================================================ */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Vazirmatn", system-ui, -apple-system, sans-serif;
  background: radial-gradient(circle at 20% 30%, #f0f4fe 0%, #dce3f0 100%);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 10px 20px;
  transition: background var(--transition), color var(--transition);
  position: relative;
}

body[data-theme="dark"] {
  background: radial-gradient(circle at 20% 30%, #0b0e16 0%, #03050b 100%);
}

/* ================================================================
   پس‌زمینه‌ها
   ================================================================ */
#sceneBg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  pointer-events: none;
  z-index: 0;
  opacity: 0.22;
}
body[data-theme="dark"] #sceneBg {
  opacity: 0.30;
}

.bg-grain {
  pointer-events: none;
  position: fixed;
  inset: 0;
  mix-blend-mode: soft-light;
  opacity: 0.12;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  z-index: 0;
}
body[data-theme="dark"] .bg-grain {
  opacity: 0.20;
}

/* ================================================================
   نوار بالا
   ================================================================ */
.top-bar {
  width: 100%;
  max-width: 1000px;
  margin-top: 6px;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.header-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-title {
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 700;
  color: var(--text-color);
  background: var(--card-bg);
  padding: 6px 14px;
  border-radius: 40px;
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  white-space: nowrap;
}
.top-title i {
  margin-left: 6px;
  color: var(--primary-color);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.theme-toggle input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.theme-icon {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  transition: background var(--transition), transform 0.15s, border-color var(--transition);
  backdrop-filter: blur(4px);
}
.theme-toggle:hover .theme-icon {
  transform: scale(1.05);
  background: var(--secondary-bg);
}

/* ================================================================
   ناحیه Hero (Saphira)
   ================================================================ */
.hero {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 16vh;
  min-height: 80px;
  margin-top: 4px;
  z-index: 1;
  pointer-events: none;
}

/* ================================================================
   کارت اصلی
   ================================================================ */
.container {
  width: 100%;
  max-width: 1000px;
  margin-top: 6px;
  background: var(--card-bg);
  padding: 20px 22px 24px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  transition: background var(--transition), border var(--transition), box-shadow var(--transition);
}

.sub-title {
  text-align: center;
  font-size: clamp(13px, 1.4vw, 16px);
  opacity: 0.85;
  margin-bottom: 14px;
}
.sub-title i {
  margin-left: 6px;
  color: var(--primary-color);
}

/* ================================================================
   هشدار
   ================================================================ */
.warning {
  margin-bottom: 18px;
  font-size: 13px;
  line-height: 1.7;
  color: #b45309;
  background: var(--warning-bg);
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid var(--warning-border);
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.warning i {
  font-size: 18px;
  margin-top: 2px;
  flex-shrink: 0;
}
body[data-theme="dark"] .warning {
  color: #fcd34d;
}

/* ================================================================
   تب‌ها
   ================================================================ */
.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
  background: var(--secondary-bg);
  border-radius: 999px;
  padding: 4px;
  transition: background var(--transition);
}

.tab-btn {
  flex: 1;
  border-radius: 999px;
  border: none;
  background: transparent;
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: background var(--transition), color var(--transition), box-shadow var(--transition);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.tab-btn i {
  font-size: 16px;
}
.tab-btn.active {
  background: var(--card-bg);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
body[data-theme="dark"] .tab-btn.active {
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

/* ================================================================
   فیلدها
   ================================================================ */
.field {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 14px;
  color: var(--text-color);
}
label i {
  margin-left: 6px;
  color: var(--primary-color);
}

input[type="number"],
select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: rgba(255,255,255,0.02);
  color: var(--text-color);
  font-family: inherit;
  font-size: 15px;
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
}
body[data-theme="dark"] input[type="number"],
body[data-theme="dark"] select {
  background: rgba(0,0,0,0.25);
}
input[type="number"]:focus,
select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.20);
}
input[type="number"]::placeholder {
  color: #999;
}
body[data-theme="dark"] input[type="number"]::placeholder {
  color: #777;
}

/* دکمه‌ها */
.btn-row {
  display: flex;
  gap: 12px;
  margin-top: 4px;
  flex-wrap: wrap;
}

button {
  padding: 11px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  font-family: inherit;
  font-size: 15px;
  transition: background var(--transition), transform 0.08s, box-shadow var(--transition);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
}

.btn-primary {
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
}
.btn-primary:hover {
  background: var(--primary-hover);
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
}
.btn-primary:active {
  transform: translateY(1px);
}

.btn-secondary {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
.btn-secondary:hover {
  background: var(--secondary-bg);
}
body[data-theme="dark"] .btn-secondary:hover {
  background: rgba(255,255,255,0.06);
}

/* ================================================================
   باکس‌های اطلاعاتی
   ================================================================ */
.result-box,
.dose-box,
.note-box {
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.8;
  padding: 12px 14px;
  transition: background var(--transition), color var(--transition);
}

.result-box {
  margin-top: 16px;
  background: var(--result-bg);
  color: var(--text-color);
}
.dose-box {
  margin-top: 8px;
  background: var(--dose-bg);
  color: var(--text-color);
}
.note-box {
  margin-top: 8px;
  background: var(--note-bg);
  color: var(--text-color);
  white-space: pre-line;
  font-size: 13px;
}

.highlight-dose {
  color: var(--highlight-color);
  font-weight: 700;
}

.hidden {
  display: none !important;
}

/* ================================================================
   فوتر
   ================================================================ */
.footer {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  opacity: 0.9;
  padding-top: 14px;
  border-top: 1px dashed var(--border-color);
  transition: border var(--transition);
}
.footer a {
  text-decoration: none;
  font-weight: 600;
  color: var(--primary-color);
  transition: color var(--transition);
}
.footer a:hover {
  text-decoration: underline;
}
.footer i {
  margin-left: 4px;
  color: var(--primary-color);
}

/* ================================================================
   واکنش‌گرایی (Responsive)
   ================================================================ */
@media (max-width: 640px) {
  body {
    padding: 4px 6px 12px;
  }
  .top-bar {
    flex-wrap: wrap;
    gap: 6px;
  }
  .header-area {
    max-width: 70%;
  }
  .top-title {
    font-size: 14px;
    padding: 4px 10px;
  }
  .container {
    padding: 14px 12px 18px;
    border-radius: 14px;
  }
  .tabs .tab-btn {
    font-size: 12px;
    padding: 6px 6px;
  }
  .tab-btn i {
    font-size: 14px;
  }
  .btn-row {
    flex-direction: column;
  }
  button {
    flex: none;
    width: 100%;
  }
  .warning {
    font-size: 12px;
    padding: 10px;
  }
  .result-box, .dose-box, .note-box {
    font-size: 13px;
    padding: 10px;
  }
  .hero {
    height: 12vh;
    min-height: 60px;
  }
}

@media (max-width: 400px) {
  .top-title {
    font-size: 12px;
    padding: 3px 8px;
  }
  .theme-icon {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
  input[type="number"], select, button {
    font-size: 14px;
    padding: 8px 10px;
  }
}
