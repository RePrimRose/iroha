# 베이스 이미지
FROM openjdk:11-jdk AS build

# 작업 디렉토리 설정
WORKDIR /app

# /backend 폴더의 gradlew 파일과 프로젝트 파일을 복사
COPY backend/gradlew /app/backend/gradlew
COPY backend /app/backend

# gradlew에 실행 권한 부여
RUN chmod +x /app/backend/gradlew

# Spring Boot 빌드
RUN cd /app/backend && ./gradlew bootJar --no-daemon

# 최종 이미지 생성
FROM openjdk:11-jre-slim

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 jar 파일을 최종 이미지로 복사
COPY --from=build /app/backend/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
