FROM maven AS maven

WORKDIR /usr/src/app/backend
COPY . /usr/src/app/backend

RUN mvn package

# jar run
FROM openjdk:17-jdk-slim
ARG JAR_FILE=/usr/src/app/backend/target/*.jar

WORKDIR /opt/app/backend
COPY --from=maven ${JAR_FILE} /opt/app/backend/app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]