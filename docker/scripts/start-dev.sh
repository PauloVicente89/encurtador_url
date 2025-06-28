#!/bin/bash
set -e

source ../../.env

create_db() {
    export PGPASSWORD=$POSTGRES_PASSWORD

    echo "Checking if the database $POSTGRES_DB exists..."
    if ! psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -lqt | cut -d \| -f 1 | grep -qw $POSTGRES_DB; then
        echo "Database $POSTGRES_DB not found, creating..."
        psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER -c "CREATE DATABASE $POSTGRES_DB"
    fi
    
}
create_db

npx prisma migrate deploy
npx prisma generate

npm run start:dev