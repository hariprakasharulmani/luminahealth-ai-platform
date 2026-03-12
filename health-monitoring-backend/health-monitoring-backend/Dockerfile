# Stage 1: Build the application
FROM maven:3.9-amazoncorretto-17 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src
COPY mvnw .
COPY .mvn .mvn

# Ensure maven wrapper has execute permissions (just in case)
RUN chmod +x ./mvnw

# Package the application using native maven (skip tests for faster builds)
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM amazoncorretto:17-alpine-jdk
WORKDIR /app

# Copy the built JAR file from the 'build' stage
COPY --from=build /app/target/health-monitoring-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose backend port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
