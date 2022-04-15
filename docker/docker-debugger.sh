#!/bin/bash
sleep 10
dockerId=`docker ps -aqf "name=qrcode_backend"`
xterm -e docker logs -f $dockerId
