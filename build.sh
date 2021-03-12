#!/bin/bash
cd pdf-generator
npm i
npm run transpile
cd ..
sam build