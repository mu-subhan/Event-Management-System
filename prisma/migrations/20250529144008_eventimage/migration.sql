-- DropForeignKey
ALTER TABLE "event_images" DROP CONSTRAINT "event_images_eventId_fkey";

-- AddForeignKey
ALTER TABLE "event_images" ADD CONSTRAINT "event_images_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
