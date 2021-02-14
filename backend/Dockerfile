FROM python:3.8-slim
RUN mkdir /usr/src/api/
COPY . /usr/src/api/
WORKDIR /usr/src/api/
EXPOSE 5000
RUN pip install -r requirements.txt
CMD ["python", "run.py"]