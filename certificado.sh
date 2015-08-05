#!/usr/bin/env bash
mkdir cert
cd cert
openssl genrsa -out quiz-plp-key.pem 2048
openssl req -new -sha256 -key quiz-plp-key.pem -out quiz-plp-csr.pem
openssl x509 -req -in quiz-plp-csr.pem -signkey quiz-plp-key.pem -out quiz-plp-cert.pem