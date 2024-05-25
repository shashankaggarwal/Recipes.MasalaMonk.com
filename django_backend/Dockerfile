# django_backend/Dockerfile

FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY django_backend/requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
