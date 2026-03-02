#!/bin/bash

# Dừng script ngay nếu có lỗi xảy ra
set -e

echo "=========================================="
echo "CHÀO MỪNG $USER ĐẾN VỚI UBUNTU! BẮT ĐẦU QUÁ TRÌNH SETUP..."
echo "1. CẬP NHẬT HỆ THỐNG & CÀI CÁC GÓI CƠ BẢN"
echo "=========================================="
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget gnupg apt-transport-https software-properties-common lsb-release

echo "=========================================="
echo "2. CÀI ĐẶT GIT"
echo "=========================================="
sudo apt install -y git
echo "Phiên bản Git: $(git --version)"

echo "=========================================="
echo "3. CÀI ĐẶT BỘ GÕ TIẾNG VIỆT (IBUS-BAMBOO)"
echo "=========================================="
sudo add-apt-repository ppa:bamboo-engine/ibus-bamboo -y
sudo apt update
sudo apt install -y ibus ibus-bamboo
im-config -n ibus
echo "Đã cài đặt Ibus-Bamboo thành công!"

echo "=========================================="
echo "4. CÀI ĐẶT MONGODB SERVER (BẢN 7.0)"
echo "=========================================="
curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor --yes
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

echo "=========================================="
echo "5. CÀI ĐẶT TIMESCALEDB (POSTGRESQL + TIMESCALE)"
echo "=========================================="
# Thêm repo PostgreSQL và TimescaleDB
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo gpg --dearmor -o /usr/share/keyrings/postgresql-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/postgresql-keyring.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | sudo tee /etc/apt/sources.list.d/pgdg.list
curl -fsSL https://packagecloud.io/timescale/timescaledb/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/timescaledb-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/timescaledb-keyring.gpg] https://packagecloud.io/timescale/timescaledb/ubuntu/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/timescaledb.list
sudo apt update
sudo apt install -y timescaledb-2-postgresql-16 postgresql-client-16
# Tối ưu cấu hình tự động
sudo timescaledb-tune --quiet --yes
sudo systemctl restart postgresql

echo "=========================================="
echo "6. CÀI ĐẶT MONGODB COMPASS"
echo "=========================================="
wget -q https://downloads.mongodb.com/compass/mongodb-compass_1.42.1_amd64.deb -O mongodb-compass.deb
sudo dpkg -i mongodb-compass.deb || sudo apt --fix-broken install -y
rm mongodb-compass.deb

echo "=========================================="
echo "7. CÀI ĐẶT IDE & TRÌNH SOẠN THẢO (VS Code, Cursor, Antigravity)"
echo "=========================================="
# Cài đặt VS Code
echo "Đang cài đặt VS Code..."
sudo snap install code --classic

# Cài đặt Cursor
echo "Đang cài đặt Cursor AI Editor..."
curl https://cursor.com/install -fsS | bash

# Cài đặt Antigravity
echo "Đang cài đặt Antigravity..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://us-central1-apt.pkg.dev/doc/repo-signing-key.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/antigravity-repo-key.gpg
echo "deb [signed-by=/etc/apt/keyrings/antigravity-repo-key.gpg] https://us-central1-apt.pkg.dev/projects/antigravity-auto-updater-dev/ antigravity-debian main" | sudo tee /etc/apt/sources.list.d/antigravity.list > /dev/null
sudo apt update
sudo apt install -y antigravity

echo "=========================================="
echo "8. CÀI ĐẶT NVM & NODE.JS 24"
echo "=========================================="
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 24
nvm use 24
nvm alias default 24

echo "=========================================="
echo "9. CÀI ĐẶT CÔNG CỤ & TIỆN ÍCH (Flameshot, Postman, Bitwarden, Telegram)"
echo "=========================================="
sudo apt install -y flameshot
sudo snap install postman
sudo snap install bitwarden
sudo snap install telegram-desktop

echo "=========================================="
echo "10. THEME WHITESUR (GIAO DIỆN MACOS) & TWEAKS"
echo "=========================================="
echo "Đang cài đặt các thư viện hỗ trợ (Tweaks, Sassc, ...)..."
sudo apt install -y gnome-tweaks gnome-shell-extensions sassc libglib2.0-dev-bin

echo "Đang tạo thư mục tạm để chứa mã nguồn theme..."
mkdir -p ~/.mac-theme-setup && cd ~/.mac-theme-setup

echo "► Đang tải và cài đặt WhiteSur GTK Theme..."
git clone https://github.com/vinceliuice/WhiteSur-gtk-theme.git --depth=1 && cd WhiteSur-gtk-theme && ./install.sh -d ~/.themes -t all && cd ..

echo "► Đang tải và cài đặt WhiteSur Icon Theme..."
git clone https://github.com/vinceliuice/WhiteSur-icon-theme.git --depth=1 && cd WhiteSur-icon-theme && ./install.sh -d ~/.icons && cd ..

echo "► Đang tải và cài đặt WhiteSur Cursors (Con trỏ chuột)..."
git clone https://github.com/vinceliuice/WhiteSur-cursors.git --depth=1 && cd WhiteSur-cursors && ./install.sh -d ~/.icons && cd ~

echo "Đang dọn dẹp thư mục tạm..."
rm -rf ~/.mac-theme-setup
echo "Hoàn tất cài đặt toàn bộ bộ Theme WhiteSur!"

echo "=========================================="
echo "🎉 SETUP HOÀN TẤT!"
echo "Lưu ý quan trọng sau khi cài xong:"
echo "1. Đăng xuất và Đăng nhập lại để Ibus-Bamboo hoạt động."
echo "2. Mở Settings > Region & Language > Input Sources > Thêm 'Vietnamese (Bamboo)'."
echo "3. Mở Terminal mới để NVM nhận Node 24."
echo "4. TimescaleDB đã sẵn sàng trên PostgreSQL 16 (User mặc định: postgres)."
echo "5. Mở 'Tweaks' -> 'Appearance' để chọn theme WhiteSur-Dark."
echo "=========================================="
