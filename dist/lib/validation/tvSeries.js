"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tvSerieUpdateSchemaDTO = exports.tvSeasonUpdateSchemaDTO = exports.tvEpisodeUpdateSchemaDTO = exports.tvSerieCreateSchemaDTO = exports.tvSeasonCreateSchemaDTO = exports.tvEpisodeCreateSchemaDTO = void 0;
const typebox_1 = require("@sinclair/typebox");
/*mappare lo schema del db e controlla quali proprietà accettare quando riceve il body */
/* DTO ROTTA POST */
exports.tvEpisodeCreateSchemaDTO = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    year: typebox_1.Type.Integer(),
}, { additionalProperties: false });
exports.tvSeasonCreateSchemaDTO = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    year: typebox_1.Type.Integer(),
    episodes: typebox_1.Type.Optional(typebox_1.Type.Array(exports.tvEpisodeCreateSchemaDTO)),
}, { additionalProperties: false });
exports.tvSerieCreateSchemaDTO = typebox_1.Type.Object({
    title: typebox_1.Type.String(),
    description: typebox_1.Type.String(),
    year: typebox_1.Type.Integer(),
    seasons: typebox_1.Type.Optional(typebox_1.Type.Array(exports.tvSeasonCreateSchemaDTO)),
}, { additionalProperties: false });
/* DTO ROTTA PATCH */
exports.tvEpisodeUpdateSchemaDTO = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    title: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    year: typebox_1.Type.Optional(typebox_1.Type.Integer()),
}, { additionalProperties: false });
exports.tvSeasonUpdateSchemaDTO = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    title: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    year: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    episodes: typebox_1.Type.Optional(typebox_1.Type.Array(exports.tvEpisodeUpdateSchemaDTO)),
}, { additionalProperties: false });
exports.tvSerieUpdateSchemaDTO = typebox_1.Type.Object({
    id: typebox_1.Type.Integer(),
    title: typebox_1.Type.Optional(typebox_1.Type.String()),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    year: typebox_1.Type.Optional(typebox_1.Type.Integer()),
    seasons: typebox_1.Type.Optional(typebox_1.Type.Array(exports.tvSeasonUpdateSchemaDTO)),
}, { additionalProperties: false });
//# sourceMappingURL=tvSeries.js.map