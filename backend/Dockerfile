FROM python:3.8-slim
RUN mkdir /api
COPY . /api
WORKDIR /api
EXPOSE 5000
RUN pip install -r requirements.txt
CMD ["python3", "run.py"]