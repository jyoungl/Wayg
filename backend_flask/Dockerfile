# Image Download
FROM python:3.8.5
WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "./app.py", "0.0.0.0:5000"]
