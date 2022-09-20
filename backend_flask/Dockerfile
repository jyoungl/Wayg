FROM python:3.8-slim
COPY . /app
RUN  pip install -r requirements.txt
WORKDIR /app
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]