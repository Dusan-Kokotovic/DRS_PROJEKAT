FROM python:3.10
COPY backend/req.txt backend/req.txt
RUN python -m pip install --upgrade pip
RUN pip3 install -r backend/req.txt
COPY . .
EXPOSE 5000
WORKDIR /backend
ENTRYPOINT [ "python" ]
CMD ["app.py"]