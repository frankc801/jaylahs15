/**
 * Single source of truth for all event details.
 * Update values here and they propagate across the entire site.
 */

export const event = {
  projectName: "Jaylah XV Digital Invitation",

  quinceanera: {
    fullName: "Jaylah María Badillo",
    firstName: "Jaylah",
  },

  celebration: {
    title: "Mis XV Años",
    titleEn: "My Fifteenth Birthday",
  },

  date: {
    label: "August 1",
    labelEs: "1 de Agosto",
    // ISO date used for any date math (year assumed from RSVP deadline context).
    iso: "2026-08-01",
    // Local start/end used by the countdown timer and "Add to Calendar".
    // 4:00 PM guest arrival → celebration through the evening.
    startLocal: "2026-08-01T16:00:00",
    endLocal: "2026-08-01T22:00:00",
  },

  rsvp: {
    deadlineLabel: "July 27",
    deadlineLabelEs: "27 de Julio",
    deadlineIso: "2026-07-27",
    phone: "801-205-8959",
    phoneNote: "Text only",
    phoneNoteEs: "Solo mensajes de texto",
  },

  parents: {
    father: "Frank Carvajal",
    mother: "Andrea Badillo",
    combined: "Frank Carvajal & Andrea Badillo",
    combinedEs: "Frank Carvajal y Andrea Badillo",
  },

  venue: {
    name: "Crystal Palace Event Center",
    address: "229 West 9000 South, Sandy, Utah 84070",
    locationNote: "Located right off I-15",
    locationNoteEs: "Ubicado justo al lado de la I-15",
    guestArrival: "4:00 PM",
    // Google Maps directions link built from the address.
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Crystal+Palace+Event+Center+229+West+9000+South+Sandy+Utah+84070",
  },

  ceremony: {
    en: "Church details will be updated later.",
    es: "Los detalles de la ceremonia religiosa serán actualizados próximamente.",
  },

  invitationMessage: {
    en: "Frank Carvajal & Andrea Badillo invite you to celebrate the quinceañera of their daughter, Jaylah María Badillo.",
    es: "Frank Carvajal y Andrea Badillo tienen el honor de invitarlos a celebrar los quince años de su hija, Jaylah María Badillo.",
  },

  dressCode: {
    en: "Formal attire requested. Please do not wear emerald green, as this color is reserved for the quinceañera. Gold accents are welcome.",
    es: "Se pide vestimenta formal. Favor de no vestir color verde esmeralda, ya que este color está reservado para la quinceañera. Detalles en dorado son bienvenidos.",
  },

  gifts: {
    en: "Your presence means so much to our family. Gifts or monetary blessings are appreciated as we celebrate this special day with Jaylah. A gift table and blessing box will be available at the entrance.",
    es: "Su presencia significa mucho para nuestra familia. Regalos o bendiciones monetarias serán agradecidos mientras celebramos este día tan especial con Jaylah. Habrá una mesa de regalos y caja de bendiciones en la entrada.",
  },

  footer: {
    en: "With love, the family of Jaylah María Badillo.",
    es: "Con cariño, la familia de Jaylah María Badillo.",
  },

  // Chambelanes — names pending.
  chambelanes: [] as string[],
} as const;

export type EventConfig = typeof event;
