# Image Download
FROM python:3.7.10
WORKDIR /usr/src/app

COPY . .

RUN mkdir -p /usr/share/man/man1
RUN apt-get update && apt-get install -y --no-install-recommends default-jre default-jdk
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5000
CMD ["python", "./waitress_server.py"]