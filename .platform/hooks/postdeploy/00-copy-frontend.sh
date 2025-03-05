#!/bin/bash
cp -r /app/frontend/build/* /usr/share/nginx/html/
service nginx restart
