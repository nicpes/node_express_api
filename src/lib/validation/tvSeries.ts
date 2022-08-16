import { Static, Type } from "@sinclair/typebox";

/*mappare lo schema del db e controlla quali proprietà accettare quando riceve il body */

/* DTO ROTTA POST */

export const tvEpisodeCreateSchemaDTO = Type.Object(
  {
    title: Type.String(),
    description: Type.String(),
    year: Type.Integer(),
  },
  { additionalProperties: false }
);

export const tvSeasonCreateSchemaDTO = Type.Object(
  {
    title: Type.String(),
    description: Type.String(),
    year: Type.Integer(),
    episodes: Type.Optional(Type.Array(tvEpisodeCreateSchemaDTO)),
  },
  { additionalProperties: false }
);

export const tvSerieCreateSchemaDTO = Type.Object(
  {
    title: Type.String(),
    description: Type.String(),
    year: Type.Integer(),
    seasons: Type.Optional(Type.Array(tvSeasonCreateSchemaDTO)),
  },
  { additionalProperties: false }
);
export type TvSerieCreateData = Static<typeof tvSerieCreateSchemaDTO>;

/* DTO ROTTA PATCH */

export const tvEpisodeUpdateSchemaDTO = Type.Object(
  {
    id: Type.Integer(),
    title: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    year: Type.Optional(Type.Integer()),
  },
  { additionalProperties: false }
);

export const tvSeasonUpdateSchemaDTO = Type.Object(
  {
    id: Type.Integer(),
    title: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    year: Type.Optional(Type.Integer()),
    episodes: Type.Optional(Type.Array(tvEpisodeUpdateSchemaDTO)),
  },
  { additionalProperties: false }
);

export const tvSerieUpdateSchemaDTO = Type.Object(
  {
    id: Type.Integer(),
    title: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    year: Type.Optional(Type.Integer()),
    seasons: Type.Optional(Type.Array(tvSeasonUpdateSchemaDTO)),
  },
  { additionalProperties: false }
);

export type tvSerieResponseDTO = {
  id: number;
  title: string;
  description: string;
  year: number;
  createdAt: Date;
  updatedAt: Date;
  seasons?: tvSeasonsResponseDTO[];
};
export type tvSeasonsResponseDTO = {
  id: number;
  title: string;
  description: string;
  year: number;
  episodes?: tvEpisodeResponseDTO[];
};
export type tvEpisodeResponseDTO = {
  id: number;
  title: string;
  description: string;
  year: number;
};

export type TvSerieUpdateData = Static<typeof tvSerieUpdateSchemaDTO>;
