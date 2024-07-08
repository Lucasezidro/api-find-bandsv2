-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER', 'FINDER');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'REFUSED', 'APPROVED');

-- CreateEnum
CREATE TYPE "EventSize" AS ENUM ('BIG', 'MEDIUM', 'SMALL');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'FINDER',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" DEFAULT 'MEMBER',
    "office" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "band_role_id" TEXT NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bands" (
    "bandId" TEXT NOT NULL,
    "band_name" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFavorit" BOOLEAN,
    "favoritCount" TEXT,
    "messages" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_admin_id" TEXT NOT NULL,

    CONSTRAINT "bands_pkey" PRIMARY KEY ("bandId")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "destination" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "is_event_accepted" BOOLEAN,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "refusedReason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "destination_band_id" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "eventId" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "is_event_has_past" BOOLEAN,
    "event_images" TEXT,
    "eventSize" "EventSize" DEFAULT 'SMALL',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "band_event_id" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("eventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_band_role_id_fkey" FOREIGN KEY ("band_role_id") REFERENCES "bands"("bandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bands" ADD CONSTRAINT "bands_user_admin_id_fkey" FOREIGN KEY ("user_admin_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_destination_band_id_fkey" FOREIGN KEY ("destination_band_id") REFERENCES "bands"("bandId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_band_event_id_fkey" FOREIGN KEY ("band_event_id") REFERENCES "bands"("bandId") ON DELETE RESTRICT ON UPDATE CASCADE;
