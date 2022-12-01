FROM        node:17

WORKDIR     /opt/app/bot

COPY        ./app .

RUN         npm install -D nodemon

RUN         npm install --location=global typescript && tsc

