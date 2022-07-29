FROM node:current-alpine

ENV VITE_APIURL=http://localhost:3333
ENV VITE_TILE_URL=http://localhost:3333
ENV VITE_MAPTILER_KEY=2BL4ZBQCqs6NfOUgnKGy

USER node

EXPOSE 3000