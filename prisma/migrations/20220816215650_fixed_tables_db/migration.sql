-- CreateTable
CREATE TABLE "TvSerie" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TvSerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvSeason" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "tvSerieId" INTEGER NOT NULL,

    CONSTRAINT "TvSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvEpisode" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "year" INTEGER NOT NULL,
    "tvSeasonId" INTEGER NOT NULL,

    CONSTRAINT "TvEpisode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TvSeason" ADD CONSTRAINT "TvSeason_tvSerieId_fkey" FOREIGN KEY ("tvSerieId") REFERENCES "TvSerie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TvEpisode" ADD CONSTRAINT "TvEpisode_tvSeasonId_fkey" FOREIGN KEY ("tvSeasonId") REFERENCES "TvSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
