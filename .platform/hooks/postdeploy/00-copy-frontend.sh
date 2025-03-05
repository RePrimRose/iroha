#!/bin/bash
set -e  # 에러 발생 시 즉시 종료

echo "🔍 Checking frontend build directory..."
ls -lah /var/app/current/frontend || echo "❌ frontend directory not found!"
ls -lah /var/app/current/frontend/build || echo "❌ frontend build directory not found!"

echo "REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}" > /var/app/current/frontend/.env.production

# React 빌드 파일 복사
if [ -d "/var/app/current/frontend/build" ]; then
    echo "✅ Copying frontend build files to Nginx html directory..."
    cp -r /var/app/current/frontend/build/* /usr/share/nginx/html/
else
    echo "🚨 No frontend build found! Deployment will continue without frontend files."
fi

# Nginx 재시작
echo "🔄 Restarting Nginx..."
systemctl restart nginx
