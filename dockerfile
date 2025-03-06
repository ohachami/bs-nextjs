FROM harbor.digilab.ocpgroup.ma/base/node:22

WORKDIR /app

COPY .next .next/
COPY package.json .
COPY node_modules node_modules/ 
COPY public public/
COPY  .env .

RUN useradd -u 1001010000 -m steerlinx && \
    chown -R steerlinx:steerlinx /app

USER steerlinx

EXPOSE 3000

CMD ["yarn", "start"]