# OpenJDK 17 설치
FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# backend의 gradle 디렉토리와 gradlew 복사
COPY backend/gradle /app/gradle
COPY backend/gradlew /app/

# backend 디렉토리 복사
COPY backend /app/backend

# Gradle wrapper에 실행 권한 부여 (backend 디렉토리 내 gradlew)
RUN chmod +x /app/backend/gradlew

# Spring Boot 빌드
RUN cd /app/backend && ./gradlew bootJar --no-daemon

RUN ls /app/backend/build/libs/

# 최종 이미지 생성
FROM openjdk:17-jdk-slim

WORKDIR /app

# 빌드된 jar 파일을 복사
COPY --from=build /app/backend/build/libs/iroha-0.0.1-SNAPSHOT.jar /app/iroha-0.0.1-SNAPSHOT.jar

# 애플리케이션 실행
CMD ["java", "-jar", "/app/iroha-0.0.1-SNAPSHOT.jar"]
