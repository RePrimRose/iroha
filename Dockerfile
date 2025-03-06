FROM openjdk:17-jdk-slim AS build

# Spring Boot 애플리케이션 복사
COPY backend/ /app
WORKDIR /app

# Spring Boot 빌드
RUN ./gradlew bootJar --no-daemon

# 최종 이미지 생성
FROM openjdk:17-jdk-slim
COPY --from=build /app/build/libs/*.jar /app/app.jar

WORKDIR /app
EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
