FROM openjdk:8-jdk-alpine
RUN ls build/libs
COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
EXPOSE 8080
