#!/bin/sh

curl -X POST -H "Content-Type: application/json" \
   -d '{"name":"Niko","message":"howdy"}' \
    http://localhost:3000/messages
