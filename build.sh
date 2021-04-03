#!/bin/bash
cd pdf-generator
npm ci
npm run transpile
cd ..
sam build