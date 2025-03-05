# 🔹 Step 1: Build Frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install && npm run build

# 🔹 Step 2: Build Backend
FROM gradle:7.6-jdk17 AS backend-builder
WORKDIR /app/backend
COPY backend/ .
RUN gradle bootJar --no-daemon

# 🔹 Step 3: Create Final Container
FROM openjdk:17-jdk-slim AS final-container
WORKDIR /app

# 백엔드 실행 파일 복사
COPY --from=backend-builder /app/backend/build/libs/*.jar app.jar

# 프론트엔드 빌드 결과를 Nginx에 복사
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Supervisor 설정 복사 (백엔드 + Nginx 동시 실행)
COPY .platform/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Supervisor 설치
RUN apt-get update && apt-get install -y supervisor

# 실행 포트 노출
EXPOSE 80 8080

# 컨테이너 시작 시 Supervisor 실행
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
