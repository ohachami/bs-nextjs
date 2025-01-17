-- CreateTable
CREATE TABLE "permission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "permission_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,

    CONSTRAINT "profiles_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_permission" (
    "permission_d" UUID NOT NULL,
    "profile_id" UUID NOT NULL,

    CONSTRAINT "profile_permission_pk" PRIMARY KEY ("permission_d","profile_id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "profile_id" UUID,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "target" JSONB,
    "year" INTEGER,
    "status" TEXT,

    CONSTRAINT "exercise_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_period" (
    "exercise_id" UUID NOT NULL,
    "period_id" UUID NOT NULL,

    CONSTRAINT "exercise_period_pk" PRIMARY KEY ("exercise_id","period_id")
);

-- CreateTable
CREATE TABLE "exercise_step" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "step_config_id" UUID,
    "status" TEXT,
    "deadline_dt" TIMESTAMPTZ(6),

    CONSTRAINT "exercise_step_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "period" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "parent_id" UUID,
    "sorted_by" INTEGER,

    CONSTRAINT "period_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_config" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "code" TEXT,
    "icon_key" TEXT,
    "sorted_by" INTEGER,

    CONSTRAINT "step_config_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_source" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT,
    "name" TEXT,
    "code" TEXT,

    CONSTRAINT "data_source_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_version" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "version" INTEGER,
    "path" TEXT,
    "name" TEXT,
    "sbu_id" UUID,
    "exercise_id" UUID,
    "site_id" UUID,
    "created_at" TIMESTAMPTZ(6),
    "data_source_id" UUID,

    CONSTRAINT "data_version_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_sbu" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,

    CONSTRAINT "ref_sbu_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ref_site" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "code" TEXT,
    "sbu_id" UUID,

    CONSTRAINT "ref_site_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "profile_permission" ADD CONSTRAINT "profile_permission_permission_fk" FOREIGN KEY ("permission_d") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile_permission" ADD CONSTRAINT "profile_permission_profile_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "users_profiles_fk" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercise_period" ADD CONSTRAINT "exercise_period_exercise_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercise_period" ADD CONSTRAINT "exercise_period_period_fk" FOREIGN KEY ("period_id") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "exercise_step" ADD CONSTRAINT "exercise_step_step_config_fk" FOREIGN KEY ("step_config_id") REFERENCES "step_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "period" ADD CONSTRAINT "period_period_fk" FOREIGN KEY ("parent_id") REFERENCES "period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_version" ADD CONSTRAINT "data_version_data_source_fk" FOREIGN KEY ("data_source_id") REFERENCES "data_source"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_version" ADD CONSTRAINT "data_version_exercise_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_version" ADD CONSTRAINT "data_version_ref_sbu_fk" FOREIGN KEY ("sbu_id") REFERENCES "ref_sbu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "data_version" ADD CONSTRAINT "data_version_ref_site_fk" FOREIGN KEY ("site_id") REFERENCES "ref_site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ref_site" ADD CONSTRAINT "ref_site_ref_sbu_fk" FOREIGN KEY ("sbu_id") REFERENCES "ref_sbu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
