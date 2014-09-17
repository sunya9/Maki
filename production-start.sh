#!/bin/sh

export NODE_ENV=production
export PATH=/usr/local/bin:$PATH
forever start app.js > /dev/null