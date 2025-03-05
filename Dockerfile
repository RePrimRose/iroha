# Step 1: Build React frontend
FROM node:18 AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Step 2: Build Spring Boot backend
FROM openjdk:17 AS backend-builder
WORKDIR /app/backend
COPY backend/ .
RUN chmod +x gradlew && ./gradlew bootJar
RUN ./gradlew bootJar

# Step 3: Create final container
FROM openjdk:17
WORKDIR /app
COPY --from=backend-builder /app/backend/build/libs/*.jar app.jar
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Install Nginx
RUN apt update && apt install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy Nginx configuration
COPY .platform/nginx/nginx.conf /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80 8080

# Start Nginx and Backend
CMD service nginx start && java -jar app.jar
