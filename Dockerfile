# Gradle 이미지 사용
FROM gradle:7.4-jdk11 as build

WORKDIR /app

# Gradle Wrapper와 소스 코드 복사
COPY . .

# gradlew에 실행 권한 부여
RUN chmod +x ./gradlew

# Spring Boot 빌드
RUN ./gradlew bootJar --no-daemon

# 최종 이미지 생성
FROM openjdk:11-jre-slim

WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=build /app/build/libs/your-app-name.jar /app/app.jar

# 애플리케이션 실행
CMD ["java", "-jar", "/app/app.jar"]
