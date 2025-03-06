# OpenJDK 17 설치
FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Gradle 설치
COPY backend/gradle /app/gradle
COPY backend/gradlew /app/
COPY backend /app/backend

# Gradle wrapper에 실행 권한 부여
RUN chmod +x ./app/gradlew

# Spring Boot 빌드
RUN cd /app/backend && ./gradlew bootJar --no-daemon

# 최종 이미지 생성
FROM openjdk:17-jdk-slim

WORKDIR /app

# 빌드된 jar 파일을 복사
COPY --from=build /app/backend/build/libs/your-app.jar /app/your-app.jar

# 애플리케이션 실행
CMD ["java", "-jar", "/app/your-app.jar"]
