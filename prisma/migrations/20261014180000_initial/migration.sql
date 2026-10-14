CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

CREATE TABLE "bikes" (
    "id" VARCHAR(80) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "type" VARCHAR(80) NOT NULL,
    "station" VARCHAR(160) NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "bikes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "rentals" (
    "id" BIGSERIAL NOT NULL,
    "bike_id" VARCHAR(80) NOT NULL,
    "user_id" UUID NOT NULL,
    "started_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returned_at" TIMESTAMPTZ(6),

    CONSTRAINT "rentals_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "rentals_user_id_started_at_idx" ON "rentals"("user_id", "started_at" DESC);
CREATE INDEX "rentals_bike_id_returned_at_idx" ON "rentals"("bike_id", "returned_at");

ALTER TABLE "rentals" ADD CONSTRAINT "rentals_bike_id_fkey"
    FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "rentals" ADD CONSTRAINT "rentals_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
