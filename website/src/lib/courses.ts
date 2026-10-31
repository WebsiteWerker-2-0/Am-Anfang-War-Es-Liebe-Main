import type { Payload } from "payload";
import type { Course } from "@/payload-types";
import { richToHtml } from "./rich-html";

// Kurse für die Website: nur Veröffentlichtes, dessen Termin noch nicht vorbei ist, mit freien Plätzen.

export type CourseState = "open" | "waitlist" | "full" | "closed";

export type PublicCourse = {
  id: number;
  title: string;
  description: string;
  /** Ausführlicher Text als HTML (aus dem Textfeld des Backends), leer wenn nicht ausgefüllt */
  detailsHtml: string;
  startsAt: string;
  endsAt: string | null;
  location: string;
  audience: string;
  price: string;
  instructor: string;
  capacity: number;
  taken: number;
  free: number;
  state: CourseState;
};

export function courseState(course: { registrationOpen?: boolean | null; waitlist?: boolean | null }, free: number): CourseState {
  if (course.registrationOpen === false) return "closed";
  if (free > 0) return "open";
  return course.waitlist === false ? "full" : "waitlist";
}

/** Anzahl belegter Plätze je Kurs: Anmeldungen mit Status „Angemeldet“ plus von Hand vergebene (extraBooked) */
export async function takenSeats(payload: Payload, courseIds: number[]) {
  const taken = new Map<number, number>();
  if (!courseIds.length) return taken;
  const { docs } = await payload.find({
    collection: "registrations",
    where: { and: [{ course: { in: courseIds } }, { status: { equals: "confirmed" } }] },
    select: { course: true },
    depth: 0,
    limit: 5000,
    pagination: false,
  });
  for (const doc of docs) {
    const id = typeof doc.course === "object" ? (doc.course as { id: number }).id : doc.course;
    taken.set(id, (taken.get(id) ?? 0) + 1);
  }
  const { docs: courses } = await payload.find({
    collection: "courses",
    where: { id: { in: courseIds } },
    select: { extraBooked: true },
    depth: 0,
    limit: courseIds.length,
    pagination: false,
  });
  for (const course of courses) {
    const extra = Number(course.extraBooked ?? 0);
    if (extra > 0) taken.set(course.id, (taken.get(course.id) ?? 0) + extra);
  }
  return taken;
}

export async function listPublicCourses(payload: Payload): Promise<PublicCourse[]> {
  // Ein Kurs bleibt sichtbar, bis der Tag seines Endes (oder Beginns) vorbei ist
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { docs } = await payload.find({
    collection: "courses",
    where: { and: [{ status: { equals: "published" } }, { or: [{ endsAt: { greater_than: since } }, { and: [{ endsAt: { exists: false } }, { startsAt: { greater_than: since } }] }] }] },
    sort: "startsAt",
    // Tiefe 1: Dateien im Text müssen aufgelöst sein; die Anmeldungen (Join) werden nicht mitgeladen
    depth: 1,
    joins: false,
    limit: 100,
    pagination: false,
  });
  const taken = await takenSeats(payload, docs.map((doc) => doc.id));
  return docs.map((doc) => toPublicCourse(doc, taken.get(doc.id) ?? 0));
}

/** Ein Termin aus dem CMS in der Form für die Website (auch für die Vorschau im Backend) */
export function toPublicCourse(doc: Course, used: number): PublicCourse {
  const free = Math.max(doc.capacity - used, 0);
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description ?? "",
    detailsHtml: richToHtml(doc.details),
    startsAt: doc.startsAt,
    endsAt: doc.endsAt ?? null,
    location: doc.location ?? "",
    audience: doc.audience ?? "",
    price: doc.price ?? "",
    instructor: doc.instructor ?? "",
    capacity: doc.capacity,
    taken: used,
    free,
    state: courseState(doc, free),
  };
}
