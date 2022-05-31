'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ratings', [
      {
      id_area: 1,
      id_request: 6,
      score: 9,
      review: "Hermosa la pileta!",
      },
      {
        id_area: 1,
        id_request: 7,
        score: 8,
        review: "Tiene carriles para nadar. Muy buena!",
      },
      {
        id_area: 1,
        id_request: 8,
        score: 7,
        review: "Recomendable para ir con chiccos.",
      },
      {
        id_area: 1,
        id_request: 9,
        score: 4,
        review: "Podrían mejorar limpieza."
      },
      {
        id_area: 1,
        id_request: 10,
        score: 3,
        review: "Mucho cloro!"
      },
      {
        id_area: 1,
        id_request: 11,
        score: 2,
        review: "El drenaje se veía sucio."
      },
      {
        id_area: 2,
        id_request: 22,
        score: 10,
        review: "Está preciosa. Recomendable!"
      },
      {
        id_area: 2,
        id_request: 23,
        score: 10,
        review: "Muy bien climatizada. Un lujo."
      },
      {
        id_area: 2,
        id_request: 24,
        score: 9,
        review: "Excelente."
      },
      {
        id_area: 2,
        id_request: 25,
        score: 6,
        review: "Regular, puede mejorar."
      },
      {
        id_area: 2,
        id_request: 26,
        score: 3,
        review: "Helada el agua."
      },
      {
        id_area: 2,
        id_request: 27,
        score: 1,
        review: "Limpien mejor a la mañana!"
      },
      {
        id_area: 2,
        id_request: 28,
        score: 8,
        review: "Nos encantó!"
      },
      {
        id_area: 2,
        id_request: 29,
        score: 6,
        review: "Nada que objetar."
      },
      {
        id_area: 3,
        id_request: 36,
        score: 8,
        review: "Muy limpio!"
      },
      {
        id_area: 3,
        id_request: 37,
        score: 5,
        review: "La temperatura no estaba bien regulada."
      },
      {
        id_area: 3,
        id_request: 38,
        score: 3,
        review: "No andaban todos los jets."
      },
      {
        id_area: 3,
        id_request: 39,
        score: 6,
        review: "Muy lindo para pasar un rato."
      },
      {
        id_area: 3,
        id_request: 40,
        score: 4,
        review: "El lugar no es muy tranquilo. Muchos niños."
      },
      {
        id_area: 3,
        id_request: 41,
        score: 8,
        review: "Genial para disfrutar con amigos o en pareja."
      },
      {
        id_area: 3,
        id_request: 42,
        score: 9,
        review: "Precioso lugar!"
      },
      {
        id_area: 3,
        id_request: 43,
        score: 9,
        review: "Muy bien ambientado."
      },
      {
        id_area: 3,
        id_request: 44,
        score: 3,
        review: "Mejoren la limpieza."
      },
      {
        id_area: 3,
        id_request: 45,
        score: 8,
        review: "Adecuado para relajarse un rato."
      },
      {
        id_area: 3,
        id_request: 46,
        score: 2,
        review: "El agua muy sucia."
      },
      {
        id_area: 3,
        id_request: 47,
        score: 10,
        review: "Buenísimo!"
      },
      {
        id_area: 4,
        id_request: 48,
        score: 3,
        review: "Muy viejas las máquinas."
      },
      {
        id_area: 4,
        id_request: 49,
        score: 7,
        review: "Bien la limpieza!"
      },
      {
        id_area: 4,
        id_request: 50,
        score: 8,
        review: "Buen ambiente."
      },
      {
        id_area: 4,
        id_request: 51,
        score: 8,
        review: "Bastante bien equipado."
      },
      {
        id_area: 4,
        id_request: 52,
        score: 5,
        review: "Mejoren el mantenimiento!"
      },
      {
        id_area: 5,
        id_request: 56,
        score: 6,
        review: "Deberían regular mejor el vapor."
      },
      {
        id_area: 5,
        id_request: 57,
        score: 8,
        review: "Muy lindas las cabinas de sauna!"
      },
      {
        id_area: 5,
        id_request: 58,
        score: 9,
        review: "Recomendable. Muy lindo momento."
      },
      {
        id_area: 5,
        id_request: 59,
        score: 10,
        review: "Para relajarse, me encantó!"
      },

    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ratings', null, {});
  }
};
