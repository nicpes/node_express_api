-- DropForeignKey
ALTER TABLE "TvSeason" DROP CONSTRAINT "TvSeason_tvSerieId_fkey";

-- AddForeignKey
ALTER TABLE "TvSeason" ADD CONSTRAINT "TvSeason_tvSerieId_fkey" FOREIGN KEY ("tvSerieId") REFERENCES "TvSerie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
