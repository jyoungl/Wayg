# java and python
FROM openjdk:slim
COPY --from=python:3.6 / /


WORKDIR /usr/src/app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "./waitress_server.py"]