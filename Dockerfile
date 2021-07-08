# syntax=docker/dockerfile:1

RUN g++ shared -c -fPIC gen.cpp -o gen.o; \
    g++ -shared -Wl,-soname,library.so -o library.so gen.o;

FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]