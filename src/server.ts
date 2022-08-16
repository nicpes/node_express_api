import express from "express";
import { Router } from "express";
import "dotenv/config";
import "express-async-errors";
import { PrismaClient } from "@prisma/client";
import { validate, validationErrorMiddleware } from "./lib/validation";
import {
  TvSerieUpdateData,
  tvSerieCreateSchemaDTO,
  TvSerieCreateData,
  tvSerieUpdateSchemaDTO,
  tvSerieResponseDTO,
} from "./lib/validation/tvSeries";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const tvSeries: tvSerieResponseDTO[] = await prisma.tvSerie.findMany({
    include: {
      tvSeasons: {
        include: {
          tvEpisodes: true,
        },
      },
    },
  });

  res.status(200).json(tvSeries);
});

app.get("/:id", async (req, res) => {
  const serieId = Number(req.params.id);

  const serie = await prisma.tvSerie.findUnique({
    where: { id: serieId },
  });

  res.json(serie);
});

app.post(
  "/tvseries",
  /* 26 ) validazione, se il body rispetta le cose richieste in tvSeries.ts */
  /* 29 ) tvSeriesDataRequest contiene il contenuto del body nella post * /
  /* 31 ) estraggo con la destrutturazione la proprietà seasons e la salvo in una variabile omonima, salva in tvSerieData il resto (title, desc, year)*/
  validate({ body: tvSerieCreateSchemaDTO }),
  async (req, res) => {
    const tvSeriesDataRequest: TvSerieCreateData = req.body;

    const { seasons, ...tvSerieData } = tvSeriesDataRequest;

    /* salvo le cose nel db, prendo intanto le prime 3 proprietà (title, desc, year) poi faccio check se esiste season, se esiste aggiungi la proprietà */
    const objToSave = {
      /* data iniziale con tutte le proprietà */
      ...tvSerieData,
      ...(seasons && {
        tvSeasons: {
          create: seasons.map((season) => {
            /* riestraggo con la destrutturazione "episodes" dal season ciclato per fare il check se episodes esiste */
            const { episodes, ...restOfSeason } = season;
            return {
              ...restOfSeason,
              ...(episodes && {
                tvEpisodes: {
                  create: episodes,
                },
              }),
            };
          }),
        },
      }),
    };

    const newTvSerie: tvSerieResponseDTO = await prisma.tvSerie.create({
      data: objToSave,
    });

    /* quando creo nuova entità nel db ritorna un codice 201 */
    res.status(201).json(newTvSerie);
  }
);

app.patch(
  "/tvseries/:id",
  validate({ body: tvSerieUpdateSchemaDTO }),
  async (req, res) => {
    const tvSeriesDataRequest: TvSerieUpdateData = req.body;

    /* cercare se la serie tv esiste nel db prima del patch */
    const serieFound = await prisma.tvSerie.findUnique({
      where: { id: +req.params.id },
    });

    if (!serieFound)
      return res.status(500).send({ message: "some error has occurred" });

    const { seasons, ...tvSerieData } = tvSeriesDataRequest;

    const objToUpdate = {
      ...tvSerieData,
      ...(seasons && {
        tvSeasons: {
          update: seasons.map((season) => {
            const { episodes, id, ...restOfSeason } = season;
            return {
              where: { id },
              data: {
                ...restOfSeason,
                ...(episodes && {
                  tvEpisodes: {
                    update: episodes.map((episode) => {
                      const { id } = episode;
                      return {
                        where: { id },
                        data: episode,
                      };
                    }),
                  },
                }),
              },
            };
          }),
        },
      }),
    };

    const updateTvSerie: tvSerieResponseDTO = await prisma.tvSerie.update({
      where: { id: serieFound.id },
      data: objToUpdate,
    });

    /* quando creo nuova entità nel db ritorna un codice 201 */
    res.status(201).json(updateTvSerie);
  }
);
app.delete("/:id", async function (req, res, next) {
  const serieId = Number(req.params.id);
  try {
    await prisma.tvSerie.delete({
      where: { id: serieId },
    });
    res.status(200).end();
  } catch (error) {
    res.status(404);
    next(console.log(error));
  }
});
app.use(validationErrorMiddleware);

const port = process.env.PORT;

app.listen(port, () => console.log("listen on port: " + port));
