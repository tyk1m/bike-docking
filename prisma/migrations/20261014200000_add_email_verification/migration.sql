ALTER TABLE "users"
    ALTER COLUMN "password_hash" DROP NOT NULL,
    ADD COLUMN "email_verified" BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN "verification_code_hash" VARCHAR(64),
    ADD COLUMN "verification_code_expires_at" TIMESTAMPTZ(6);

ALTER TABLE "users" ALTER COLUMN "email_verified" SET DEFAULT false;
