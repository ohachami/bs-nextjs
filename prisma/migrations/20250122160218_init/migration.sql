/*
  Warnings:

  - Added the required column `user_id` to the `data_version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creator_id` to the `exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horizon_id` to the `period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sbu_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "data_version" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "exercise" ADD COLUMN     "creator_id" UUID NOT NULL,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "exercise_period" ADD COLUMN     "year" INTEGER;

-- AlterTable
ALTER TABLE "period" ADD COLUMN     "horizon_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "created_at" TIMESTAMP(6),
ADD COLUMN     "last_login" TIMESTAMP(6),
ADD COLUMN     "profile_image" VARCHAR(255),
ADD COLUMN     "sbu_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "audit_log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "action_id" UUID NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_type" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255),
    "horizon_id" UUID NOT NULL,

    CONSTRAINT "exercise_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horizon" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255),

    CONSTRAINT "horizon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period_config" (
    "exercise_id" UUID NOT NULL,
    "parent_period_id" UUID NOT NULL,
    "period_id" UUID NOT NULL,
    "sorted_by" INTEGER,
    "bump_year" BOOLEAN,

    CONSTRAINT "period_config_pkey" PRIMARY KEY ("exercise_id","parent_period_id","period_id")
);

-- CreateTable
CREATE TABLE "ref_action" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT,
    "key" VARCHAR(255),
    "label" VARCHAR(255),

    CONSTRAINT "action_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_ref_sbu_fk" FOREIGN KEY ("sbu_id") REFERENCES "ref_sbu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_creator_id" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_horizon_fk" FOREIGN KEY ("horizon_id") REFERENCES "horizon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_version" ADD CONSTRAINT "data_version_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_action_fk" FOREIGN KEY ("action_id") REFERENCES "ref_action"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercise_type" ADD CONSTRAINT "exercise_type_horizon_fk" FOREIGN KEY ("horizon_id") REFERENCES "horizon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "period_config" ADD CONSTRAINT "period_config_exercise_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "period_config" ADD CONSTRAINT "period_config_parent_period_fk" FOREIGN KEY ("parent_period_id") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "period_config" ADD CONSTRAINT "period_config_period_fk" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
