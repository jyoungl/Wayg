# Image Download
FROM python:3.7.10
WORKDIR /usr/src/app

COPY . .

RUN apt-get install openjdk-8-jdk -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "./waitress_server.py"]