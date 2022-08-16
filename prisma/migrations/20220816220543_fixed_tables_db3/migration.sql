-- DropForeignKey
ALTER TABLE "TvEpisode" DROP CONSTRAINT "TvEpisode_tvSeasonId_fkey";

-- AddForeignKey
ALTER TABLE "TvEpisode" ADD CONSTRAINT "TvEpisode_tvSeasonId_fkey" FOREIGN KEY ("tvSeasonId") REFERENCES "TvSeason"("id") ON DELETE CASCADE ON UPDATE CASCADE;
