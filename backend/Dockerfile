# Multi-stage build: build with Maven (JDK 21), run with JRE 21
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /workspace
# copy only pom first to leverage docker cache for deps
COPY pom.xml .
COPY src ./src
RUN mvn -B -DskipTests package

# Runtime image
FROM eclipse-temurin:21-jre
WORKDIR /app
# Install curl so container can respond to healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
# copy the runnable jar (Spring Boot fat jar)
COPY --from=builder /workspace/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
