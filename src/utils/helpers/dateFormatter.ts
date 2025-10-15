export function formatIsoDate(
  iso: string,
  style: "numeric" | "text" | "time" = "numeric",
): string {
  const date = new Date(iso);

  if (style === "numeric") {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`; // 12.01
  }

  if (style === "text") {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }); // September 10
  }

  if (style === "time") {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }); // 08:00
  }

  throw new Error("style must be 'numeric' or 'text'");
}
